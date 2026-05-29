import api from "./axios";

export const fetchProducts = async (page = 1, limit = 12) => {
  const { data } = await api.get(`/api/products?page=${page}&limit=${limit}`);
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};
