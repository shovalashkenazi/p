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
  tagTypes: ["Products", "ProductOptions"],
  endpoints: (builder) => ({
    // ========== GET: Fetch products with pagination ==========
    getProducts: builder.query({
      query: (params) => ({
        url: "/product/getData",
        params,
      }),
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ _id }) => ({ type: "Products", id: _id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
      transformResponse: (response) => ({
        products: response.products || [],
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      }),
    }),

    // ========== GET: Fetch single product by catalog number ==========
    getProductByCatalogNumber: builder.query({
      query: (catalogNumber) => ({
        url: "/product/getProductByCatalogNumber",
        method: "POST",
        body: { catalogNumber },
      }),
      providesTags: (result, error, catalogNumber) => [
        { type: "Products", id: catalogNumber },
      ],
    }),

    // ========== GET: Fetch options for category ==========
    getOptions: builder.query({
      query: (category) => ({
        url: "/product/getOptions",
        method: "POST",
        body: { category },
      }),
      providesTags: ["ProductOptions"],
      transformResponse: (response) => response || [],
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
  }),
});

// ✅ Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByCatalogNumberQuery,
  useGetOptionsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductByFieldsMutation,
  useLazyGetProductByCatalogNumberQuery,
  useLazyGetOptionsQuery,
} = productsApi;
