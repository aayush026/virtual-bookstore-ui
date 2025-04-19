import axiosInstance from './axiosConfig';

export const getAllOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axiosInstance.get('/orders/my-orders');
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.put(`/orders/${id}/status`, { status });
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await axiosInstance.put(`/orders/${id}/cancel`);
  return response.data;
};