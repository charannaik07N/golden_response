import api from "./axios";

export const getCart = async () => {
  const { data } = await api.get("/api/cart");
  return data;
};

export const addToCart = async (productId, quantity) => {
  const { data } = await api.post("/api/cart", { productId, quantity });
  return data;
};

export const updateCartItem = async (productId, quantity) => {
  const { data } = await api.put(`/api/cart/${productId}`, { quantity });
  return data;
};

export const removeCartItem = async (productId) => {
  const { data } = await api.delete(`/api/cart/${productId}`);
  return data;
};
