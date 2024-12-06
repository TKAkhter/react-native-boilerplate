import store from "@/redux/store";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
