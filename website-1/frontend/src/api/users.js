import api from "./axios";

export const fetchProfile = async () => {
  const { data } = await api.get("/api/users/profile");
  return data;
};

export const updateProfile = async (phoneNumber) => {
  const { data } = await api.put("/api/users/profile", { phoneNumber });
  return data;
};
