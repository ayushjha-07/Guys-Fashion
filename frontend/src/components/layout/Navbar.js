// src/components/layout/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import './NavbarNew.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-new">
      <div className="nav-container-new">
        {/* Logo */}
        <Link to="/" className="nav-logo-new">
          Guys Fashion
        </Link>

        {/* Main Navigation */}
        <div className={`nav-menu-new ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link-new">HOME</Link>
          <Link to="/women" className="nav-link-new">WOMEN'S</Link>
          <Link to="/men" className="nav-link-new">MEN'S</Link>
          <Link to="/kids" className="nav-link-new">KIDS</Link>
          <Link to="/shop" className="nav-link-new">PRODUCTS</Link>
          <Link to="/contact" className="nav-link-new">CONTACT</Link>
        </div>

        {/* Right Side Icons */}
        <div className="nav-right-new">
          {/* Search */}
          <div className="nav-search">
            <input type="text" placeholder="Search or enter website name" />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* User Actions */}
          <div className="nav-actions">
            {user ? (
              <>
                {/* User Dropdown */}
                <div className="user-dropdown">
                  <button 
                    className="user-dropdown-btn" 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <i className="fas fa-user-circle"></i>
                    <span>{user.firstName || 'Account'}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-dropdown-menu">
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fas fa-user"></i> My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fas fa-box"></i> My Orders
                      </Link>
                      <Link to="/wishlist" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fas fa-heart"></i> Wishlist
                      </Link>
                      <button onClick={handleLogout} className="dropdown-logout">
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
                
                <Link to="/wishlist" className="nav-icon-new">
                  <i className="far fa-heart"></i>
                </Link>
                <Link to="/cart" className="nav-icon-new cart-icon-new">
                  <i className="fas fa-shopping-bag"></i>
                  {getCartItemsCount() > 0 && (
                    <span className="cart-badge">{getCartItemsCount()}</span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-user-text">Login / Register</Link>
                <Link to="/wishlist" className="nav-icon-new">
                  <i className="far fa-heart"></i>
                </Link>
                <Link to="/cart" className="nav-icon-new cart-icon-new">
                  <i className="fas fa-shopping-bag"></i>
                  {getCartItemsCount() > 0 && (
                    <span className="cart-badge">{getCartItemsCount()}</span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburger-new" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;