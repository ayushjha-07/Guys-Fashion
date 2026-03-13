// src/pages/WomenSection.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import './WomenSection.css';

const WomenSection = () => {
  const { products, fetchProducts, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Sample products for Women's section
  const sampleProducts = [
    {
      _id: '1',
      name: 'Floral Summer Dress',
      price: 49.99,
      images: [{ url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500' }],
      category: 'clothing',
      gender: 'women',
      rating: 4.5
    },
    {
      _id: '2',
      name: 'Elegant Blouse',
      price: 39.99,
      images: [{ url: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500' }],
      category: 'clothing',
      gender: 'women',
      rating: 4.8
    },
    {
      _id: '3',
      name: 'High Waist Jeans',
      price: 59.99,
      images: [{ url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500' }],
      category: 'clothing',
      gender: 'women',
      rating: 4.6
    },
    {
      _id: '4',
      name: 'Leather Handbag',
      price: 89.99,
      images: [{ url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }],
      category: 'bags',
      gender: 'women',
      rating: 4.9
    },
    {
      _id: '5',
      name: 'Casual Sneakers',
      price: 69.99,
      images: [{ url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500' }],
      category: 'shoes',
      gender: 'women',
      rating: 4.7
    },
    {
      _id: '6',
      name: 'Gold Necklace',
      price: 34.99,
      images: [{ url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' }],
      category: 'accessories',
      gender: 'women',
      rating: 4.5
    },
    {
      _id: '7',
      name: 'Maxi Dress',
      price: 79.99,
      images: [{ url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' }],
      category: 'clothing',
      gender: 'women',
      rating: 4.8
    },
    {
      _id: '8',
      name: 'Silk Scarf',
      price: 29.99,
      images: [{ url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500' }],
      category: 'accessories',
      gender: 'women',
      rating: 4.4
    },
    {
      _id: '9',
      name: 'Ankle Boots',
      price: 99.99,
      images: [{ url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500' }],
      category: 'shoes',
      gender: 'women',
      rating: 4.7
    },
    {
      _id: '10',
      name: 'Crossbody Bag',
      price: 54.99,
      images: [{ url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500' }],
      category: 'bags',
      gender: 'women',
      rating: 4.6
    },
    {
      _id: '11',
      name: 'Knit Sweater',
      price: 44.99,
      images: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500' }],
      category: 'clothing',
      gender: 'women',
      rating: 4.5
    },
    {
      _id: '12',
      name: 'Designer Sunglasses',
      price: 129.99,
      images: [{ url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' }],
      category: 'accessories',
      gender: 'women',
      rating: 4.9
    }
  ];

  useEffect(() => {
    fetchProducts({ gender: 'women' });
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'bags', name: 'Bags' }
  ];

  // Use sample products if no products from API
  const displayProducts = products.length > 0 ? products : sampleProducts;
  
  const filteredProducts = activeCategory === 'all' 
    ? displayProducts 
    : displayProducts.filter(p => p.category === activeCategory);

  return (
    <div className="women-section">
      {/* Hero Banner */}
      <section className="women-hero">
        <div className="women-hero-content">
          <h1>Women's Collection</h1>
          <p>Discover the latest trends in women's fashion</p>
          <button className="shop-now-btn" onClick={() => navigate('/shop?gender=women')}>
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="women-categories">
        <div className="container">
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="women-featured">
        <div className="container">
          <div className="featured-grid">
            <div className="featured-card" onClick={() => navigate('/shop?category=dresses')}>
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" alt="Dresses" />
              <div className="featured-overlay">
                <h3>Dresses</h3>
                <p>Elegant & Stylish</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=tops')}>
              <img src="https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600" alt="Tops" />
              <div className="featured-overlay">
                <h3>Tops & Blouses</h3>
                <p>Trendy Collection</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=shoes')}>
              <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" alt="Shoes" />
              <div className="featured-overlay">
                <h3>Shoes</h3>
                <p>Step in Style</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=accessories')}>
              <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600" alt="Accessories" />
              <div className="featured-overlay">
                <h3>Accessories</h3>
                <p>Complete Your Look</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="women-products">
        <div className="container">
          <div className="section-header">
            <h2>Latest Arrivals</h2>
            <p>Discover our newest collection</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {filteredProducts.slice(0, 12).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <p>No products found in this category.</p>
                </div>
              )}
              {filteredProducts.length > 12 && (
                <div className="load-more">
                  <button className="load-more-btn" onClick={() => navigate('/shop?gender=women')}>
                    VIEW ALL PRODUCTS
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="women-promo">
        <div className="promo-content">
          <h2>Special Offer</h2>
          <p>Get 30% off on all women's clothing</p>
          <button className="promo-btn" onClick={() => navigate('/shop?gender=women&sale=true')}>
            SHOP SALE
          </button>
        </div>
      </section>
    </div>
  );
};

export default WomenSection;
