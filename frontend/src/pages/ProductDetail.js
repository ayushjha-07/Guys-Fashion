// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/api';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      const fetchedProduct = response.data.data;
      
      setProduct(fetchedProduct);
      
      // Set default selections from variants
      if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
        setSelectedSize(fetchedProduct.variants[0].size);
        setSelectedColor(fetchedProduct.variants[0].color);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Product added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="error-container">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/shop')} className="back-btn">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Get available sizes and colors from variants
  const availableSizes = product.variants ? [...new Set(product.variants.map(v => v.size))] : [];
  const availableColors = product.variants ? [...new Set(product.variants.map(v => v.color))] : [];
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [{ url: 'https://via.placeholder.com/500?text=No+Image', alt: product.name }];

  return (
    <div className="product-detail">
      <div className="product-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/shop')}>Shop</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={productImages[activeImage]?.url || productImages[activeImage]} 
                alt={productImages[activeImage]?.alt || product.name} 
              />
              {product.isFeatured && (
                <span className="featured-badge">Featured</span>
              )}
            </div>
            {productImages.length > 1 && (
              <div className="image-thumbnails">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url || image}
                    alt={`${product.name} ${index + 1}`}
                    className={index === activeImage ? 'active' : ''}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            {product.brand && <p className="brand">{product.brand}</p>}
            <h1>{product.name}</h1>
            
            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <>
                  <span className="compare-price">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                  <span className="discount-badge">
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            
            {product.ratings && (
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <i 
                      key={index} 
                      className={`fas fa-star ${index < Math.floor(product.ratings.average) ? 'filled' : ''}`}
                    ></i>
                  ))}
                </div>
                <span className="rating-text">
                  {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                </span>
              </div>
            )}
            
            <p className="description">{product.description}</p>

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="size-selection">
                <label>Select Size:</label>
                <div className="size-options">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      className={selectedSize === size ? 'selected' : ''}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div className="color-selection">
                <label>Select Color:</label>
                <div className="color-options">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {selectedColor === color && <i className="fas fa-check"></i>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="quantity-selection">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            {product.features && product.features.length > 0 && (
              <div className="product-features">
                <h3><i className="fas fa-check-circle"></i> Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}><i className="fas fa-check"></i> {feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.specifications && (
              <div className="product-specifications">
                <h3><i className="fas fa-info-circle"></i> Specifications</h3>
                <div className="spec-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.ratings && product.ratings.count > 0 && (
          <div className="reviews-section">
            <h2><i className="fas fa-star"></i> Customer Reviews</h2>
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="rating-number">{product.ratings.average.toFixed(1)}</span>
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <i 
                      key={index} 
                      className={`fas fa-star ${index < Math.floor(product.ratings.average) ? 'filled' : ''}`}
                    ></i>
                  ))}
                </div>
                <span className="total-reviews">{product.ratings.count} reviews</span>
              </div>
            </div>
            <p className="reviews-placeholder">Reviews will be displayed here once customers start reviewing this product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;