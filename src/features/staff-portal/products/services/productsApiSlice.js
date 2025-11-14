// src/features/staff-portal/products/services/productsApiSlice.js
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

// ✅ RTK Query API for Products
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // ========== GET: Fetch products (aligned with server getDataService) ==========
    getProducts: builder.query({
      query: (filters) => {
        // ✅ Build clean params object (remove undefined values)
        const params = {};

        // Pagination (required)
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        // Search filters (send only if defined)
        if (filters.searchQuery) params.searchQuery = filters.searchQuery;
        if (filters.category) params.category = filters.category;
        if (filters.vinNumber) params.vinNumber = filters.vinNumber;
        if (filters.tractorNumber) params.tractorNumber = filters.tractorNumber;
        if (filters.machine) params.machine = filters.machine;
        if (filters.model) params.model = filters.model;
        if (filters.variant) params.variant = filters.variant;
        if (filters.year) params.year = filters.year;
        if (filters.visibility !== null && filters.visibility !== undefined) {
          params.visibility = filters.visibility;
        }

        return {
          url: "/product/getData",
          params,
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Products",
                id: _id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
      transformResponse: (response) => ({
        products: response.products || [],
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      }),
    }),

    // ========== POST: Create new product ==========
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/product/createProduct",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // ========== PATCH: Update product ==========
    updateProduct: builder.mutation({
      query: (product) => ({
        url: "/product/updateProduct",
        method: "PATCH",
        body: { product },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: arg._id },
        { type: "Products", id: "LIST" },
      ],
    }),

    // ========== PATCH: Delete product ==========
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: "/product/deleteProducts",
        method: "PATCH",
        body: { _id },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // ========== POST: Update product by fields ==========
    updateProductByFields: builder.mutation({
      query: ({ productId, fields }) => ({
        url: "/product/updateItemByFields",
        method: "POST",
        body: { productId, fields },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: arg.productId },
        { type: "Products", id: "LIST" },
      ],
    }),

    // ========== GET: Get dynamic options (machine/model/year) ==========
    getOptions: builder.query({
      query: (category) => ({
        url: "/product/getOptions",
        params: { category },
      }),
      transformResponse: (response) => {
        // Transform server response to usable format
        // Server returns: [{ machine, models: [{ model, variants, years }] }]
        return response || [];
      },
      // Cache for 5 minutes (options don't change frequently)
      keepUnusedDataFor: 300,
    }),
  }),
});

// ✅ Export hooks for usage in components
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductByFieldsMutation,
  useGetOptionsQuery,
} = productsApi;
