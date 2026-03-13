// routes/products.js
const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getRelatedProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { uploadMultiple, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.get('/:id/related', getRelatedProducts);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), uploadMultiple, handleUploadError, createProduct);
router.put('/:id', protect, authorize('admin'), uploadMultiple, handleUploadError, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;