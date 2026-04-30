# Deployment Guide - Guys Fashion E-Commerce Website

## Project Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application for men's fashion. The project consists of:

- **Frontend**: React.js application with modern UI
- **Backend**: Node.js/Express.js REST API with MongoDB
- **Database**: MongoDB for data storage
- **Cloud Services**: Cloudinary for image storage, Stripe for payments
- **Email**: Nodemailer for transactional emails

## Architecture

```
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express.js backend API
└── deployment/        # Deployment configurations (to be created)
```

## Environment Variables

### Backend Environment Variables (.env)

Create a `.env` file in the `backend/` directory:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.com

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clothing_ecommerce

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=30d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Gmail/SMTP)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@your-domain.com

# Security
BCRYPT_SALT_ROUNDS=12
```

## Deployment Options

### Option 1: Vercel + MongoDB Atlas (Recommended for Frontend)
**Frontend**: Vercel
**Backend**: Vercel Serverless Functions or Railway/Render
**Database**: MongoDB Atlas

### Option 2: Railway (All-in-One)
Deploy both frontend and backend on Railway with MongoDB Atlas

### Option 3: Render (All-in-One)
Similar to Railway, deploy full-stack application

### Option 4: AWS/Google Cloud (Enterprise)
For production-scale applications

## Step-by-Step Deployment Instructions

### Prerequisites

1. **Domain Name**: Purchase a domain (e.g., from Namecheap, GoDaddy)
2. **Cloud Services Accounts**:
   - MongoDB Atlas (database)
   - Cloudinary (image storage)
   - Stripe (payments)
   - Gmail/SMTP (emails)

### Step 1: Setup Cloud Services

#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create database user with password
4. Get connection string and update `MONGODB_URI`

#### Cloudinary
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get Cloud Name, API Key, and API Secret
3. Update environment variables

#### Stripe
1. Create account at [Stripe](https://stripe.com)
2. Get API keys (test and live)
3. Set up webhook endpoints
4. Update environment variables

#### Email Setup (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate App Password for your application
3. Update email environment variables

### Step 2: Prepare Code for Production

#### Frontend Build
```bash
cd frontend
npm install
npm run build
```

#### Backend Production Setup
```bash
cd backend
npm install --production
```

### Step 3: Deploy to Vercel (Recommended)

#### Frontend Deployment
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel --prod
```

3. Configure domain in Vercel dashboard

#### Backend Deployment Options

**Option A: Vercel Serverless Functions**
1. Create `vercel.json` in backend root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

2. Deploy backend:
```bash
cd backend
vercel --prod
```

**Option B: Railway/Render**
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables in dashboard
4. Deploy

### Step 4: Configure CORS and URLs

Update backend CORS settings to allow your production domain:

```javascript
// In backend/server.js or middleware/cors.js
const corsOptions = {
  origin: ['https://your-domain.com', 'https://www.your-domain.com'],
  credentials: true
};
```

### Step 5: SSL and Security

- Most platforms (Vercel, Railway, Render) provide automatic SSL
- Ensure all API endpoints use HTTPS
- Update any hardcoded URLs to use HTTPS

### Step 6: Testing Production

1. Test all user flows:
   - User registration/login
   - Product browsing
   - Cart functionality
   - Checkout process
   - Payment processing

2. Test admin functionality
3. Test image uploads
4. Test email notifications

## Monitoring and Maintenance

### Health Checks
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor error rates

### Backups
- MongoDB Atlas provides automatic backups
- Consider additional backup strategies

### Scaling
- Monitor performance metrics
- Scale up database tier as needed
- Consider CDN for static assets

## Troubleshooting

### Common Issues

1. **CORS Errors**: Update CORS origins in backend
2. **Database Connection**: Check MongoDB URI and network access
3. **Image Upload Failures**: Verify Cloudinary credentials
4. **Payment Issues**: Check Stripe webhook configuration
5. **Email Failures**: Verify SMTP credentials and app passwords

### Environment-Specific Fixes

#### Vercel Serverless
- Use `process.env` for environment variables
- Handle cold starts in API endpoints

#### Railway/Render
- Use persistent storage for file uploads
- Configure proper port binding

## Cost Estimates (Monthly)

- **MongoDB Atlas**: Free tier (~$0-25)
- **Cloudinary**: Free tier (~$0-89)
- **Stripe**: Transaction fees (2.9% + 30¢)
- **Vercel**: Free tier (~$0-20)
- **Domain**: ~$10-15/year
- **Email**: Free with Gmail limits

**Total**: ~$10-50/month for small to medium traffic

## Post-Deployment Checklist

- [ ] All environment variables set
- [ ] Database connected and seeded
- [ ] Payment processing working
- [ ] Image uploads functional
- [ ] Email notifications working
- [ ] SSL certificate active
- [ ] Domain properly configured
- [ ] Error monitoring set up
- [ ] Backup strategy implemented
- [ ] Performance testing completed

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Stripe Docs](https://stripe.com/docs)
- [Railway Docs](https://docs.railway.app)

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use platform's environment variable management
3. **Database Security**: Use strong passwords and enable IP whitelisting
4. **Rate Limiting**: Implement API rate limiting
5. **Input Validation**: Sanitize all user inputs
6. **HTTPS**: Enforce HTTPS everywhere

## Performance Optimization

1. **Frontend**:
   - Code splitting
   - Image optimization
   - Lazy loading
   - Caching strategies

2. **Backend**:
   - Database indexing
   - Response caching
   - Compression middleware
   - Connection pooling

3. **Database**:
   - Proper indexing
   - Query optimization
   - Connection limits

## Continuous Deployment

Set up automated deployments:

```yaml
# Example GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

**Note**: This deployment guide covers the most common deployment scenarios. Adjust based on your specific requirements, budget, and technical expertise.
