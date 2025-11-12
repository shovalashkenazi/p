import axios from "axios";
import { store } from "../redux/store";

// ✅ Read environment variables correctly using Vite
const baseUrl = import.meta.env.VITE_APP_API_URL;

const getCurrentToken = () => {
  const state = store.getState();
  return state.auth?.token || null;
};

// Axios instance
const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
Axios.interceptors.request.use((config) => {
  const token = getCurrentToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error);
    return Promise.reject(error);
  }
);

export default Axios;
