// src/features/staff-portal/products/hooks/useProductFilters.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
} from "../services/productSlice";

/**
 * ✅ Hook for managing product filters and pagination
 * OPTIMIZED: Uses useCallback to prevent function recreation
 */
export const useProductFilters = () => {
  const dispatch = useDispatch();

  // ✅ Get filter state from Redux (using shallow equal selector)
  const filters = useSelector((state) => ({
    searchQuery: state.products.searchQuery,
    selectedCategory: state.products.selectedCategory,
    vehicleNumber: state.products.vehicleNumber,
    chassisNumber: state.products.chassisNumber,
    manufacturer: state.products.manufacturer,
    model: state.products.model,
    year: state.products.year,
    subModel: state.products.subModel,
    isActiveFilter: state.products.isActiveFilter,
    currentPage: state.products.currentPage,
    pageSize: state.products.pageSize,
    selectedColumns: state.products.selectedColumns,
  }));

  /**
   * Update search query (memoized)
   */
  const handleSearchChange = useCallback(
    (query) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  /**
   * Update selected category filter (memoized)
   */
  const handleCategoryChange = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  /**
   * Update vehicle number filter (memoized)
   */
  const handleVehicleNumberChange = useCallback(
    (value) => {
      dispatch(setVehicleNumber(value));
    },
    [dispatch]
  );

  /**
   * Update chassis number filter (memoized)
   */
  const handleChassisNumberChange = useCallback(
    (value) => {
      dispatch(setChassisNumber(value));
    },
    [dispatch]
  );

  /**
   * Update manufacturer filter (memoized)
   */
  const handleManufacturerChange = useCallback(
    (value) => {
      dispatch(setManufacturer(value));
    },
    [dispatch]
  );

  /**
   * Update model filter (memoized)
   */
  const handleModelChange = useCallback(
    (value) => {
      dispatch(setModel(value));
    },
    [dispatch]
  );

  /**
   * Update year filter (memoized)
   */
  const handleYearChange = useCallback(
    (value) => {
      dispatch(setYear(value));
    },
    [dispatch]
  );

  /**
   * Update sub-model filter (memoized)
   */
  const handleSubModelChange = useCallback(
    (value) => {
      dispatch(setSubModel(value));
    },
    [dispatch]
  );

  /**
   * Update isActive filter (memoized)
   */
  const handleIsActiveFilterChange = useCallback(
    (value) => {
      dispatch(setIsActiveFilter(value));
    },
    [dispatch]
  );

  /**
   * Clear all filters (memoized)
   */
  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  /**
   * Change current page (memoized)
   */
  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  /**
   * Change page size (memoized)
   */
  const handlePageSizeChange = useCallback(
    (size) => {
      dispatch(setPageSize(size));
    },
    [dispatch]
  );

  /**
   * Toggle column visibility (memoized)
   */
  const handleToggleColumn = useCallback(
    (column) => {
      dispatch(toggleColumn(column));
    },
    [dispatch]
  );

  return {
    // Filter values
    ...filters,
    // Filter setters (all memoized)
    setSearchQuery: handleSearchChange,
    setSelectedCategory: handleCategoryChange,
    setVehicleNumber: handleVehicleNumberChange,
    setChassisNumber: handleChassisNumberChange,
    setManufacturer: handleManufacturerChange,
    setModel: handleModelChange,
    setYear: handleYearChange,
    setSubModel: handleSubModelChange,
    setIsActiveFilter: handleIsActiveFilterChange,
    clearFilters: handleClearFilters,
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    toggleColumn: handleToggleColumn,
  };
};
