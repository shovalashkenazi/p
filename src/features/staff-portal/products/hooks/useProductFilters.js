// src/features/staff-portal/products/hooks/useProductFilters.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
} from "../services/productSlice";
import {
  selectSelectedColumns,
  selectSearchQuery,
  selectCategory,
  selectVinNumber,
  selectTractorNumber,
  selectMachine,
  selectModel,
  selectVariant,
  selectYear,
  selectVisibility,
  selectPage,
  selectLimit,
} from "../services/productSelectors";

/**
 * ✅ Hook for managing product filters and pagination
 * Aligned 1:1 with server filter names
 */
export const useProductFilters = () => {
  const dispatch = useDispatch();

  // ✅ Use memoized selectors (aligned with server)
  const searchQuery = useSelector(selectSearchQuery);
  const category = useSelector(selectCategory);
  const vinNumber = useSelector(selectVinNumber);
  const tractorNumber = useSelector(selectTractorNumber);
  const machine = useSelector(selectMachine);
  const model = useSelector(selectModel);
  const variant = useSelector(selectVariant);
  const year = useSelector(selectYear);
  const visibility = useSelector(selectVisibility);
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const selectedColumns = useSelector(selectSelectedColumns);

  // ✅ Memoized filter handlers (aligned with server)
  const handleSearchChange = useCallback(
    (query) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (value) => {
      dispatch(setCategory(value));
    },
    [dispatch]
  );

  const handleVinNumberChange = useCallback(
    (value) => {
      dispatch(setVinNumber(value));
    },
    [dispatch]
  );

  const handleTractorNumberChange = useCallback(
    (value) => {
      dispatch(setTractorNumber(value));
    },
    [dispatch]
  );

  const handleMachineChange = useCallback(
    (value) => {
      dispatch(setMachine(value));
    },
    [dispatch]
  );

  const handleModelChange = useCallback(
    (value) => {
      dispatch(setModel(value));
    },
    [dispatch]
  );

  const handleVariantChange = useCallback(
    (value) => {
      dispatch(setVariant(value));
    },
    [dispatch]
  );

  const handleYearChange = useCallback(
    (value) => {
      dispatch(setYear(value));
    },
    [dispatch]
  );

  const handleVisibilityChange = useCallback(
    (value) => {
      dispatch(setVisibility(value));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // ✅ Memoized pagination handlers (aligned with server)
  const handlePageChange = useCallback(
    (pageNum) => {
      dispatch(setPage(pageNum));
    },
    [dispatch]
  );

  const handleLimitChange = useCallback(
    (limitNum) => {
      dispatch(setLimit(limitNum));
    },
    [dispatch]
  );

  // ✅ UI handlers
  const handleToggleColumn = useCallback(
    (column) => {
      dispatch(toggleColumn(column));
    },
    [dispatch]
  );

  return {
    // Filter values (aligned with server)
    searchQuery,
    category,
    vinNumber,
    tractorNumber,
    machine,
    model,
    variant,
    year,
    visibility,
    page,
    limit,
    selectedColumns,
    // Filter setters (all memoized)
    setSearchQuery: handleSearchChange,
    setCategory: handleCategoryChange,
    setVinNumber: handleVinNumberChange,
    setTractorNumber: handleTractorNumberChange,
    setMachine: handleMachineChange,
    setModel: handleModelChange,
    setVariant: handleVariantChange,
    setYear: handleYearChange,
    setVisibility: handleVisibilityChange,
    clearFilters: handleClearFilters,
    setPage: handlePageChange,
    setLimit: handleLimitChange,
    toggleColumn: handleToggleColumn,
  };
};
