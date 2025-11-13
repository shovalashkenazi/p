// src/features/staff-portal/categories/hooks/useCategoryModal.js
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../services/categoriesSlice";

/**
 * ✅ Hook for managing category modal state
 * Combines Redux UI state with modal logic
 */
export const useCategoryModal = () => {
  const dispatch = useDispatch();

  // ✅ Get modal state from Redux
  const { isModalOpen, selectedCategory } = useSelector(
    (state) => state.categories
  );

  /**
   * Open modal for creating new category
   */
  const openCreateModal = () => {
    dispatch(openModal(null));
  };

  /**
   * Open modal for editing existing category
   */
  const openEditModal = (category) => {
    dispatch(openModal(category));
  };

  /**
   * Close modal and clear selected category
   */
  const handleClose = () => {
    dispatch(closeModal());
  };

  return {
    isOpen: isModalOpen,
    selectedCategory,
    isEditMode: !!selectedCategory,
    openCreateModal,
    openEditModal,
    closeModal: handleClose,
  };
};
