// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Discover our amazing products and add them to your cart.</p>
            <Link to="/shop" className="shop-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={`${item._id}-${item.size}-${item.color}`} item={item} />
            ))}
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart">Clear Cart</button>
              <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹50</span>
            </div>
            <div className="summary-row">
              <span>Tax (GST 18%):</span>
              <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-total">
              <div className="summary-row" style={{borderBottom: 'none', paddingBottom: 0, marginBottom: 0}}>
                <span>Total:</span>
                <span>₹{Math.round(getCartTotal() + 50 + getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;