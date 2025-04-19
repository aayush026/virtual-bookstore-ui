import axiosInstance from './axiosConfig';

export const getAllBooks = async (params = {}) => {
  const response = await axiosInstance.get('/books', { params });
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axiosInstance.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await axiosInstance.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (query) => {
  const response = await axiosInstance.get(`/books/search?query=${query}`);
  return response.data;
};