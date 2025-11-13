import axios from "axios";

// ✅ Read environment variables correctly using Vite
const baseUrl = import.meta.env.VITE_APP_API_URL;

// ✅ Store reference (will be set after store is created)
let storeRef = null;

export const setStoreRef = (store) => {
  storeRef = store;
};

// ✅ Get token from store
const getCurrentToken = () => {
  if (!storeRef) return null;
  const state = storeRef.getState();
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
