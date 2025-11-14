// src/features/staff-portal/products/services/productSelectors.js
import { createSelector } from "@reduxjs/toolkit";

/**
 * ✅ Memoized selectors for product filters and pagination
 * Aligned 1:1 with server filter names for consistency
 */

// Base selector
const selectProductsState = (state) => state.products;

// ✅ Filter selectors (aligned with server filters object)
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectCategory = (state) => state.products.category;
export const selectVinNumber = (state) => state.products.vinNumber;
export const selectTractorNumber = (state) => state.products.tractorNumber;
export const selectMachine = (state) => state.products.machine;
export const selectModel = (state) => state.products.model;
export const selectVariant = (state) => state.products.variant;
export const selectYear = (state) => state.products.year;
export const selectVisibility = (state) => state.products.visibility;

// ✅ Pagination selectors (aligned with server)
export const selectPage = (state) => state.products.page;
export const selectLimit = (state) => state.products.limit;

// ✅ UI state selectors
export const selectSelectedColumns = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedColumns
);
