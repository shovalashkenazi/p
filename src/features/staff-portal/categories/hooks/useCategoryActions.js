// src/features/staff-portal/categories/hooks/useCategoryActions.js
import { useToast } from "@chakra-ui/react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../services/categoriesApiSlice";

/**
 * ✅ Hook for category CRUD actions with toast notifications
 */
export const useCategoryActions = () => {
  const toast = useToast();

  // ✅ RTK Query mutations
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  /**
   * Create a new category
   */
  const handleCreate = async ({ label, value }) => {
    try {
      await createCategory({ label, value }).unwrap();
      toast({
        title: "קטגוריה נוצרה בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה ביצירת קטגוריה",
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
   * Update an existing category
   */
  const handleUpdate = async ({ _id, newLabel }) => {
    try {
      await updateCategory({ _id, newLabel }).unwrap();
      toast({
        title: "קטגוריה עודכנה בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה בעדכון קטגוריה",
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
   * Delete a category
   */
  const handleDelete = async (_id) => {
    try {
      await deleteCategory(_id).unwrap();
      toast({
        title: "קטגוריה נמחקה בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "שגיאה במחיקת קטגוריה",
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
    createCategory: handleCreate,
    updateCategory: handleUpdate,
    deleteCategory: handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
    isLoading: isCreating || isUpdating || isDeleting,
  };
};
