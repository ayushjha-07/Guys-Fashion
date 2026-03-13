// src/context/ProductContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '../services/api';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    size: '',
    color: '',
    brand: '',
    sort: 'newest',
  });

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products based on filters
  const fetchProducts = async (customFilters = {}) => {
    setLoading(true);
    try {
      const params = { ...filters, ...customFilters };
      const response = await productsAPI.getAll(params);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getFeatured();
      setFeaturedProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  // Get single product by ID
  const getProductById = async (id) => {
    try {
      const response = await productsAPI.getById(id);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      return null;
    }
  };

  // Search products
  const searchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await productsAPI.search(query);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      size: '',
      color: '',
      brand: '',
      sort: 'newest',
    });
  };

  const value = {
    products,
    featuredProducts,
    categories,
    loading,
    filters,
    fetchProducts,
    fetchFeaturedProducts,
    getProductById,
    searchProducts,
    updateFilters,
    resetFilters,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
