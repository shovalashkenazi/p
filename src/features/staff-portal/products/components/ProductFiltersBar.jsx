import React, { memo, useCallback } from "react";
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

/**
 * ✅ Memoized Filters Bar Component
 * Aligned with server filter names
 */
const ProductFiltersBar = memo(({
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

  // Count active filters
  const activeFiltersCount = [
    vinNumber,
    tractorNumber,
    machine,
    model,
    variant,
    year,
    visibility !== null,
  ].filter(Boolean).length;

  // ✅ Memoized input handler to prevent inline function creation
  const handleSearchInput = useCallback(
    (e) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  return (
    <Flex justify="space-between" align="center" mb={4}>
      <HStack spacing={3}>
        {/* Add Product Button */}
        <Button
          leftIcon={<Plus size={20} />}
          bg={primary}
          color="white"
          borderRadius="full"
          px={6}
          h="45px"
          fontSize="md"
          fontWeight="600"
          _hover={{ bg: "primary.200", transform: "translateY(-2px)" }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s"
          boxShadow="md"
          onClick={onOpenCreateModal}
        >
          הוסף מוצר
        </Button>

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
            <ChakraMenuItem onClick={() => onCategoryChange(null)}>
              כל הקטגוריות
            </ChakraMenuItem>
            <Divider />
            {categories.map((cat) => (
              <ChakraMenuItem
                key={cat._id}
                onClick={() => onCategoryChange(cat.value)}
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
          <MenuList p={4} minW="350px">
            <VStack spacing={4} align="stretch">
              <Heading size="sm" color={textColor}>
                סינון מתקדם
              </Heading>
              <Divider />

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  מספר VIN (שלדה)
                </FormLabel>
                <Input
                  placeholder="הזן מספר VIN"
                  value={vinNumber}
                  onChange={(e) => onVinNumberChange(e.target.value)}
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
                  value={tractorNumber}
                  onChange={(e) => onTractorNumberChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  יצרן/מכונה
                </FormLabel>
                <Input
                  placeholder="הזן יצרן"
                  value={machine}
                  onChange={(e) => onMachineChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  דגם
                </FormLabel>
                <Input
                  placeholder="הזן דגם"
                  value={model}
                  onChange={(e) => onModelChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  גרסה/תת-דגם
                </FormLabel>
                <Input
                  placeholder="הזן גרסה"
                  value={variant}
                  onChange={(e) => onVariantChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  שנה
                </FormLabel>
                <Input
                  placeholder="הזן שנה"
                  value={year}
                  onChange={(e) => onYearChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="visibility-filter" mb="0" fontSize="sm">
                  מוצר פעיל
                </FormLabel>
                <Switch
                  id="visibility-filter"
                  colorScheme="orange"
                  isChecked={visibility === true}
                  onChange={(e) =>
                    onVisibilityChange(e.target.checked ? true : null)
                  }
                />
              </FormControl>

              <Divider />
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={onClearFilters}
              >
                נקה הכל
              </Button>
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
          <MenuList p={4} minW="250px">
            <VStack spacing={3} align="stretch">
              <Heading size="sm" color={textColor}>
                בחר עמודות
              </Heading>
              <Divider />

              {[
                { value: "image", label: "תמונה" },
                { value: "name", label: "שם מוצר" },
                { value: "catalogNumber", label: 'מק"ט' },
                { value: "category", label: "קטגוריה" },
                { value: "price", label: "מחיר" },
                { value: "stock", label: "מלאי" },
                { value: "supplier", label: "ספק" },
                { value: "isActive", label: "סטטוס" },
                { value: "actions", label: "פעולות" },
              ].map((column) => (
                <FormControl
                  key={column.value}
                  display="flex"
                  alignItems="center"
                >
                  <FormLabel htmlFor={column.value} mb="0" flex="1">
                    {column.label}
                  </FormLabel>
                  <Switch
                    id={column.value}
                    colorScheme="orange"
                    isChecked={selectedColumns.includes(column.value)}
                    onChange={() => onToggleColumn(column.value)}
                  />
                </FormControl>
              ))}
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

      {/* Search */}
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none" h="full">
          <Search size={18} color={secondaryText} />
        </InputLeftElement>
        <Input
          placeholder="חיפוש מהיר..."
          value={searchQuery}
          onChange={handleSearchInput}
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
    </Flex>
  );
}, (prevProps, nextProps) => {
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
    prevProps.onRefresh === nextProps.onRefresh &&
    prevProps.onOpenCreateModal === nextProps.onOpenCreateModal
  );
});

ProductFiltersBar.displayName = "ProductFiltersBar";

export default ProductFiltersBar;
