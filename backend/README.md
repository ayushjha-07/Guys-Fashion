# FashionStore Backend API

RESTful API for the FashionStore e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode with auto-reload
npm run dev

# Run tests
npm test
```

## 📁 Project Structure

```
backend/
├── config/          # Configuration files (database, cloudinary, etc.)
├── controllers/     # Route controllers
├── middleware/      # Custom middleware (auth, error handling)
├── models/          # MongoDB models
├── routes/          # API routes
├── utils/           # Utility functions
├── uploads/         # File uploads directory
└── server.js        # Application entry point
```

## 🔧 Environment Variables

Create a `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/fashionstore

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@fashionstore.com
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=10&category=men&minPrice=0&maxPrice=1000
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Classic T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 29.99,
  "category": "category_id",
  "images": [...],
  "variants": [...]
}
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [...],
  "shippingAddress": {...},
  "paymentMethod": "stripe"
}
```

#### Get User Orders
```http
GET /orders
Authorization: Bearer <token>
```

## 🗄️ Database Models

### User Model
- name, email, password (hashed)
- role (user/admin)
- addresses, wishlist
- timestamps

### Product Model
- name, description, price
- category, brand
- images, variants (size, color, stock)
- ratings, reviews
- timestamps

### Order Model
- user reference
- items (product, quantity, price)
- shipping address
- payment info
- status (pending, processing, shipped, delivered)
- timestamps

### Category Model
- name, description
- image, slug
- active status

### Review Model
- user, product references
- rating (1-5)
- comment
- timestamps

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **Helmet**: Secure HTTP headers
- **CORS**: Configured for frontend origin
- **Input Validation**: Express-validator
- **XSS Protection**: Sanitized inputs

## 🛠️ Middleware

### Authentication
```javascript
const { protect, authorize } = require('./middleware/auth');

// Protected route
router.get('/profile', protect, getProfile);

// Admin only route
router.post('/products', protect, authorize('admin'), createProduct);
```

### Error Handling
```javascript
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
```

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables

### Authentication & Security
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `helmet` - Security headers
- `cors` - CORS handling
- `express-rate-limit` - Rate limiting

### File Upload & Storage
- `multer` - File upload
- `cloudinary` - Cloud storage

### Payment & Email
- `stripe` - Payment processing
- `nodemailer` - Email sending

### Utilities
- `express-validator` - Input validation
- `compression` - Response compression
- `moment` - Date manipulation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
```

### Railway
```bash
railway login
railway init
railway up
```

## 📊 Performance

- Compression middleware for responses
- Database indexing for faster queries
- Pagination for large datasets
- Caching strategies (Redis recommended)

## 🔍 Logging

The application uses console logging. For production, consider:
- Winston for advanced logging
- Morgan for HTTP request logging

## 📄 License

MIT License

## 👨‍💻 Support

For issues and questions, please open an issue in the repository.
