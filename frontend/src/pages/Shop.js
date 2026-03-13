// src/pages/Shop.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import './Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { products, fetchProducts, loading, updateFilters } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    if (category) {
      updateFilters({ category });
    }
    if (gender) {
      updateFilters({ gender });
    }
    
    fetchProducts();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchProducts({ search: searchQuery });
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop All Products</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-icon">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      <button className="filter-toggle" onClick={toggleFilters}>
        <i className="fas fa-filter"></i> Filters
      </button>

      <div className="shop-content">
        <FilterSidebar />
        
        <div className="products-section">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="no-products">
                  <p>No products found matching your criteria.</p>
                  <p>Try adjusting your filters or search terms.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;