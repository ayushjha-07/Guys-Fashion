// src/pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      const response = await ordersAPI.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Don't show error toast if it's just authentication issue
      if (error.response?.status !== 403 && error.response?.status !== 401) {
        toast.error('Failed to load orders');
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status.toLowerCase()] || '#7f8c8d';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>Order History</h1>
          <p>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <i className="fas fa-shopping-bag"></i>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <Link to="/shop" className="shop-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items && order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/80'} 
                        alt={item.product?.name || 'Product'} 
                      />
                      <div className="item-details">
                        <h4>{item.product?.name || 'Product'}</h4>
                        <p>Qty: {item.quantity} × ${item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {order.items && order.items.length > 3 && (
                    <p className="more-items">+{order.items.length - 3} more items</p>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <strong>${order.totalAmount?.toFixed(2) || '0.00'}</strong>
                  </div>
                  <Link to={`/orders/${order._id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
