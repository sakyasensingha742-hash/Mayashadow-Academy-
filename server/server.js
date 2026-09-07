import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import { S3Client, HeadBucketCommand, PutObjectCommand, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();
const PORT = process.env.PORT || 10000;
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json({ limit: '1mb' }));

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
  });
}

function requireAdminUploadToken(req, res, next) {
  const configuredToken = process.env.ADMIN_UPLOAD_TOKEN;
  if (!configuredToken) {
    return res.status(503).json({ ok: false, error: 'Admin upload security is not configured yet.' });
  }
  const suppliedToken = req.get('x-admin-upload-token');
  if (!suppliedToken || suppliedToken !== configuredToken) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }
  next();
}

function safePathPart(value, fallback = 'misc') {
  const cleaned = String(value || '').trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
  return cleaned.slice(0, 80) || fallback;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'maya-shadow-academy-api' });
});

app.get('/api/config/payment', (_req, res) => {
  res.json({ enabled: Boolean(process.env.RAZORPAY_KEY_ID), keyId: process.env.RAZORPAY_KEY_ID || null });
});

app.post('/api/payments/create-order', async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ error: 'Payment gateway is not configured yet.' });
    }
    const { amount, currency = 'INR', receipt, notes = {} } = req.body || {};
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'A valid positive amount is required.' });
    }
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.create({ amount: Math.round(numericAmount * 100), currency, receipt: receipt || `msa_${Date.now()}`, notes });
    res.json({ id: order.id, amount: order.amount, currency: order.currency, status: order.status });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: 'Unable to create payment order.' });
  }
});

app.post('/api/payments/verify', (_req, res) => {
  res.status(501).json({ error: 'Payment verification endpoint is reserved for the secure database/auth phase.' });
});

app.get('/api/storage/status', (_req, res) => {
  res.json({
    provider: process.env.STORAGE_PROVIDER || 'cloudflare-r2',
    configured: Boolean(process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET)
  });
});

app.get('/api/storage/test', async (_req, res) => {
  try {
    const required = ['R2_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET'];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length) {
      return res.status(503).json({ ok: false, connected: false, error: 'R2 configuration is incomplete.', missing });
    }
    await getR2Client().send(new HeadBucketCommand({ Bucket: process.env.R2_BUCKET }));
    res.json({ ok: true, connected: true, provider: 'cloudflare-r2', bucket: process.env.R2_BUCKET });
  } catch (error) {
    console.error('R2 connection test error:', error);
    res.status(502).json({ ok: false, connected: false, provider: 'cloudflare-r2', error: 'R2 connection test failed.' });
  }
});

app.post('/api/storage/write-test', requireAdminUploadToken, async (_req, res) => {
  try {
    const testKey = `system-tests/r2-write-test-${Date.now()}.txt`;
    const body = Buffer.from('Maya Shadow Academy R2 write test successful.');
    await getR2Client().send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: testKey,
      Body: body,
      ContentType: 'text/plain',
      Metadata: { purpose: 'connection-verification' }
    }));
    res.json({ ok: true, uploaded: true, provider: 'cloudflare-r2', bucket: process.env.R2_BUCKET, objectKey: testKey, size: body.length });
  } catch (error) {
    console.error('R2 write test error:', error);
    res.status(502).json({ ok: false, uploaded: false, provider: 'cloudflare-r2', error: 'R2 write test failed.' });
  }
});

app.post('/api/storage/configure-cors', requireAdminUploadToken, async (_req, res) => {
  try {
    const origin = process.env.FRONTEND_ORIGIN;
    if (!origin) {
      return res.status(503).json({ ok: false, error: 'FRONTEND_ORIGIN is not configured.' });
    }
    await getR2Client().send(new PutBucketCorsCommand({
      Bucket: process.env.R2_BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: [origin],
            AllowedMethods: ['PUT', 'GET', 'HEAD'],
            AllowedHeaders: ['Content-Type', 'Content-Length'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3600
          }
        ]
      }
    }));
    res.json({ ok: true, configured: true, origin });
  } catch (error) {
    console.error('R2 CORS configuration error:', error);
    res.status(502).json({ ok: false, configured: false, error: 'Unable to configure R2 browser upload CORS.' });
  }
});

app.post('/api/storage/presign-upload', requireAdminUploadToken, async (req, res) => {
  try {
    const { filename, contentType, size, category = 'assets', productId = 'unassigned' } = req.body || {};
    if (!filename || !contentType || !Number.isFinite(Number(size))) {
      return res.status(400).json({ ok: false, error: 'filename, contentType and size are required.' });
    }
    const numericSize = Number(size);
    if (numericSize <= 0 || numericSize > MAX_UPLOAD_BYTES) {
      return res.status(413).json({ ok: false, error: 'File size must be greater than 0 and at most 100 MB.' });
    }
    const safeName = String(filename).split(/[\\/]/).pop().replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 140);
    const ext = safeName.includes('.') ? safeName.split('.').pop().toLowerCase() : 'bin';
    const key = `products/${safePathPart(category)}/${safePathPart(productId)}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const command = new PutObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key, ContentType: contentType });
    const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 900 });
    res.json({ ok: true, uploadUrl, objectKey: key, expiresIn: 900, maxUploadBytes: MAX_UPLOAD_BYTES });
  } catch (error) {
    console.error('R2 presign error:', error);
    res.status(502).json({ ok: false, error: 'Unable to prepare secure R2 upload.' });
  }
});

app.listen(PORT, () => {
  console.log(`Maya Shadow Academy API running on port ${PORT}`);
});
