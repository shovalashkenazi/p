// src/features/staff-portal/categories/hooks/useCategories.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/categoriesApiSlice";

/**
 * ✅ Hook for fetching and filtering categories
 * Combines RTK Query with Redux UI filters
 */
export const useCategories = () => {
  // ✅ Fetch categories from RTK Query
  const {
    data: categories = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCategoriesQuery();

  // ✅ Get search query from Redux UI state
  const searchQuery = useSelector((state) => state.categories.searchQuery);

  // ✅ Filter categories by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const query = searchQuery.toLowerCase();
    return categories.filter(
      (category) =>
        category.label?.toLowerCase().includes(query) ||
        category.value?.toLowerCase().includes(query)
    );
  }, [categories, searchQuery]);

  return {
    categories: filteredCategories,
    allCategories: categories,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    total: categories.length,
    filteredTotal: filteredCategories.length,
  };
};
