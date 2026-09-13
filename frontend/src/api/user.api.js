//api so that we can get user details after login

import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/user/profile");

  return res.data;
};
