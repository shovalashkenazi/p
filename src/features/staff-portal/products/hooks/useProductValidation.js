// src/features/staff-portal/products/hooks/useProductValidation.js
import { useState, useCallback, useMemo } from "react";

/**
 * ✅ Hook for cross-tab product validation
 *
 * Tracks errors across all tabs and provides:
 * - Tab-specific error indicators
 * - First tab with error detection
 * - Global error summary
 * - Field-level error messages
 */
export const useProductValidation = () => {
  const [errors, setErrors] = useState({});

  /**
   * Validate all product fields
   * Returns: { isValid: boolean, errors: object, firstErrorTab: number }
   */
  const validate = useCallback((formData) => {
    const newErrors = {};

    // ========== Tab 0: כללי (General) ==========
    if (!formData.name?.trim()) {
      newErrors.name = "שם מוצר הוא שדה חובה";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "שם מוצר חייב להכיל לפחות 2 תווים";
    }

    // catalogNumber is required ONLY if isOriginal = true
    // When isOriginal = false, the server generates it automatically
    if (formData.isOriginal && !formData.catalogNumber?.trim()) {
      newErrors.catalogNumber = "מק״ט הוא שדה חובה עבור מוצר מקורי";
    }

    if (!formData.category) {
      newErrors.category = "יש לבחור קטגוריה";
    }

    // ========== Tab 1: פרטים כספיים (Financial) ==========
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = "מחיר חייב להיות 0 או גדול יותר";
    }

    if (formData.priceBeforeVat && parseFloat(formData.priceBeforeVat) < 0) {
      newErrors.priceBeforeVat = "מחיר לפני מע״מ לא תקין";
    }

    if (formData.purchasePrice && parseFloat(formData.purchasePrice) < 0) {
      newErrors.purchasePrice = "מחיר קניה לא תקין";
    }

    // ========== Tab 2: פרטים טכניים (Technical) ==========
    // Optional validations for technical fields
    if (formData.width && isNaN(parseFloat(formData.width))) {
      newErrors.width = "רוחב חייב להיות מספר";
    }

    if (formData.height && isNaN(parseFloat(formData.height))) {
      newErrors.height = "גובה חייב להיות מספר";
    }

    if (formData.weight && isNaN(parseFloat(formData.weight))) {
      newErrors.weight = "משקל חייב להיות מספר";
    }

    // ========== Tab 3: תמונות (Images) ==========
    // Optional: at least one image required
    // if (!formData.imageUrl || formData.imageUrl.length === 0) {
    //   newErrors.imageUrl = "נדרשת לפחות תמונה אחת";
    // }

    // ========== Tab 4: תאימות (Compatibility) ==========
    // Manufacturers validation (optional - depends on requirements)
    // if (!formData.manufacturers || formData.manufacturers.length === 0) {
    //   newErrors.manufacturers = "יש להוסיף לפחות יצרן אחד";
    // }

    setErrors(newErrors);

    // Determine first tab with error
    const firstErrorTab = getFirstErrorTab(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
      firstErrorTab,
    };
  }, []);

  /**
   * Get the first tab index that contains errors
   */
  const getFirstErrorTab = useCallback((errorObj) => {
    const errorsByTab = {
      0: ["name", "catalogNumber", "category", "en_name", "visibility", "isOriginal"],
      1: ["price", "priceBeforeVat", "purchasePrice", "supplierPrice"],
      2: ["width", "height", "weight", "curvature", "color", "holes", "type", "print"],
      3: ["imageUrl"],
      4: ["manufacturers"],
      5: ["alternateCatalogNumber"],
      6: ["installationInstructions", "comments"],
    };

    for (const [tabIndex, fields] of Object.entries(errorsByTab)) {
      if (fields.some((field) => errorObj[field])) {
        return parseInt(tabIndex, 10);
      }
    }

    return -1; // No errors
  }, []);

  /**
   * Check if a specific tab has errors
   */
  const hasTabErrors = useCallback(
    (tabIndex) => {
      const errorsByTab = {
        0: ["name", "catalogNumber", "category", "en_name", "visibility", "isOriginal"],
        1: ["price", "priceBeforeVat", "purchasePrice", "supplierPrice"],
        2: ["width", "height", "weight", "curvature", "color", "holes", "type", "print"],
        3: ["imageUrl"],
        4: ["manufacturers"],
        5: ["alternateCatalogNumber"],
        6: ["installationInstructions", "comments"],
      };

      const fieldsForTab = errorsByTab[tabIndex] || [];
      return fieldsForTab.some((field) => errors[field]);
    },
    [errors]
  );

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Clear specific field error
   */
  const clearFieldError = useCallback((fieldName) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  }, []);

  /**
   * Global error summary for display at top of modal
   */
  const errorSummary = useMemo(() => {
    const errorCount = Object.keys(errors).length;
    if (errorCount === 0) return null;

    return {
      count: errorCount,
      message: `ישנם ${errorCount} שדות חסרים או לא תקינים`,
    };
  }, [errors]);

  return {
    errors,
    validate,
    hasTabErrors,
    clearErrors,
    clearFieldError,
    errorSummary,
  };
};
