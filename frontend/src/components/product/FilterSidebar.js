// src/components/product/FilterSidebar.js
import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import './FilterSidebar.css';

const FilterSidebar = () => {
  const { filters, updateFilters, resetFilters, categories } = useProducts();
  const [isOpen, setIsOpen] = useState(true);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Gray'];
  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 - ₹2,500', min: 1000, max: 2500 },
    { label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
    { label: 'Over ₹5,000', min: 5000, max: 100000 },
  ];

  const handlePriceChange = (min, max) => {
    updateFilters({ minPrice: min, maxPrice: max });
  };

  const handleSizeToggle = (size) => {
    updateFilters({ size: filters.size === size ? '' : size });
  };

  const handleColorToggle = (color) => {
    updateFilters({ color: filters.color === color ? '' : color });
  };

  const handleCategoryChange = (categoryId) => {
    updateFilters({ category: categoryId });
  };

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="reset-btn" onClick={resetFilters}>
          Reset All
        </button>
      </div>

      {/* Categories */}
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              checked={filters.category === ''}
              onChange={() => handleCategoryChange('')}
            />
            <span>All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category._id} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === category._id}
                onChange={() => handleCategoryChange(category._id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="filter-options">
          {priceRanges.map((range, index) => (
            <label key={index} className="filter-option">
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
            min="0"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="filter-section">
        <h4>Size</h4>
        <div className="size-options">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${filters.size === size ? 'active' : ''}`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="filter-section">
        <h4>Color</h4>
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-btn ${filters.color === color ? 'active' : ''}`}
              onClick={() => handleColorToggle(color)}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            >
              {filters.color === color && <i className="fas fa-check"></i>}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="filter-section">
        <h4>Sort By</h4>
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="sort-select"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
