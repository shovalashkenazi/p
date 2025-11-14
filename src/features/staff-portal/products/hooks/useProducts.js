// src/features/staff-portal/products/hooks/useProducts.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productsApiSlice";
import { useDebounce } from "./useDebounce";

/**
 * ✅ Hook for fetching and filtering products
 * Aligned 1:1 with server getDataService logic
 */
export const useProducts = () => {
  // ✅ Get UI state from Redux (aligned with server filters)
  const {
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
  } = useSelector((state) => state.products);

  // ✅ Debounce search and filter inputs (500ms delay)
  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedVinNumber = useDebounce(vinNumber, 500);
  const debouncedTractorNumber = useDebounce(tractorNumber, 500);
  const debouncedMachine = useDebounce(machine, 500);
  const debouncedModel = useDebounce(model, 500);
  const debouncedVariant = useDebounce(variant, 500);
  const debouncedYear = useDebounce(year, 500);

  // ✅ Build filters object (aligned 1:1 with server filters)
  const filters = useMemo(() => {
    const params = {
      page: page - 1, // ✅ Server expects 0-based page (0 = first page)
      limit,
    };

    // ✅ Add only non-empty filter values (server removes undefined/null)
    if (debouncedSearch?.trim()) {
      params.searchQuery = debouncedSearch.trim();
    }

    if (category) {
      params.category = category;
    }

    if (debouncedVinNumber?.trim()) {
      params.vinNumber = debouncedVinNumber.trim();
    }

    if (debouncedTractorNumber?.trim()) {
      params.tractorNumber = debouncedTractorNumber.trim();
    }

    if (debouncedMachine?.trim()) {
      params.machine = debouncedMachine.trim();
    }

    if (debouncedModel?.trim()) {
      params.model = debouncedModel.trim();
    }

    if (debouncedVariant?.trim()) {
      params.variant = debouncedVariant.trim();
    }

    if (debouncedYear?.trim()) {
      params.year = debouncedYear.trim();
    }

    if (visibility !== null) {
      params.visibility = visibility;
    }

    return params;
  }, [
    page,
    limit,
    debouncedSearch,
    category,
    debouncedVinNumber,
    debouncedTractorNumber,
    debouncedMachine,
    debouncedModel,
    debouncedVariant,
    debouncedYear,
    visibility,
  ]);

  // ✅ Fetch products from RTK Query (aligned with server)
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery(filters, {
    // ✅ Keep previous data while fetching (prevents table "jumping")
    keepPreviousData: true,
    // ✅ Cache for 30 seconds
    refetchOnMountOrArgChange: 30,
    // ✅ Fine-grained re-render control
    selectFromResult: ({ data, isLoading, isFetching, isError, error }) => ({
      data,
      isLoading,
      isFetching,
      isError,
      error,
    }),
  });

  // ✅ Memoize extracted data
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
    page,
    limit,
  };
};
