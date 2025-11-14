// src/features/staff-portal/products/services/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ==========================
// ✅ UI State Only (No API Data)
// ==========================

const initialState = {
  // Modal state
  isModalOpen: false,
  selectedProduct: null,

  // Filters (aligned with server filters object)
  searchQuery: "", // חיפוש כללי
  category: null, // קטגוריה
  vinNumber: "", // מספר VIN (שלדה)
  tractorNumber: "", // מספר טרקטור
  machine: "", // יצרן/מכונה
  model: "", // דגם
  variant: "", // גרסה/תת-דגם
  year: "", // שנה
  visibility: null, // מוצר פעיל (null = הכל, true = פעיל, false = לא פעיל)

  // Pagination (aligned with server)
  page: 1,
  limit: 10,

  // Table UI
  selectedColumns: [
    "image",
    "name",
    "catalogNumber",
    "category",
    "price",
    "stock",
    "actions",
  ],
};

const productSlice = createSlice({
  name: "productsUI",
  initialState,
  reducers: {
    // ========== Modal Management ==========
    openModal(state, action) {
      state.isModalOpen = true;
      state.selectedProduct = action.payload || null;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedProduct = null;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },

    // ========== Filters (aligned with server) ==========
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to first page on search
    },
    setCategory(state, action) {
      console.log(action.payload);
      state.category = action.payload;
      state.page = 1; // Reset to first page on filter
    },
    setVinNumber(state, action) {
      state.vinNumber = action.payload;
      state.page = 1;
    },
    setTractorNumber(state, action) {
      state.tractorNumber = action.payload;
      state.page = 1;
    },
    setMachine(state, action) {
      state.machine = action.payload;
      state.page = 1;
    },
    setModel(state, action) {
      state.model = action.payload;
      state.page = 1;
    },
    setVariant(state, action) {
      state.variant = action.payload;
      state.page = 1;
    },
    setYear(state, action) {
      state.year = action.payload;
      state.page = 1;
    },
    setVisibility(state, action) {
      state.visibility = action.payload;
      state.page = 1;
    },
    clearFilters(state) {
      state.searchQuery = "";
      state.category = null;
      state.vinNumber = "";
      state.tractorNumber = "";
      state.machine = "";
      state.model = "";
      state.variant = "";
      state.year = "";
      state.visibility = null;
      state.page = 1;
    },

    // ========== Pagination (aligned with server) ==========
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.page = 1; // Reset to first page
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
  setSelectedProduct,
  clearSelectedProduct,
  setSearchQuery,
  setCategory,
  setVinNumber,
  setTractorNumber,
  setMachine,
  setModel,
  setVariant,
  setYear,
  setVisibility,
  clearFilters,
  setPage,
  setLimit,
  toggleColumn,
} = productSlice.actions;

export default productSlice.reducer;
