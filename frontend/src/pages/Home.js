// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import { toast } from 'react-toastify';
import './Home.css';
import './HomeNew.css';

const Home = () => {
  const { featuredProducts, fetchFeaturedProducts, categories, loading } = useProducts();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <div className="home">
      {/* Hero Grid Section - Like Reference */}
      <section className="hero-grid">
        {/* Women's Fashion - Large Card */}
        <div className="hero-card hero-card-large women" onClick={() => navigate('/shop?gender=women')}>
          <div className="hero-card-content">
            <h2>Women's fashion</h2>
            <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
          <div className="hero-card-image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" alt="Women's Fashion" />
          </div>
        </div>

        {/* Men's Fashion */}
        <div className="hero-card men" onClick={() => navigate('/shop?gender=men')}>
          <div className="hero-card-info">
            <h3>Men's fashion</h3>
            <p className="item-count">357 items</p>
            <button className="shop-now-btn-small">SHOP NOW</button>
          </div>
          <div className="hero-card-image-small">
            <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600" alt="Men's Fashion" />
          </div>
        </div>

        {/* Kid's Fashion */}
        <div className="hero-card kids" onClick={() => navigate('/shop?gender=kids')}>
          <div className="hero-card-info">
            <h3>Kid's fashion</h3>
            <p className="item-count">273 items</p>
            <button className="shop-now-btn-small">SHOP NOW</button>
          </div>
          <div className="hero-card-image-small">
            <img src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600" alt="Kids Fashion" />
          </div>
        </div>

        {/* Cosmetics */}
        <div className="hero-card cosmetics" onClick={() => navigate('/shop?category=cosmetics')}>
          <div className="hero-card-info">
            <h3>Cosmetics</h3>
            <p className="item-count">159 items</p>
            <button className="shop-now-btn-small">SHOP NOW</button>
          </div>
          <div className="hero-card-image-small">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600" alt="Cosmetics" />
          </div>
        </div>

        {/* Accessories */}
        <div className="hero-card accessories" onClick={() => navigate('/shop?category=accessories')}>
          <div className="hero-card-info">
            <h3>Accessories</h3>
            <p className="item-count">792 items</p>
            <button className="shop-now-btn-small">SHOP NOW</button>
          </div>
          <div className="hero-card-image-small">
            <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600" alt="Accessories" />
          </div>
        </div>
      </section>

      {/* NEW PRODUCT Section - Like Reference */}
      <section className="new-product-section">
        <div className="section-title">
          <h2>NEW PRODUCT</h2>
        </div>
        
        <div className="product-tabs">
          <button className="tab-btn active">All</button>
          <button className="tab-btn">Women's</button>
          <button className="tab-btn">Men's</button>
          <button className="tab-btn">Kid's</button>
          <button className="tab-btn">Accessories</button>
          <button className="tab-btn">Cosmetics</button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid-new">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <div key={product._id} className="product-card-new" onClick={() => navigate(`/product/${product._id}`)}>
                {index === 0 && <span className="product-badge">NEW</span>}
                {index === 1 && <span className="product-badge sale">SALE</span>}
                {index === 2 && <span className="product-badge out-of-stock">OUT OF STOCK</span>}
                
                <div className="product-image-new">
                  <img src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={product.name} />
                </div>
                
                <div className="product-info-new">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="product-price">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                    {product.comparePrice && (
                      <span className="product-price-old">₹{Number(product.comparePrice).toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section - Enhanced */}
      <section className="categories-section" style={{display: 'none'}}>
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Fashion for Everyone - Men, Women, Kids & Children</p>
        </div>
        <div className="categories-grid-enhanced">
          <div className="category-card-large" onClick={() => navigate('/shop?gender=men')}>
            <img 
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800" 
              alt="Men's Fashion" 
            />
            <div className="category-overlay-modern">
              <div className="category-badge">NEW ARRIVALS</div>
              <h3>Men's Collection</h3>
              <p>Stylish & Comfortable</p>
              <button className="shop-category-btn">
                Explore Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="category-card-large" onClick={() => navigate('/shop?gender=women')}>
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" 
              alt="Women's Fashion" 
            />
            <div className="category-overlay-modern">
              <div className="category-badge trending">TRENDING</div>
              <h3>Women's Collection</h3>
              <p>Elegant & Trendy</p>
              <button className="shop-category-btn">
                Explore Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="category-card-large" onClick={() => navigate('/shop?gender=kids')}>
            <img 
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800" 
              alt="Kids Fashion" 
            />
            <div className="category-overlay-modern">
              <div className="category-badge sale">SALE</div>
              <h3>Kids Collection</h3>
              <p>Fun & Playful</p>
              <button className="shop-category-btn">
                Explore Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="category-card-large" onClick={() => navigate('/shop?gender=children')}>
            <img 
              src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800" 
              alt="Children's Fashion" 
            />
            <div className="category-overlay-modern">
              <div className="category-badge">BEST SELLERS</div>
              <h3>Children's Collection</h3>
              <p>Cute & Adorable</p>
              <button className="shop-category-btn">
                Explore Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Deal of the Week */}
      <section className="deal-section">
        <div className="deal-container">
          <div className="deal-image">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800" alt="Deal of the Week" />
          </div>
          <div className="deal-content">
            <span className="deal-label">DEAL OF THE WEEK</span>
            <h2>Multi-pocket Chest Bag Black</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
            <div className="deal-price">
              <span className="price-old">$59.0</span>
              <span className="price-new">$49.0</span>
            </div>
            <div className="deal-countdown">
              <div className="countdown-item">
                <span className="countdown-number">3</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">21</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">18</span>
                <span className="countdown-label">Min</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">46</span>
                <span className="countdown-label">Sec</span>
              </div>
            </div>
            <button className="shop-now-btn" onClick={() => navigate('/shop')}>
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section">
        <div className="section-title">
          <h2>INSTAGRAM</h2>
          <p>Follow us on Instagram @gkfashion</p>
        </div>
        <div className="instagram-grid">
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" alt="Instagram 1" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400" alt="Instagram 2" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" alt="Instagram 3" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400" alt="Instagram 4" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400" alt="Instagram 5" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" alt="Instagram 6" />
            <div className="instagram-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  );
};

export default Home;