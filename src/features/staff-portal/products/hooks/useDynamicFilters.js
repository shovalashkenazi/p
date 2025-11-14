// src/features/staff-portal/products/hooks/useDynamicFilters.js
import { useMemo } from "react";
import { useGetOptionsQuery } from "../services/productsApiSlice";

/**
 * ✅ Hook for managing dynamic cascading filters (machine → model → year)
 *
 * The server returns options in this format:
 * [
 *   {
 *     machine: "CLARK",
 *     models: [
 *       { model: "C80D", variants: "", years: "2020,2021,2022" }
 *     ]
 *   }
 * ]
 *
 * This hook provides:
 * - List of available machines
 * - List of models filtered by selected machine
 * - List of years filtered by selected model
 * - Smart reset logic (changing machine clears model/year, etc.)
 */
export const useDynamicFilters = (category, selectedMachine, selectedModel) => {
  // ✅ Fetch options from server
  // Skip fetching if no category is selected
  const {
    data: options = [],
    isLoading,
    isFetching,
    isError,
  } = useGetOptionsQuery(category, {
    skip: !category, // Skip if category is null/empty
  });

  // ✅ Extract list of unique machines
  const machines = useMemo(() => {
    if (!options || options.length === 0) return [];

    return options
      .map((item) => ({
        value: item.machine,
        label: item.machine,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "he"));
  }, [options]);

  // ✅ Extract models for selected machine
  const models = useMemo(() => {
    if (!selectedMachine || !options || options.length === 0) return [];

    const machineData = options.find((item) => item.machine === selectedMachine);
    if (!machineData || !machineData.models) return [];

    return machineData.models
      .map((modelItem) => ({
        value: modelItem.model,
        label: modelItem.model,
        years: modelItem.years, // Keep years for next step
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "he"));
  }, [options, selectedMachine]);

  // ✅ Extract years for selected model
  const years = useMemo(() => {
    if (!selectedModel || !selectedMachine || !options || options.length === 0)
      return [];

    const machineData = options.find((item) => item.machine === selectedMachine);
    if (!machineData || !machineData.models) return [];

    const modelData = machineData.models.find(
      (modelItem) => modelItem.model === selectedModel
    );
    if (!modelData || !modelData.years) return [];

    // Parse years from "2020,2021,2022" format
    const yearsArray = modelData.years
      .split(",")
      .map((y) => y.trim())
      .filter(Boolean)
      .map((year) => ({
        value: year,
        label: year,
      }))
      .sort((a, b) => b.value - a.value); // Newest first

    return yearsArray;
  }, [options, selectedMachine, selectedModel]);

  return {
    machines,
    models,
    years,
    isLoading,
    isFetching,
    isError,
  };
};
