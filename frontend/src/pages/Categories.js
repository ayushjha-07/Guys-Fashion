// src/pages/Categories.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './Categories.css';

const Categories = () => {
  const { categories, loading } = useProducts();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?category=${categoryId}`);
  };

  // Sample category images - in production, these would come from the backend
  const categoryImages = {
    'Men': 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600',
    'Women': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    'Kids': 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600',
    'Accessories': 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600',
    'Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
    'Bags': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    'Watches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  };

  const getImageForCategory = (categoryName) => {
    return categoryImages[categoryName] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600';
  };

  return (
    <div className="categories-page">
      <div className="categories-hero">
        <div className="categories-hero-content">
          <h1>Shop by Category</h1>
          <p>Explore our curated collections and find exactly what you're looking for</p>
        </div>
      </div>

      <div className="categories-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {categories.length > 0 ? (
              <div className="categories-grid-page">
                {categories.map((category) => (
                  <div 
                    key={category._id} 
                    className="category-card-page"
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    <div className="category-image-wrapper">
                      <img 
                        src={category.image?.url || getImageForCategory(category.name)} 
                        alt={category.name}
                      />
                      <div className="category-overlay-page">
                        <h3>{category.name}</h3>
                        {category.description && (
                          <p>{category.description}</p>
                        )}
                        <button className="shop-category-btn">
                          Shop Now <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-categories">
                <i className="fas fa-box-open"></i>
                <h3>No Categories Available</h3>
                <p>Check back soon for new categories!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Category Benefits Section */}
      <div className="category-benefits">
        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="fas fa-tags"></i>
          </div>
          <h3>Organized Shopping</h3>
          <p>Find what you need quickly with our well-organized categories</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="fas fa-star"></i>
          </div>
          <h3>Curated Collections</h3>
          <p>Each category features hand-picked items for quality assurance</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <h3>Regular Updates</h3>
          <p>New products added regularly to keep our collections fresh</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
