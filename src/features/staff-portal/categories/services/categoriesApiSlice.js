// src/features/staff-portal/categories/services/categoriesApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Base URL from environment
const baseUrl = import.meta.env.VITE_APP_API_URL;

// ✅ Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state if exists
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

// ✅ RTK Query API
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // ========== GET: Fetch all categories ==========
    getCategories: builder.query({
      query: () => "/productCategories/fetchProductCategories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Categories", id: _id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
      // Transform response if needed
      transformResponse: (response) => response || [],
    }),

    // ========== POST: Create category ==========
    createCategory: builder.mutation({
      query: ({ label, value }) => ({
        url: "/productCategories/createProductCategory",
        method: "POST",
        body: { label, value },
      }),
      // Invalidate cache to refetch categories
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    // ========== PATCH: Update category ==========
    updateCategory: builder.mutation({
      query: ({ _id, newLabel }) => ({
        url: "/productCategories/updateProductCategory",
        method: "PATCH",
        body: { _id, newLabel },
      }),
      // Invalidate specific category and list
      invalidatesTags: (result, error, arg) => [
        { type: "Categories", id: arg._id },
        { type: "Categories", id: "LIST" },
      ],
    }),

    // ========== PATCH: Delete category ==========
    deleteCategory: builder.mutation({
      query: (_id) => ({
        url: "/productCategories/deleteProductCategory",
        method: "PATCH",
        body: { _id },
      }),
      // Invalidate list after deletion
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

// ✅ Export hooks for usage in components
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
