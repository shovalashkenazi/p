// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCatalogNumber,
  getData,
  getOptions,
  updateItemByFields,
} from "./productApi";

// ==========================
// ✅ Async thunks
// ==========================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getData(params);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await createProduct(product);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await updateProduct(product);
      return res.updatedProduct || res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (_id, { rejectWithValue }) => {
    try {
      await deleteProduct(_id);
      return _id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getOptionsThunk = createAsyncThunk(
  "products/getOptions",
  async (category, { rejectWithValue }) => {
    try {
      const res = await getOptions(category);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const setSelectedProductThunk = createAsyncThunk(
  "products/setSelectedProduct",
  async (catalogNumber, { rejectWithValue }) => {
    try {
      const res = await getProductByCatalogNumber(catalogNumber);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateByFieldsThunk = createAsyncThunk(
  "products/updateByFields",
  async ({ productId, fields }, { rejectWithValue }) => {
    try {
      const res = await updateItemByFields(productId, fields);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================
// ✅ Slice
// ==========================

const initialState = {
  products: [],
  selectedProduct: null,
  total: 0,
  totalPages: 0,
  uniqMachinesAndSubModelAndSubRef: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      })

      // Update
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
      })

      // Delete
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.total -= 1;
      })

      // Get options
      .addCase(getOptionsThunk.fulfilled, (state, action) => {
        state.uniqMachinesAndSubModelAndSubRef = action.payload;
      })

      // Selected product
      .addCase(setSelectedProductThunk.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      // Update by fields
      .addCase(updateByFieldsThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
