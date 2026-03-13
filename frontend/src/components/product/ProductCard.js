// src/components/product/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      if (firstVariant.stock > 0) {
        addToCart(product, firstVariant.size, firstVariant.color, 1);
        toast.success('Added to cart!');
      } else {
        toast.error('Product out of stock');
      }
    } else {
      toast.error('Product unavailable');
    }
  };

  const getDiscountPercentage = () => {
    if (product.comparePrice && product.comparePrice > product.price) {
      return Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
    }
    return 0;
  };

  const discount = getDiscountPercentage();
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : 'https://via.placeholder.com/300x400?text=No+Image';

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} className="product-image" />
        {discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}
        {product.isFeatured && (
          <span className="featured-badge">Featured</span>
        )}
        <button className="quick-add-btn" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart"></i> Quick Add
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.brand && (
          <p className="product-brand">{product.brand}</p>
        )}
        
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <i 
              key={index} 
              className={`fas fa-star ${index < Math.floor(product.ratings?.average || 0) ? 'filled' : ''}`}
            ></i>
          ))}
          <span className="rating-count">({product.ratings?.count || 0})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="compare-price">₹{product.comparePrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="product-colors">
            {[...new Set(product.variants.map(v => v.color))].slice(0, 5).map((color, index) => (
              <span 
                key={index} 
                className="color-dot" 
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              ></span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
