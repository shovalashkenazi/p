// src/features/staff-portal/products/hooks/useProducts.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productsApiSlice";
import { useDebounce } from "./useDebounce";

/**
 * ✅ Hook for fetching and filtering products
 * Combines RTK Query with Redux UI filters and pagination
 * OPTIMIZED: Uses debounce and selectFromResult
 */
export const useProducts = () => {
  // ✅ Get UI state from Redux
  const {
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
  } = useSelector((state) => state.products);

  // ✅ Debounce search and filter inputs to prevent excessive API calls
  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedVehicleNumber = useDebounce(vehicleNumber, 500);
  const debouncedChassisNumber = useDebounce(chassisNumber, 500);
  const debouncedManufacturer = useDebounce(manufacturer, 500);
  const debouncedModel = useDebounce(model, 500);
  const debouncedYear = useDebounce(year, 500);
  const debouncedSubModel = useDebounce(subModel, 500);

  // ✅ Build query params (memoized to prevent recalculation on every render)
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    if (debouncedVehicleNumber) {
      params.vehicleNumber = debouncedVehicleNumber;
    }

    if (debouncedChassisNumber) {
      params.chassisNumber = debouncedChassisNumber;
    }

    if (debouncedManufacturer) {
      params.manufacturer = debouncedManufacturer;
    }

    if (debouncedModel) {
      params.model = debouncedModel;
    }

    if (debouncedYear) {
      params.year = debouncedYear;
    }

    if (debouncedSubModel) {
      params.subModel = debouncedSubModel;
    }

    if (isActiveFilter !== null) {
      params.isActive = isActiveFilter;
    }

    return params;
  }, [
    debouncedSearch,
    selectedCategory,
    debouncedVehicleNumber,
    debouncedChassisNumber,
    debouncedManufacturer,
    debouncedModel,
    debouncedYear,
    debouncedSubModel,
    isActiveFilter,
    currentPage,
    pageSize,
  ]);

  // ✅ Fetch products from RTK Query with advanced optimizations
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery(queryParams, {
    // ✅ Keep previous data while fetching new data (prevents table "jumping")
    keepPreviousData: true,
    // ✅ Refetch only when necessary
    refetchOnMountOrArgChange: 30, // 30 seconds cache
    // ✅ selectFromResult prevents re-renders when other query data changes
    selectFromResult: ({ data, isLoading, isFetching, isError, error }) => ({
      data,
      isLoading,
      isFetching,
      isError,
      error,
    }),
  });

  // ✅ Memoize extracted data to prevent recalculation
  const products = useMemo(() => data?.products || [], [data?.products]);
  const total = useMemo(() => data?.total || 0, [data?.total]);
  const totalPages = useMemo(() => data?.totalPages || 0, [data?.totalPages]);

  return {
    products,
    total,
    totalPages,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    currentPage,
    pageSize,
  };
};
