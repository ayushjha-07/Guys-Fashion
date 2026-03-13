// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About FashionStore</h1>
          <p>Your trusted destination for premium fashion</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2024, FashionStore has been dedicated to bringing you the latest trends
                in clothing and accessories. We believe that fashion should be accessible to everyone,
                which is why we offer high-quality products at competitive prices.
              </p>
              <p>
                Our team of fashion experts carefully curates each collection to ensure you have
                access to the best styles from around the world. From casual wear to formal attire,
                we have something for every occasion.
              </p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" alt="Fashion Store" />
            </div>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <i className="fas fa-heart"></i>
                <h3>Quality First</h3>
                <p>We never compromise on the quality of our products</p>
              </div>
              <div className="value-card">
                <i className="fas fa-users"></i>
                <h3>Customer Focused</h3>
                <p>Your satisfaction is our top priority</p>
              </div>
              <div className="value-card">
                <i className="fas fa-leaf"></i>
                <h3>Sustainability</h3>
                <p>Committed to eco-friendly and ethical practices</p>
              </div>
              <div className="value-card">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>Always staying ahead of fashion trends</p>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2>Why Choose Us?</h2>
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>Premium Quality</h4>
                  <p>All products are carefully selected and quality-checked</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>Fast Shipping</h4>
                  <p>Quick and reliable delivery to your doorstep</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>Easy Returns</h4>
                  <p>Hassle-free 30-day return policy</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>Secure Shopping</h4>
                  <p>Your data and transactions are always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
