// src/features/products/services/productApi.js
import Axios from "../../../../config/axios";

export const createProduct = async (product) => {
  const { data } = await Axios.post(`/product/createProduct`, { product });
  return data;
};

export const updateProduct = async (product) => {
  const { data } = await Axios.patch(`/product/updateProduct`, { product });
  return data;
};

export const deleteProduct = async (_id) => {
  const { data } = await Axios.patch(`/product/deleteProducts`, { _id });
  return data;
};

export const getProductByCatalogNumber = async (catalogNumber) => {
  const { data } = await Axios.post(`/product/getProductByCatalogNumber`, {
    catalogNumber,
  });
  return data;
};

export const getData = async (params) => {
  const { data } = await Axios.get("/product/getData", { params });
  return data;
};

export const getOptions = async (category) => {
  const { data } = await Axios.post(`/product/getOptions`, { category });
  return data;
};

export const updateItemByFields = async (productId, fields) => {
  const { data } = await Axios.post("/product/updateItemByFields", {
    productId,
    fields,
  });
  return data;
};
