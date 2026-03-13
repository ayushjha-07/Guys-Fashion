// src/pages/Blog.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Latest Fashion Trends for 2024",
      excerpt: "Discover the hottest fashion trends that are taking the industry by storm this year.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
      date: "Nov 8, 2024",
      category: "Fashion Trends",
      author: "Fashion Team"
    },
    {
      id: 2,
      title: "How to Style Your Wardrobe for Every Season",
      excerpt: "Expert tips on creating versatile outfits that work year-round.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
      date: "Nov 5, 2024",
      category: "Style Guide",
      author: "Style Expert"
    },
    {
      id: 3,
      title: "Sustainable Fashion: Making Eco-Friendly Choices",
      excerpt: "Learn how to build a sustainable wardrobe without compromising on style.",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
      date: "Nov 1, 2024",
      category: "Sustainability",
      author: "Eco Team"
    },
    {
      id: 4,
      title: "The Ultimate Guide to Accessorizing",
      excerpt: "Transform any outfit with the right accessories. Here's how to do it right.",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500",
      date: "Oct 28, 2024",
      category: "Accessories",
      author: "Fashion Team"
    },
    {
      id: 5,
      title: "Winter Fashion Essentials You Need",
      excerpt: "Stay warm and stylish with these must-have winter fashion pieces.",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
      date: "Oct 25, 2024",
      category: "Seasonal",
      author: "Winter Style"
    },
    {
      id: 6,
      title: "Building a Capsule Wardrobe",
      excerpt: "Simplify your closet with a curated collection of versatile pieces.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea3c5a5e?w=500",
      date: "Oct 20, 2024",
      category: "Minimalism",
      author: "Style Expert"
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Fashion Blog</h1>
        <p>Stay updated with the latest fashion trends, style tips, and industry news</p>
      </div>

      <div className="blog-container">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <i className="far fa-calendar"></i> {post.date}
                  </span>
                  <span className="blog-author">
                    <i className="far fa-user"></i> {post.author}
                  </span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="read-more-btn">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="sidebar-widget">
            <h3>Categories</h3>
            <ul className="category-list">
              <li><Link to="/blog?category=trends">Fashion Trends</Link></li>
              <li><Link to="/blog?category=style">Style Guide</Link></li>
              <li><Link to="/blog?category=sustainability">Sustainability</Link></li>
              <li><Link to="/blog?category=accessories">Accessories</Link></li>
              <li><Link to="/blog?category=seasonal">Seasonal</Link></li>
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3>Popular Posts</h3>
            <ul className="popular-posts">
              {blogPosts.slice(0, 3).map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.image} alt={post.title} />
                    <div>
                      <h4>{post.title}</h4>
                      <span>{post.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget newsletter">
            <h3>Subscribe to Newsletter</h3>
            <p>Get the latest fashion updates delivered to your inbox</p>
            <form>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
