// src/pages/FAQ.js
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. International orders may take 10-15 business days depending on the destination.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free standard shipping on all orders over $50 within the continental United States. For orders under $50, a flat shipping fee of $5.99 applies.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "Order History" section.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customs fees and import duties may apply and are the responsibility of the customer.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unworn, unwashed items with original tags attached. Items must be in their original condition. Sale items and final sale items are not eligible for return.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'To start a return, log into your account, go to "Order History," select the order, and click "Return Items." Follow the prompts to print your prepaid return label. Package the items securely and drop them off at any authorized shipping location.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to your original payment method. Please allow an additional 3-5 business days for the refund to appear in your account.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'Yes! We offer free exchanges for different sizes or colors. Simply initiate a return and place a new order for the item you want. If there\'s a price difference, we\'ll adjust accordingly.'
        }
      ]
    },
    {
      category: 'Products & Sizing',
      questions: [
        {
          question: 'How do I find my size?',
          answer: 'We provide detailed size charts for all our products. Click on the "Size Guide" link on any product page. We recommend measuring yourself and comparing your measurements to our size chart for the best fit.'
        },
        {
          question: 'Are your products true to size?',
          answer: 'Most of our products fit true to size. However, sizing can vary by brand and style. We include fit notes on product pages when items run small or large. Check customer reviews for additional fit feedback.'
        },
        {
          question: 'What materials are your products made from?',
          answer: 'We use a variety of high-quality materials including cotton, polyester, wool, and blends. Detailed material information is available on each product page under "Product Details."'
        },
        {
          question: 'How do I care for my items?',
          answer: 'Care instructions are included on the tag of each item and on the product page. Generally, we recommend washing in cold water and hanging to dry to maintain the quality and longevity of your garments.'
        }
      ]
    },
    {
      category: 'Payment & Security',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted payment gateway.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers. All payments are processed through secure, PCI-compliant payment processors.'
        },
        {
          question: 'Can I use multiple payment methods?',
          answer: 'Currently, we only accept one payment method per order. However, you can use gift cards in combination with another payment method.'
        },
        {
          question: 'Do you offer gift cards?',
          answer: 'Yes! Digital gift cards are available in various denominations. They can be purchased on our website and are delivered via email instantly.'
        }
      ]
    },
    {
      category: 'Account & Support',
      questions: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save items to your wishlist, and checkout faster on future purchases.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Login" and then "Forgot Password." Enter your email address, and we\'ll send you a link to reset your password. The link is valid for 24 hours.'
        },
        {
          question: 'How can I contact customer service?',
          answer: 'You can reach our customer service team via email at support@fashionstore.com, through our contact form, or by calling 1-800-FASHION. Our team is available Monday-Friday, 9 AM - 6 PM EST.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, orders are processed for shipping and cannot be changed. Please contact customer service immediately if you need to make changes.'
        }
      ]
    }
  ];

  const toggleAccordion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="faq-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products, shipping, returns, and more</p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-sidebar">
          <h3>Quick Links</h3>
          <ul>
            {faqs.map((category, index) => (
              <li key={index}>
                <a href={`#${category.category.replace(/\s+/g, '-').toLowerCase()}`}>
                  {category.category}
                </a>
              </li>
            ))}
          </ul>
          <div className="contact-card">
            <h4>Still have questions?</h4>
            <p>Our customer service team is here to help!</p>
            <a href="/contact" className="contact-btn">Contact Us</a>
          </div>
        </div>

        <div className="faq-content">
          {faqs.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="faq-category"
              id={category.category.replace(/\s+/g, '-').toLowerCase()}
            >
              <h2 className="category-title">
                <i className="fas fa-folder-open"></i>
                {category.category}
              </h2>
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isActive = activeIndex === index;
                  
                  return (
                    <div 
                      key={questionIndex} 
                      className={`faq-item ${isActive ? 'active' : ''}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                      >
                        <span>{faq.question}</span>
                        <i className={`fas fa-chevron-${isActive ? 'up' : 'down'}`}></i>
                      </button>
                      <div className={`faq-answer ${isActive ? 'show' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <div className="help-content">
          <h2>Need More Help?</h2>
          <p>Can't find what you're looking for? We're here to assist you!</p>
          <div className="help-options">
            <div className="help-option">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>support@fashionstore.com</p>
            </div>
            <div className="help-option">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>1-800-FASHION</p>
            </div>
            <div className="help-option">
              <i className="fas fa-comments"></i>
              <h3>Live Chat</h3>
              <p>Available Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
