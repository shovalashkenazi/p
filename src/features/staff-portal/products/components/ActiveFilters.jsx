// src/features/staff-portal/products/components/ActiveFilters.jsx
import React, { memo } from "react";
import { HStack, Badge, CloseButton, Text, useColorModeValue } from "@chakra-ui/react";

/**
 * ✅ Active Filters Display Component
 * Shows all active filters as badges with remove buttons
 */
const ActiveFilters = memo(({
  searchQuery,
  category,
  vinNumber,
  tractorNumber,
  machine,
  model,
  variant,
  year,
  visibility,
  categories,
  onSearchChange,
  onCategoryChange,
  onVinNumberChange,
  onTractorNumberChange,
  onMachineChange,
  onModelChange,
  onVariantChange,
  onYearChange,
  onVisibilityChange,
  onClearFilters,
}) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  // Build array of active filters
  const activeFilters = [];

  if (searchQuery?.trim()) {
    activeFilters.push({
      label: "חיפוש",
      value: searchQuery,
      onRemove: () => onSearchChange(""),
    });
  }

  if (category) {
    const categoryLabel = categories.find((c) => c.value === category)?.label || category;
    activeFilters.push({
      label: "קטגוריה",
      value: categoryLabel,
      onRemove: () => onCategoryChange(null),
    });
  }

  if (vinNumber?.trim()) {
    activeFilters.push({
      label: "VIN",
      value: vinNumber,
      onRemove: () => onVinNumberChange(""),
    });
  }

  if (tractorNumber?.trim()) {
    activeFilters.push({
      label: "טרקטור",
      value: tractorNumber,
      onRemove: () => onTractorNumberChange(""),
    });
  }

  if (machine?.trim()) {
    activeFilters.push({
      label: "יצרן",
      value: machine,
      onRemove: () => {
        onMachineChange("");
        // Reset dependent fields
        onModelChange("");
        onYearChange("");
      },
    });
  }

  if (model?.trim()) {
    activeFilters.push({
      label: "דגם",
      value: model,
      onRemove: () => {
        onModelChange("");
        // Reset dependent fields
        onYearChange("");
      },
    });
  }

  if (variant?.trim()) {
    activeFilters.push({
      label: "גרסה",
      value: variant,
      onRemove: () => onVariantChange(""),
    });
  }

  if (year?.trim()) {
    activeFilters.push({
      label: "שנה",
      value: year,
      onRemove: () => onYearChange(""),
    });
  }

  if (visibility !== null) {
    activeFilters.push({
      label: "נראות",
      value: visibility ? "פעיל" : "לא פעיל",
      onRemove: () => onVisibilityChange(null),
    });
  }

  // Don't render if no active filters
  if (activeFilters.length === 0) return null;

  return (
    <HStack
      spacing={2}
      p={3}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      flexWrap="wrap"
      mb={4}
    >
      <Text fontSize="sm" fontWeight="600" color={textColor} flexShrink={0}>
        פילטרים פעילים:
      </Text>

      {activeFilters.map((filter, index) => (
        <Badge
          key={index}
          colorScheme="orange"
          px={3}
          py={1}
          borderRadius="full"
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
        >
          <Text as="span" fontWeight="600">
            {filter.label}:
          </Text>
          <Text as="span">{filter.value}</Text>
          <CloseButton
            size="sm"
            onClick={filter.onRemove}
            ml={1}
            _hover={{ bg: "orange.600" }}
            borderRadius="full"
          />
        </Badge>
      ))}

      {activeFilters.length > 1 && (
        <Badge
          colorScheme="red"
          px={3}
          py={1}
          borderRadius="full"
          cursor="pointer"
          onClick={onClearFilters}
          _hover={{ bg: "red.600" }}
          fontSize="sm"
          fontWeight="600"
        >
          נקה הכל
        </Badge>
      )}
    </HStack>
  );
});

ActiveFilters.displayName = "ActiveFilters";

export default ActiveFilters;
