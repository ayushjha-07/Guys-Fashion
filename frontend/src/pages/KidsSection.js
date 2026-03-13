// src/pages/KidsSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import { productsAPI } from '../services/api';
import './KidsSection.css';

const KidsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // For now, show all products - you can filter by kids category when available
      const response = await productsAPI.getAll({ 
        limit: 50,
        sort: sortBy 
      });
      setProducts(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="kids-section">
        <div className="kids-loading-container">
          <div className="spinner"></div>
          <p>Loading kids collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kids-section">
      {/* Hero Banner */}
      <div className="kids-hero">
        <div className="kids-hero-content">
          <div className="kids-hero-text">
            <h1>👶 Kids Collection</h1>
            <p>Comfortable, Stylish & Safe Clothing for Your Little Ones</p>
            <div className="kids-hero-stats">
              <div className="kids-stat">
                <span className="kids-stat-number">{products.length}+</span>
                <span className="kids-stat-label">Products</span>
              </div>
              <div className="kids-stat">
                <span className="kids-stat-number">100%</span>
                <span className="kids-stat-label">Safe</span>
              </div>
              <div className="kids-stat">
                <span className="kids-stat-number">Free</span>
                <span className="kids-stat-label">Shipping</span>
              </div>
            </div>
          </div>
          <div className="kids-hero-image">
            <img 
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800" 
              alt="Kids Fashion" 
            />
          </div>
        </div>
      </div>

      {/* Age Groups */}
      <div className="age-groups-section">
        <h2>Shop by Age Group</h2>
        <p>Find the perfect fit for every stage</p>
        <div className="age-groups-grid">
          <div className="age-group-card" onClick={() => navigate('/shop?category=boys')}>
            <div className="age-group-image">
              <img src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400" alt="Boys" />
              <span className="age-badge">Popular</span>
            </div>
            <div className="age-group-content">
              <h3>👦 Boys</h3>
              <span className="age-range">2-12 Years</span>
              <p>Trendy & Comfortable clothing for active boys</p>
              <button className="shop-age-btn">
                Shop Boys <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="age-group-card" onClick={() => navigate('/shop?category=girls')}>
            <div className="age-group-image">
              <img src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400" alt="Girls" />
              <span className="age-badge">Trending</span>
            </div>
            <div className="age-group-content">
              <h3>👧 Girls</h3>
              <span className="age-range">2-12 Years</span>
              <p>Cute & Stylish outfits for little princesses</p>
              <button className="shop-age-btn">
                Shop Girls <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="age-group-card" onClick={() => navigate('/shop?category=infants')}>
            <div className="age-group-image">
              <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400" alt="Infants" />
              <span className="age-badge">New</span>
            </div>
            <div className="age-group-content">
              <h3>👶 Infants</h3>
              <span className="age-range">0-2 Years</span>
              <p>Soft & Gentle fabrics for delicate skin</p>
              <button className="shop-age-btn">
                Shop Infants <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="age-group-card" onClick={() => navigate('/shop?category=accessories')}>
            <div className="age-group-image">
              <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400" alt="Accessories" />
              <span className="age-badge">Sale</span>
            </div>
            <div className="age-group-content">
              <h3>🎒 Accessories</h3>
              <span className="age-range">All Ages</span>
              <p>Bags, shoes, hats & more to complete the look</p>
              <button className="shop-age-btn">
                Shop Accessories <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="kids-products-section">
        <div className="kids-section-header">
          <h2>🎨 All Kids Products</h2>
          <div className="kids-sort-filter">
            <label>Sort by:</label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="kids-products-container">
          <FilterSidebar />
          <div className="kids-products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="kids-no-products">
                <i className="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Check back soon for new arrivals!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="kids-features-section">
        <div className="kids-features-grid">
          <div className="kids-feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Safe Materials</h3>
            <p>100% safe and tested fabrics for sensitive skin</p>
          </div>
          <div className="kids-feature">
            <i className="fas fa-truck"></i>
            <h3>Free Delivery</h3>
            <p>On orders above ₹999 across India</p>
          </div>
          <div className="kids-feature">
            <i className="fas fa-undo"></i>
            <h3>Easy Returns</h3>
            <p>7-day hassle-free return policy</p>
          </div>
          <div className="kids-feature">
            <i className="fas fa-star"></i>
            <h3>Quality Assured</h3>
            <p>Premium quality products guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
