// src/pages/MenSection.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import './MenSection.css';

const MenSection = () => {
  const { products, fetchProducts, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Sample products for Men's section
  const sampleProducts = [
    {
      _id: 'm1',
      name: 'Classic Dress Shirt',
      price: 59.99,
      images: [{ url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500' }],
      category: 'clothing',
      gender: 'men',
      rating: 4.6
    },
    {
      _id: 'm2',
      name: 'Slim Fit Jeans',
      price: 69.99,
      images: [{ url: 'https://images.unsplash.com/photo-1542272454315-7ad9f8f6b5e3?w=500' }],
      category: 'clothing',
      gender: 'men',
      rating: 4.7
    },
    {
      _id: 'm3',
      name: 'Leather Jacket',
      price: 149.99,
      images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' }],
      category: 'clothing',
      gender: 'men',
      rating: 4.9
    },
    {
      _id: 'm4',
      name: 'Running Shoes',
      price: 89.99,
      images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' }],
      category: 'shoes',
      gender: 'men',
      rating: 4.8
    },
    {
      _id: 'm5',
      name: 'Casual Sneakers',
      price: 79.99,
      images: [{ url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' }],
      category: 'shoes',
      gender: 'men',
      rating: 4.5
    },
    {
      _id: 'm6',
      name: 'Leather Watch',
      price: 199.99,
      images: [{ url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500' }],
      category: 'watches',
      gender: 'men',
      rating: 4.9
    },
    {
      _id: 'm7',
      name: 'Polo Shirt',
      price: 44.99,
      images: [{ url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500' }],
      category: 'clothing',
      gender: 'men',
      rating: 4.4
    },
    {
      _id: 'm8',
      name: 'Leather Belt',
      price: 34.99,
      images: [{ url: 'https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=500' }],
      category: 'accessories',
      gender: 'men',
      rating: 4.6
    },
    {
      _id: 'm9',
      name: 'Formal Shoes',
      price: 119.99,
      images: [{ url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500' }],
      category: 'shoes',
      gender: 'men',
      rating: 4.7
    },
    {
      _id: 'm10',
      name: 'Designer Sunglasses',
      price: 159.99,
      images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' }],
      category: 'accessories',
      gender: 'men',
      rating: 4.8
    },
    {
      _id: 'm11',
      name: 'Wool Blazer',
      price: 179.99,
      images: [{ url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500' }],
      category: 'clothing',
      gender: 'men',
      rating: 4.9
    },
    {
      _id: 'm12',
      name: 'Smart Watch',
      price: 299.99,
      images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }],
      category: 'watches',
      gender: 'men',
      rating: 4.8
    }
  ];

  useEffect(() => {
    fetchProducts({ gender: 'men' });
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'watches', name: 'Watches' }
  ];

  // Use sample products if no products from API
  const displayProducts = products.length > 0 ? products : sampleProducts;
  
  const filteredProducts = activeCategory === 'all' 
    ? displayProducts 
    : displayProducts.filter(p => p.category === activeCategory);

  return (
    <div className="men-section">
      {/* Hero Banner */}
      <section className="men-hero">
        <div className="men-hero-content">
          <h1>Men's Collection</h1>
          <p>Discover the latest trends in men's fashion</p>
          <button className="shop-now-btn" onClick={() => navigate('/shop?gender=men')}>
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="men-categories">
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
      <section className="men-featured">
        <div className="container">
          <div className="featured-grid">
            <div className="featured-card" onClick={() => navigate('/shop?category=shirts')}>
              <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600" alt="Shirts" />
              <div className="featured-overlay">
                <h3>Shirts</h3>
                <p>Classic & Modern</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=pants')}>
              <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600" alt="Pants" />
              <div className="featured-overlay">
                <h3>Pants & Jeans</h3>
                <p>Comfortable Fit</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=shoes')}>
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600" alt="Shoes" />
              <div className="featured-overlay">
                <h3>Shoes</h3>
                <p>Step in Style</p>
              </div>
            </div>
            <div className="featured-card" onClick={() => navigate('/shop?category=accessories')}>
              <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600" alt="Accessories" />
              <div className="featured-overlay">
                <h3>Accessories</h3>
                <p>Complete Your Look</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="men-products">
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
                  <button className="load-more-btn" onClick={() => navigate('/shop?gender=men')}>
                    VIEW ALL PRODUCTS
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="men-promo">
        <div className="promo-content">
          <h2>Special Offer</h2>
          <p>Get 30% off on all men's clothing</p>
          <button className="promo-btn" onClick={() => navigate('/shop?gender=men&sale=true')}>
            SHOP SALE
          </button>
        </div>
      </section>
    </div>
  );
};

export default MenSection;
