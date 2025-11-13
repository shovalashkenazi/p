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
import {
  selectFilters,
  selectPagination,
  selectSelectedColumns,
  selectSearchQuery,
  selectSelectedCategory,
  selectVehicleNumber,
  selectChassisNumber,
  selectManufacturer,
  selectModel,
  selectYear,
  selectSubModel,
  selectIsActiveFilter,
  selectCurrentPage,
  selectPageSize,
} from "../services/productSelectors";

/**
 * ✅ Hook for managing product filters and pagination
 * OPTIMIZED: Uses memoized selectors to prevent unnecessary re-renders
 */
export const useProductFilters = () => {
  const dispatch = useDispatch();

  // ✅ Use memoized selectors (returns stable references)
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const vehicleNumber = useSelector(selectVehicleNumber);
  const chassisNumber = useSelector(selectChassisNumber);
  const manufacturer = useSelector(selectManufacturer);
  const model = useSelector(selectModel);
  const year = useSelector(selectYear);
  const subModel = useSelector(selectSubModel);
  const isActiveFilter = useSelector(selectIsActiveFilter);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const selectedColumns = useSelector(selectSelectedColumns);

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
    // Filter values (from memoized selectors)
    searchQuery,
    selectedCategory,
    vehicleNumber,
    chassisNumber,
    manufacturer,
    model,
    year,
    subModel,
    isActiveFilter,
    currentPage,
    pageSize,
    selectedColumns,
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
