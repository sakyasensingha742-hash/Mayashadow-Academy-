import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import { S3Client, HeadBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const app = express();
const PORT = process.env.PORT || 10000;

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

app.listen(PORT, () => {
  console.log(`Maya Shadow Academy API running on port ${PORT}`);
});
