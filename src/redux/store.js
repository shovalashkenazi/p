// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/staff-portal/products/services/productSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
