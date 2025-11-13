// src/features/staff-portal/products/services/productSelectors.js
import { createSelector } from "@reduxjs/toolkit";

/**
 * ✅ Memoized selectors to prevent unnecessary re-renders
 * These selectors ensure referential stability
 */

// Base selector
const selectProductsState = (state) => state.products;

// ✅ Memoized filters selector (returns stable object reference)
export const selectFilters = createSelector(
  [selectProductsState],
  (productsState) => ({
    searchQuery: productsState.searchQuery,
    selectedCategory: productsState.selectedCategory,
    vehicleNumber: productsState.vehicleNumber,
    chassisNumber: productsState.chassisNumber,
    manufacturer: productsState.manufacturer,
    model: productsState.model,
    year: productsState.year,
    subModel: productsState.subModel,
    isActiveFilter: productsState.isActiveFilter,
  })
);

// ✅ Memoized pagination selector
export const selectPagination = createSelector(
  [selectProductsState],
  (productsState) => ({
    currentPage: productsState.currentPage,
    pageSize: productsState.pageSize,
  })
);

// ✅ Memoized columns selector
export const selectSelectedColumns = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedColumns
);

// ✅ Memoized modal state selector
export const selectModalState = createSelector(
  [selectProductsState],
  (productsState) => ({
    isModalOpen: productsState.isModalOpen,
    selectedProduct: productsState.selectedProduct,
  })
);

// ✅ Individual field selectors (for fine-grained subscriptions)
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectVehicleNumber = (state) => state.products.vehicleNumber;
export const selectChassisNumber = (state) => state.products.chassisNumber;
export const selectManufacturer = (state) => state.products.manufacturer;
export const selectModel = (state) => state.products.model;
export const selectYear = (state) => state.products.year;
export const selectSubModel = (state) => state.products.subModel;
export const selectIsActiveFilter = (state) => state.products.isActiveFilter;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectPageSize = (state) => state.products.pageSize;
