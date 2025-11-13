import React, { memo } from "react";
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
 * Prevents unnecessary re-renders when parent state changes
 */
const ProductFiltersBar = memo(({
  searchQuery,
  selectedCategory,
  vehicleNumber,
  chassisNumber,
  manufacturer,
  model,
  year,
  subModel,
  isActiveFilter,
  selectedColumns,
  categories,
  onSearchChange,
  onCategoryChange,
  onVehicleNumberChange,
  onChassisNumberChange,
  onManufacturerChange,
  onModelChange,
  onYearChange,
  onSubModelChange,
  onIsActiveFilterChange,
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
    vehicleNumber,
    chassisNumber,
    manufacturer,
    model,
    year,
    subModel,
    isActiveFilter !== null,
  ].filter(Boolean).length;

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
            {selectedCategory
              ? categories.find((c) => c.value === selectedCategory)?.label ||
                "קטגוריה"
              : "כל הקטגוריות"}
          </MenuButton>
          <MenuList maxH="300px" overflowY="auto">
            <ChakraMenuItem onClick={() => onCategoryChange(null)}>
              כל הקטגוריות
            </ChakraMenuItem>
            <Divider />
            {categories.map((category) => (
              <ChakraMenuItem
                key={category._id}
                onClick={() => onCategoryChange(category.value)}
              >
                {category.label}
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
                  מספר כלי
                </FormLabel>
                <Input
                  placeholder="הזן מספר כלי"
                  value={vehicleNumber}
                  onChange={(e) => onVehicleNumberChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  מספר שלדה
                </FormLabel>
                <Input
                  placeholder="הזן מספר שלדה"
                  value={chassisNumber}
                  onChange={(e) => onChassisNumberChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  יצרן
                </FormLabel>
                <Input
                  placeholder="הזן יצרן"
                  value={manufacturer}
                  onChange={(e) => onManufacturerChange(e.target.value)}
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

              <FormControl>
                <FormLabel fontSize="sm" color={textColor}>
                  תת דגם
                </FormLabel>
                <Input
                  placeholder="הזן תת דגם"
                  value={subModel}
                  onChange={(e) => onSubModelChange(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="active-filter" mb="0" fontSize="sm">
                  מוצר פעיל
                </FormLabel>
                <Switch
                  id="active-filter"
                  colorScheme="orange"
                  isChecked={isActiveFilter === true}
                  onChange={(e) =>
                    onIsActiveFilterChange(e.target.checked ? true : null)
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
          onChange={(e) => onSearchChange(e.target.value)}
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
});

ProductFiltersBar.displayName = "ProductFiltersBar";

export default ProductFiltersBar;
