// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/staff-portal/products/services/productSlice.js";
import categoriesReducer from "../features/staff-portal/categories/services/categoriesSlice.js";
import { categoriesApi } from "../features/staff-portal/categories/services/categoriesApiSlice.js";
import { setStoreRef } from "../config/axios.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    // ✅ RTK Query reducer
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  // ✅ RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware),
});

// ✅ Set store reference for axios
setStoreRef(store);
