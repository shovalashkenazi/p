// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/staff-portal/products/services/productSlice.js";
import categoriesReducer from "../features/staff-portal/categories/services/categoriesSlice.js";
import { categoriesApi } from "../features/staff-portal/categories/services/categoriesApiSlice.js";
import { productsApi } from "../features/staff-portal/products/services/productsApiSlice.js";
import { setStoreRef } from "../config/axios.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    // ✅ RTK Query reducers
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // ✅ RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware),
});

// ✅ Set store reference for axios
setStoreRef(store);
