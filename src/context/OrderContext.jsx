import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const OrderContext = createContext();

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/order/allorder`);
      setOrders(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  const addOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/order/add`, orderData);
      const newOrder = response.data.data;

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      return { success: true, order: newOrder };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add order";
      setError(errorMessage);
      console.error("Error adding order:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${baseUrl}/order/${id}`, orderData);
      const updatedOrder = response.data.data;

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update order";
      setError(errorMessage);
      console.error("Error updating order:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseUrl}/order/${id}`);

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete order";
      setError(errorMessage);
      console.error("Error deleting order:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/order/${id}`);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch order";
      setError(errorMessage);
      console.error("Error fetching order by ID:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (id) => {
    return orders.find((order) => order._id === id);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  const getOrdersByEmail = (email) => {
    return orders.filter(
      (order) => order.email.toLowerCase() === email.toLowerCase()
    );
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    orders,
    loading,
    error,
    fetchAllOrders,
    fetchOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrdersByStatus,
    getOrdersByEmail,
    clearError,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
