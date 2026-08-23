# Maya Shadow Academy — Ready to Publish

## What this is
A Node.js full-stack website starter containing:
- Public portfolio/home page
- Services
- Buy section
- Student registration/login
- Recorded Classes
- Protected resource links
- Purchase/order recording
- SQLite database
- bcrypt password hashing
- JWT authentication
- Helmet security headers
- Rate limiting

## Publish steps
1. Choose a Node.js hosting provider that supports Node.js 20+ and persistent storage.
2. Upload this project.
3. Run `npm install`.
4. Set environment variables:
   PORT=3000
   JWT_SECRET=<long random secret>
   ADMIN_EMAIL=<your admin email>
   ADMIN_PASSWORD=<strong unique password>
5. Run `npm start`.
6. Connect your domain and enable HTTPS/SSL.

## Important
The current Buy endpoint records an order request; it does not charge real money. Before accepting payments, connect Razorpay, Stripe, or PayPal server-side and verify payment webhooks.

For paid recorded classes/resources, use private storage/video hosting and short-lived signed URLs rather than permanent public URLs.

No website can honestly be guaranteed 100% hack-proof. Before production, use HTTPS, MFA for administrators, strong secrets, backups, monitoring, dependency updates, vulnerability scanning, and a production database.

## Replace before launch
- Logo/artwork
- Email/contact details
- YouTube/social links
- Product prices
- Course descriptions
- Recorded-class video URLs
- Resource URLs

See README.md for additional technical notes.
