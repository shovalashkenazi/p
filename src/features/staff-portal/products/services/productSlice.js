// src/features/staff-portal/products/services/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ==========================
// ✅ UI State Only (No API Data)
// ==========================

const initialState = {
  // Modal state
  isModalOpen: false,
  selectedProduct: null,

  // Filters
  searchQuery: "",
  selectedCategory: null,
  vehicleNumber: "", // מספר כלי
  chassisNumber: "", // מספר שלדה
  manufacturer: "", // יצרן
  model: "", // דגם
  year: "", // שנה
  subModel: "", // תת דגם
  isActiveFilter: null, // מוצר פעיל (null = הכל, true = פעיל, false = לא פעיל)

  // Pagination
  currentPage: 1,
  pageSize: 10,

  // Table UI
  selectedColumns: ["image", "name", "catalogNumber", "category", "price", "stock", "actions"],

  // Collapse states
  collapses: {},
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

    // ========== Filters ==========
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page on filter
    },
    setVehicleNumber(state, action) {
      state.vehicleNumber = action.payload;
      state.currentPage = 1;
    },
    setChassisNumber(state, action) {
      state.chassisNumber = action.payload;
      state.currentPage = 1;
    },
    setManufacturer(state, action) {
      state.manufacturer = action.payload;
      state.currentPage = 1;
    },
    setModel(state, action) {
      state.model = action.payload;
      state.currentPage = 1;
    },
    setYear(state, action) {
      state.year = action.payload;
      state.currentPage = 1;
    },
    setSubModel(state, action) {
      state.subModel = action.payload;
      state.currentPage = 1;
    },
    setIsActiveFilter(state, action) {
      state.isActiveFilter = action.payload;
      state.currentPage = 1;
    },
    clearFilters(state) {
      state.searchQuery = "";
      state.selectedCategory = null;
      state.vehicleNumber = "";
      state.chassisNumber = "";
      state.manufacturer = "";
      state.model = "";
      state.year = "";
      state.subModel = "";
      state.isActiveFilter = null;
      state.currentPage = 1;
    },

    // ========== Pagination ==========
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page
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

    // ========== Collapse States ==========
    toggleCollapse(state, action) {
      const id = action.payload;
      state.collapses[id] = !state.collapses[id];
    },
    setCollapseState(state, action) {
      const { id, isOpen } = action.payload;
      state.collapses[id] = isOpen;
    },
  },
});

export const {
  openModal,
  closeModal,
  setSelectedProduct,
  clearSelectedProduct,
  setSearchQuery,
  setSelectedCategory,
  setVehicleNumber,
  setChassisNumber,
  setManufacturer,
  setModel,
  setYear,
  setSubModel,
  setIsActiveFilter,
  clearFilters,
  setCurrentPage,
  setPageSize,
  toggleColumn,
  toggleCollapse,
  setCollapseState,
} = productSlice.actions;

export default productSlice.reducer;
