// src/components/layout/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Footer.css';
import './FooterNew.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="footer-new">
      <div className="footer-main">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-col footer-col-about">
            <h3 className="footer-logo">Guys Fashion</h3>
            <p className="footer-desc">
              The customer is at the heart of our unique business model, which includes design.
            </p>
            <div className="footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> 60-49 Road 11378 New York</p>
              <p><i className="fas fa-phone"></i> +65 11.188.888</p>
              <p><i className="fas fa-envelope"></i> hello.colorlib@gmail.com</p>
            </div>
            <div className="social-links-new">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Shopping Section */}
          <div className="footer-col">
            <h4>SHOPPING</h4>
            <ul className="footer-links-new">
              <li><Link to="/shop?gender=women">Clothing Store</Link></li>
              <li><Link to="/shop?gender=men">Trending Shoes</Link></li>
              <li><Link to="/shop?category=accessories">Accessories</Link></li>
              <li><Link to="/shop?sale=true">Sale</Link></li>
            </ul>
          </div>

          {/* Partner Section */}
          <div className="footer-col">
            <h4>PARTNER</h4>
            <ul className="footer-links-new">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/payment">Payment</Link></li>
              <li><Link to="/delivery">Delivery</Link></li>
              <li><Link to="/returns">Return</Link></li>
              <li><Link to="/help">Help</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-col footer-col-newsletter">
            <h4>NEWLETTER</h4>
            <p className="newsletter-text">Be the first to know about new arrivals, look books, sales & promos!</p>
            <form className="newsletter-form-new" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-new">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              Copyright &copy; 2024 All rights reserved | This template is made with <i className="fas fa-heart"></i> by <span className="colorlib">Colorlib</span>
            </p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-discover"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;