import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/product/all`);
      setProducts(response.data.products || []);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newProduct = response.data.product;
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      return newProduct;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add product";
      setError(errorMessage);
      console.error("Error adding product:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${baseUrl}/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProduct = response.data.product;
      
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === id ? updatedProduct : product
        )
      );
      return updatedProduct;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update product";
      setError(errorMessage);
      console.error("Error updating product:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseUrl}/product/${id}`);
      
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete product";
      setError(errorMessage);
      console.error("Error deleting product:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`);
      return response.data.product; 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch product";
      setError(errorMessage);
      console.error("Error fetching product by ID:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find((product) => product._id === id);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    products,
    loading,
    error,
    fetchAllProducts,
    fetchProductById,
    addProduct,
    editProduct,
    deleteProduct,
    getProductById,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;