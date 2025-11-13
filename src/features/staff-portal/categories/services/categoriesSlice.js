// src/features/staff-portal/categories/services/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ==========================
// ✅ UI State Only (No API Data)
// ==========================

const initialState = {
  // Modal state
  isModalOpen: false,
  selectedCategory: null,

  // Filters
  searchQuery: "",

  // Table UI
  selectedColumns: ["name", "identifier", "image", "actions"],
};

const categoriesSlice = createSlice({
  name: "categoriesUI",
  initialState,
  reducers: {
    // ========== Modal Management ==========
    openModal(state, action) {
      state.isModalOpen = true;
      state.selectedCategory = action.payload || null;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedCategory = null;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    // ========== Filters ==========
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = "";
    },

    // ========== Table Columns ==========
    toggleColumn(state, action) {
      const column = action.payload;
      const index = state.selectedColumns.indexOf(column);
      if (index > -1) {
        state.selectedColumns.splice(index, 1);
      } else {
        state.selectedColumns.push(column);
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  setSelectedCategory,
  setSearchQuery,
  clearFilters,
  toggleColumn,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
