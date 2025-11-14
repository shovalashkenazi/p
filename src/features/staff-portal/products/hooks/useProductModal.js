// src/features/staff-portal/products/hooks/useProductModal.js
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../services/productSlice";

/**
 * ✅ Hook for managing product modal state
 * Combines Redux UI state with modal logic
 */
export const useProductModal = () => {
  const dispatch = useDispatch();

  // ✅ Get modal state from Redux
  const { isModalOpen, selectedProduct, modalInitialCategory } = useSelector(
    (state) => state.products
  );
  /**
   * Open modal for creating new product
   * @param {string|null} category - Optional category to pre-fill in the modal
   */
  const openCreateModal = (category = null) => {
    if (category) {
      dispatch(openModal({ product: null, category }));
    } else {
      dispatch(openModal(null));
    }
  };

  /**
   * Open modal for editing existing product
   */
  const openEditModal = (product) => {
    dispatch(openModal(product));
  };

  /**
   * Close modal and clear selected product
   */
  const handleClose = () => {
    dispatch(closeModal());
  };

  return {
    isOpen: isModalOpen,
    selectedProduct,
    modalInitialCategory,
    isEditMode: !!selectedProduct,
    openCreateModal,
    openEditModal,
    closeModal: handleClose,
  };
};
