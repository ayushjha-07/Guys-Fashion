// src/components/cart/CartItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item._id, item.size, item.color, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item._id, item.size, item.color);
  };

  const imageUrl = item.images && item.images.length > 0 
    ? item.images[0].url 
    : 'https://via.placeholder.com/150';

  return (
    <div className="cart-item">
      <Link to={`/product/${item._id}`} className="item-image">
        <img src={imageUrl} alt={item.name} />
      </Link>

      <div className="item-details">
        <Link to={`/product/${item._id}`} className="item-name">
          <h3>{item.name}</h3>
        </Link>
        {item.brand && <p className="item-brand">{item.brand}</p>}
        <div className="item-variants">
          {item.size && <span className="variant">Size: {item.size}</span>}
          {item.color && <span className="variant">Color: {item.color}</span>}
        </div>
      </div>

      <div className="item-price">
        <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
      </div>

      <div className="item-quantity">
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <i className="fas fa-minus"></i>
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="item-total">
        <span className="total-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
      </div>

      <button className="remove-btn" onClick={handleRemove}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
