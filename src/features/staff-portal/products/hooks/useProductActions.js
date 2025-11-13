// src/features/staff-portal/products/hooks/useProductActions.js
import { useToast } from "@chakra-ui/react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductByFieldsMutation,
} from "../services/productsApiSlice";

/**
 * ✅ Hook for product CRUD actions with toast notifications
 */
export const useProductActions = () => {
  const toast = useToast();

  // ✅ RTK Query mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProductByFields, { isLoading: isUpdatingFields }] =
    useUpdateProductByFieldsMutation();

  /**
   * Create a new product
   */
  const handleCreate = async (product) => {
    try {
      await createProduct(product).unwrap();
      toast({
        title: "מוצר נוצר בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה ביצירת מוצר",
        description: error?.data?.message || error?.message || "אירעה שגיאה",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return { success: false, error };
    }
  };

  /**
   * Update an existing product
   */
  const handleUpdate = async (product) => {
    try {
      await updateProduct(product).unwrap();
      toast({
        title: "מוצר עודכן בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה בעדכון מוצר",
        description: error?.data?.message || error?.message || "אירעה שגיאה",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return { success: false, error };
    }
  };

  /**
   * Delete a product
   */
  const handleDelete = async (_id) => {
    try {
      await deleteProduct(_id).unwrap();
      toast({
        title: "מוצר נמחק בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה במחיקת מוצר",
        description: error?.data?.message || error?.message || "אירעה שגיאה",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return { success: false, error };
    }
  };

  /**
   * Update product by specific fields
   */
  const handleUpdateFields = async (productId, fields) => {
    try {
      await updateProductByFields({ productId, fields }).unwrap();
      toast({
        title: "שדות עודכנו בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה בעדכון שדות",
        description: error?.data?.message || error?.message || "אירעה שגיאה",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return { success: false, error };
    }
  };

  return {
    createProduct: handleCreate,
    updateProduct: handleUpdate,
    deleteProduct: handleDelete,
    updateProductByFields: handleUpdateFields,
    isCreating,
    isUpdating,
    isDeleting,
    isUpdatingFields,
    isLoading: isCreating || isUpdating || isDeleting || isUpdatingFields,
  };
};
