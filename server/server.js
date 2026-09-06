import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'maya-shadow-academy-api' });
});

app.get('/api/config/payment', (_req, res) => {
  res.json({
    enabled: Boolean(process.env.RAZORPAY_KEY_ID),
    keyId: process.env.RAZORPAY_KEY_ID || null
  });
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

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: Math.round(numericAmount * 100),
      currency,
      receipt: receipt || `msa_${Date.now()}`,
      notes
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: 'Unable to create payment order.' });
  }
});

app.post('/api/payments/verify', (_req, res) => {
  res.status(501).json({
    error: 'Payment verification endpoint is reserved for the secure database/auth phase.'
  });
});

app.get('/api/storage/status', (_req, res) => {
  res.json({
    provider: process.env.STORAGE_PROVIDER || 'cloudflare-r2',
    configured: Boolean(
      process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET
    )
  });
});

app.listen(PORT, () => {
  console.log(`Maya Shadow Academy API running on port ${PORT}`);
});
