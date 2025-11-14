import React, { memo, useCallback, useState, useMemo } from "react";
import {
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  Divider,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  useColorModeValue,
  Select,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Search,
  ChevronDown,
  List,
  Filter,
  Columns,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useDynamicFilters } from "../hooks";

/**
 * ✅ Memoized Filters Bar Component
 * Aligned with server filter names
 */
const ProductFiltersBar = memo(
  ({
    searchQuery,
    category,
    vinNumber,
    tractorNumber,
    machine,
    model,
    variant,
    year,
    visibility,
    selectedColumns,
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
    onToggleColumn,
    onRefresh,
    onOpenCreateModal,
    isFetching,
  }) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const secondaryText = useColorModeValue("gray.600", "gray.400");
    const primary = useColorModeValue("primary.100", "primary.300");
    const hoverBg = useColorModeValue("gray.50", "gray.700");

    // ✅ Category search state for Create Product menu
    const [categorySearchQuery, setCategorySearchQuery] = useState("");

    // ✅ Local state for quick search (not sent to Redux until search button clicked)
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

    // ✅ Local state for filter inputs (not sent to Redux until "Apply" clicked)
    const [localFilters, setLocalFilters] = useState({
      vinNumber: vinNumber || "",
      tractorNumber: tractorNumber || "",
      machine: machine || "",
      model: model || "",
      variant: variant || "",
      year: year || "",
      visibility: visibility,
    });

    // ✅ Sync local state with Redux state when props change (e.g., after clear filters)
    React.useEffect(() => {
      setLocalSearchQuery(searchQuery || "");
    }, [searchQuery]);

    React.useEffect(() => {
      setLocalFilters({
        vinNumber: vinNumber || "",
        tractorNumber: tractorNumber || "",
        machine: machine || "",
        model: model || "",
        variant: variant || "",
        year: year || "",
        visibility: visibility,
      });
    }, [vinNumber, tractorNumber, machine, model, variant, year, visibility]);

    // ✅ Filtered categories for Create Product menu
    const filteredCategoriesForCreate = useMemo(() => {
      if (!categorySearchQuery.trim()) return categories;

      const searchLower = categorySearchQuery.toLowerCase().trim();
      return categories.filter(
        (cat) =>
          cat.label.toLowerCase().includes(searchLower) ||
          cat.value.toLowerCase().includes(searchLower)
      );
    }, [categories, categorySearchQuery]);

    // ✅ Get dynamic filter options (machine → model → year)
    // Use localFilters for dynamic options to show immediate UI updates
    const {
      machines,
      models,
      years,
      isLoading: isOptionsLoading,
    } = useDynamicFilters(category, localFilters.machine, localFilters.model);

    // Count active filters (based on Redux state - what's actually applied)
    const activeFiltersCount = [
      vinNumber,
      tractorNumber,
      machine,
      model,
      variant,
      year,
      visibility !== null,
    ].filter(Boolean).length;

    // ✅ Handle local search input change (does not trigger server call)
    const handleLocalSearchInput = useCallback((e) => {
      setLocalSearchQuery(e.target.value);
    }, []);

    // ✅ Apply quick search to Redux and trigger server call
    const handleApplySearch = useCallback(() => {
      onSearchChange(localSearchQuery);
    }, [localSearchQuery, onSearchChange]);

    // ✅ Handle Enter key press in search input
    const handleSearchKeyPress = useCallback(
      (e) => {
        if (e.key === "Enter") {
          handleApplySearch();
        }
      },
      [handleApplySearch]
    );

    // ✅ Local filter change handlers (update local state only)
    const handleLocalVinNumberChange = useCallback((value) => {
      setLocalFilters((prev) => ({ ...prev, vinNumber: value }));
    }, []);

    const handleLocalTractorNumberChange = useCallback((value) => {
      setLocalFilters((prev) => ({ ...prev, tractorNumber: value }));
    }, []);

    const handleLocalMachineChange = useCallback((value) => {
      setLocalFilters((prev) => ({
        ...prev,
        machine: value,
        // Reset dependent fields
        model: value ? prev.model : "",
        year: value ? prev.year : "",
      }));
    }, []);

    const handleLocalModelChange = useCallback((value) => {
      setLocalFilters((prev) => ({
        ...prev,
        model: value,
        // Reset dependent fields
        year: value ? prev.year : "",
      }));
    }, []);

    const handleLocalVariantChange = useCallback((value) => {
      setLocalFilters((prev) => ({ ...prev, variant: value }));
    }, []);

    const handleLocalYearChange = useCallback((value) => {
      setLocalFilters((prev) => ({ ...prev, year: value }));
    }, []);

    const handleLocalVisibilityChange = useCallback((value) => {
      setLocalFilters((prev) => ({ ...prev, visibility: value }));
    }, []);

    // ✅ Apply filters to Redux and trigger server call
    const handleApplyFilters = useCallback(() => {
      onVinNumberChange(localFilters.vinNumber);
      onTractorNumberChange(localFilters.tractorNumber);
      onMachineChange(localFilters.machine);
      onModelChange(localFilters.model);
      onVariantChange(localFilters.variant);
      onYearChange(localFilters.year);
      onVisibilityChange(localFilters.visibility);
    }, [
      localFilters,
      onVinNumberChange,
      onTractorNumberChange,
      onMachineChange,
      onModelChange,
      onVariantChange,
      onYearChange,
      onVisibilityChange,
    ]);

    // ✅ Handle Enter key press in filter inputs
    const handleFilterKeyPress = useCallback(
      (e) => {
        if (e.key === "Enter") {
          handleApplyFilters();
        }
      },
      [handleApplyFilters]
    );

    // ✅ Smart handlers for cascading reset (Category dropdown - applies immediately)
    const handleCategoryChange = useCallback(
      (selectedCategory) => {
        onCategoryChange(selectedCategory);
        // Reset dependent dynamic filters when category changes
        onMachineChange("");
        onModelChange("");
        onYearChange("");
        // Also reset local state
        setLocalFilters((prev) => ({
          ...prev,
          machine: "",
          model: "",
          year: "",
        }));
      },
      [onCategoryChange, onMachineChange, onModelChange, onYearChange]
    );

    // ✅ Handle category selection and open modal with selected category
    const handleCategorySelect = useCallback(
      (selectedCategory) => {
        setCategorySearchQuery(""); // Reset search
        onOpenCreateModal(selectedCategory); // Open modal with category
      },
      [onOpenCreateModal]
    );

    return (
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
          {/* Add Product Menu (identical style to Categories button) */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDown size={16} />}
              leftIcon={<Plus size={18} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={textColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              הוסף מוצר
            </MenuButton>
            <MenuList maxH="400px" overflowY="auto" p={2}>
              {/* ✅ Category Search Input */}
              <Box px={2} pb={2}>
                <InputGroup size="sm">
                  <InputLeftElement pointerEvents="none">
                    <Search size={14} color={secondaryText} />
                  </InputLeftElement>
                  <Input
                    placeholder="חפש קטגוריה..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    borderRadius="lg"
                    fontSize="sm"
                  />
                </InputGroup>
              </Box>
              <Divider />
              {/* ✅ Filtered Categories List */}
              {filteredCategoriesForCreate.length > 0 ? (
                filteredCategoriesForCreate.map((cat) => (
                  <ChakraMenuItem
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat.value)}
                  >
                    {cat.label}
                  </ChakraMenuItem>
                ))
              ) : (
                <Box px={4} py={3}>
                  <Text fontSize="sm" color={secondaryText} textAlign="center">
                    לא נמצאו קטגוריות תואמות
                  </Text>
                </Box>
              )}
            </MenuList>
          </Menu>

          {/* Categories Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDown size={16} />}
              leftIcon={<List size={18} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={textColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              {category
                ? categories.find((c) => c.value === category)?.label ||
                  "קטגוריה"
                : "כל הקטגוריות"}
            </MenuButton>
            <MenuList maxH="300px" overflowY="auto">
              <ChakraMenuItem onClick={() => handleCategoryChange(null)}>
                כל הקטגוריות
              </ChakraMenuItem>
              <Divider />
              {categories.map((cat) => (
                <ChakraMenuItem
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </ChakraMenuItem>
              ))}
            </MenuList>
          </Menu>

          {/* Filters Menu */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<Filter size={16} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={textColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              מסננים {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </MenuButton>
            <MenuList p={4} minW="700px">
              <VStack spacing={4} align="stretch">
                <Heading size="sm" color={textColor}>
                  סינון מתקדם
                </Heading>
                <Divider />

                {/* ✅ Two-column grid layout for filters */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={4}
                >
                  {/* Column 1 */}
                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      מספר VIN (שלדה)
                    </FormLabel>
                    <Input
                      placeholder="הזן מספר VIN"
                      value={localFilters.vinNumber}
                      onChange={(e) =>
                        handleLocalVinNumberChange(e.target.value)
                      }
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      מספר טרקטור
                    </FormLabel>
                    <Input
                      placeholder="הזן מספר טרקטור"
                      value={localFilters.tractorNumber}
                      onChange={(e) =>
                        handleLocalTractorNumberChange(e.target.value)
                      }
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      יצרן/מכונה
                    </FormLabel>
                    <Select
                      placeholder="בחר יצרן"
                      value={localFilters.machine}
                      onChange={(e) => handleLocalMachineChange(e.target.value)}
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                      isDisabled={isOptionsLoading}
                    >
                      {machines.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      דגם
                    </FormLabel>
                    <Select
                      placeholder="בחר דגם"
                      value={localFilters.model}
                      onChange={(e) => handleLocalModelChange(e.target.value)}
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                      isDisabled={!localFilters.machine || isOptionsLoading}
                    >
                      {models.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      גרסה/תת-דגם
                    </FormLabel>
                    <Input
                      placeholder="הזן גרסה"
                      value={localFilters.variant}
                      onChange={(e) => handleLocalVariantChange(e.target.value)}
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>
                      שנה
                    </FormLabel>
                    <Select
                      placeholder="בחר שנה"
                      value={localFilters.year}
                      onChange={(e) => handleLocalYearChange(e.target.value)}
                      onKeyDown={handleFilterKeyPress}
                      size="sm"
                      borderRadius="lg"
                      isDisabled={!localFilters.model || isOptionsLoading}
                    >
                      {years.map((y) => (
                        <option key={y.value} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Visibility switch spans both columns */}
                  <FormControl
                    display="flex"
                    alignItems="center"
                    gridColumn="span 2"
                  >
                    <FormLabel htmlFor="visibility-filter" mb="0" fontSize="sm">
                      מוצרים פעיל
                    </FormLabel>
                    <Switch
                      id="visibility-filter"
                      colorScheme="orange"
                      isChecked={localFilters.visibility === true}
                      onChange={(e) =>
                        handleLocalVisibilityChange(
                          e.target.checked ? true : null
                        )
                      }
                    />
                  </FormControl>
                </Box>

                <Divider />
                <HStack spacing={3}>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    bg="red.50"
                    onClick={onClearFilters}
                    flex="1"
                  >
                    נקה הכל
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={handleApplyFilters}
                    flex="1"
                    leftIcon={<Search size={16} />}
                  >
                    החל מסננים
                  </Button>
                </HStack>
              </VStack>
            </MenuList>
          </Menu>

          {/* Columns Menu */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<Columns size={16} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={textColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              עמודות
            </MenuButton>
            <MenuList p={4} minW="300px">
              <VStack spacing={4} align="stretch">
                <Heading size="sm" color={textColor}>
                  בחר עמודות
                </Heading>
                <Divider />

                {/* ✅ Two-column grid layout for columns */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={3}
                >
                  {[
                    { value: "image", label: "תמונה" },
                    { value: "name", label: "שם מוצר" },
                    { value: "catalogNumber", label: 'מק"ט' },
                    { value: "category", label: "קטגוריה" },
                    { value: "price", label: "מחיר" },
                    { value: "stock", label: "מלאי" },
                    { value: "supplier", label: "ספק" },
                    { value: "visibility", label: "נראות" },
                    { value: "actions", label: "פעולות" },
                  ].map((column) => (
                    <FormControl
                      key={column.value}
                      display="flex"
                      alignItems="center"
                    >
                      <Flex>
                        <FormLabel
                          htmlFor={column.value}
                          mb="0"
                          flex="1"
                          fontSize="sm"
                        >
                          {column.label}
                        </FormLabel>
                        <Switch
                          id={column.value}
                          colorScheme="orange"
                          isChecked={selectedColumns.includes(column.value)}
                          onChange={() => onToggleColumn(column.value)}
                        />
                      </Flex>
                    </FormControl>
                  ))}
                </Box>
              </VStack>
            </MenuList>
          </Menu>

          {/* Refresh Button */}
          <Button
            leftIcon={<RefreshCw size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            transition="all 0.5s ease"
            onClick={onRefresh}
            isLoading={isFetching}
          >
            רענן
          </Button>
        </HStack>

        {/* Quick Search with Button */}
        <HStack spacing={2}>
          <InputGroup maxW="320px">
            <InputLeftElement pointerEvents="none" h="full">
              <Search size={18} color={secondaryText} />
            </InputLeftElement>
            <Input
              placeholder="חיפוש מהיר..."
              value={localSearchQuery}
              onChange={handleLocalSearchInput}
              onKeyDown={handleSearchKeyPress}
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="full"
              h="45px"
              fontSize="md"
              _placeholder={{ color: secondaryText }}
              _focus={{
                borderColor: primary,
                boxShadow: `0 0 0 1px ${primary}`,
              }}
            />
          </InputGroup>
          <Button
            onClick={handleApplySearch}
            colorScheme="orange"
            borderRadius="full"
            h="45px"
            px={6}
            fontSize="sm"
            fontWeight="600"
          >
            חיפוש
          </Button>
        </HStack>
      </Flex>
    );
  },
  (prevProps, nextProps) => {
    // ✅ Custom comparison - prevent re-render unless these specific props changed
    return (
      prevProps.searchQuery === nextProps.searchQuery &&
      prevProps.category === nextProps.category &&
      prevProps.vinNumber === nextProps.vinNumber &&
      prevProps.tractorNumber === nextProps.tractorNumber &&
      prevProps.machine === nextProps.machine &&
      prevProps.model === nextProps.model &&
      prevProps.variant === nextProps.variant &&
      prevProps.year === nextProps.year &&
      prevProps.visibility === nextProps.visibility &&
      prevProps.isFetching === nextProps.isFetching &&
      prevProps.categories.length === nextProps.categories.length &&
      prevProps.selectedColumns.length === nextProps.selectedColumns.length &&
      prevProps.onSearchChange === nextProps.onSearchChange &&
      prevProps.onCategoryChange === nextProps.onCategoryChange &&
      prevProps.onMachineChange === nextProps.onMachineChange &&
      prevProps.onModelChange === nextProps.onModelChange &&
      prevProps.onYearChange === nextProps.onYearChange &&
      prevProps.onRefresh === nextProps.onRefresh &&
      prevProps.onOpenCreateModal === nextProps.onOpenCreateModal
    );
  }
);

ProductFiltersBar.displayName = "ProductFiltersBar";

export default ProductFiltersBar;
