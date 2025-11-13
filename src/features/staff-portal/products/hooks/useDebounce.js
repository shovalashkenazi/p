// src/features/staff-portal/products/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * ✅ Custom hook for debouncing values
 * Prevents excessive API calls or expensive operations
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
