import api from "./axios";

export const createOrder = async (shippingDetails) => {
  const { data } = await api.post("/api/orders", { shippingDetails });
  return data;
};

export const fetchOrders = async () => {
  const { data } = await api.get("/api/orders");
  return data;
};
