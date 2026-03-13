// src/pages/Wishlist.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { toast } from 'react-toastify';
import './Wishlist.css';
import './WishlistNew.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      // Try to get from localStorage first (for non-authenticated users)
      const localWishlist = localStorage.getItem('wishlist');
      if (localWishlist) {
        setWishlist(JSON.parse(localWishlist));
        setLoading(false);
        return;
      }
      
      // Try API if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        const response = await usersAPI.getWishlist();
        setWishlist(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // Don't show error toast, just show empty wishlist
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await usersAPI.removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Your favorite items saved for later</p>
          {wishlist.length > 0 && (
            <span className="wishlist-count">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}</span>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite items and shop them anytime you want</p>
            <Link to="/shop" className="continue-shopping-btn">
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <div key={product._id} className="wishlist-item">
                <button 
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(product._id)}
                  title="Remove from wishlist"
                >
                  <i className="fas fa-times"></i>
                </button>
                <Link to={`/product/${product._id}`} className="wishlist-item-image">
                  <img src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={product.name} />
                </Link>
                <div className="wishlist-item-info">
                  <Link to={`/product/${product._id}`} className="wishlist-item-name">
                    {product.name}
                  </Link>
                  <div className="wishlist-item-price">
                    ₹{product.price?.toLocaleString('en-IN') || '0'}
                  </div>
                  <div className="wishlist-item-actions">
                    <button className="add-to-cart-btn">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <Link to={`/product/${product._id}`} className="view-product-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
