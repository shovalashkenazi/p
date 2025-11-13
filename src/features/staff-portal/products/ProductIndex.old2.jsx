import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  IconButton,
  HStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Divider,
  Image,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  Search,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  X,
  List,
} from "lucide-react";
import ProductModal from "./ProductModal";
import { ProductTableSkeleton } from "./components/ProductTableSkeleton";
import {
  useProducts,
  useProductActions,
  useProductModal,
  useProductFilters,
} from "./hooks";
import { useGetCategoriesQuery } from "../categories/services/categoriesApiSlice";

const ProductIndex = () => {
  // ✅ Custom Hooks
  const {
    products,
    total,
    totalPages,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    currentPage,
  } = useProducts();

  const { deleteProduct } = useProductActions();

  const { isOpen, openCreateModal, openEditModal, closeModal } =
    useProductModal();

  const {
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
    setSearchQuery,
    setSelectedCategory,
    setVehicleNumber,
    setChassisNumber,
    setManufacturer,
    setModel,
    setYear,
    setSubModel,
    setIsActiveFilter,
    clearFilters,
    setCurrentPage,
    toggleColumn,
  } = useProductFilters();

  // ✅ Fetch categories for dropdown
  const { data: categories = [] } = useGetCategoriesQuery();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  // ✅ Handle delete
  const handleDelete = async (productId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
      await deleteProduct(productId);
    }
  };

  // ✅ Check if column is visible
  const isColumnVisible = (columnName) => {
    return selectedColumns.includes(columnName);
  };

  // ✅ Count active filters
  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    vehicleNumber,
    chassisNumber,
    manufacturer,
    model,
    year,
    subModel,
    isActiveFilter !== null,
  ].filter(Boolean).length;

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg" color={textColor} mb={2}>
            ניהול מוצרים
          </Heading>
          <Text fontSize="sm" color={secondaryText}>
            סה"כ {total} מוצרים במערכת
          </Text>
        </Box>
        <HStack spacing={3}>
          <Button
            leftIcon={<Upload size={18} />}
            variant="outline"
            borderRadius="lg"
            size="md"
          >
            ייבוא
          </Button>
          <Button
            leftIcon={<Download size={18} />}
            variant="outline"
            borderRadius="lg"
            size="md"
          >
            ייצוא
          </Button>
          <Button
            leftIcon={<Plus size={18} />}
            bg={primary}
            color="white"
            borderRadius="lg"
            size="md"
            _hover={{ bg: "primary.200" }}
            onClick={openCreateModal}
          >
            הוסף מוצר
          </Button>
        </HStack>
      </Flex>

      {/* Filters Bar */}
      <Box
        bg={bgColor}
        p={4}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        mb={6}
      >
        <Flex gap={3} wrap="wrap" align="center">
          {/* Search */}
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <Search size={18} color={secondaryText} />
            </InputLeftElement>
            <Input
              placeholder="חיפוש מוצרים..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="lg"
            />
          </InputGroup>

          {/* Categories Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDown size={16} />}
              leftIcon={<List size={16} />}
              variant="outline"
              borderRadius="lg"
              size="md"
            >
              {selectedCategory
                ? categories.find((c) => c.value === selectedCategory)?.label ||
                  "קטגוריה"
                : "כל הקטגוריות"}
            </MenuButton>
            <MenuList maxH="300px" overflowY="auto">
              <ChakraMenuItem onClick={() => setSelectedCategory(null)}>
                כל הקטגוריות
              </ChakraMenuItem>
              <Divider />
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category._id}
                  onClick={() => setSelectedCategory(category.value)}
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
              borderRadius="lg"
              size="md"
            >
              מסננים {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </MenuButton>
            <MenuList p={4} minW="350px">
              <VStack spacing={4} align="stretch">
                <Heading size="sm" color={textColor}>
                  סינון מתקדם
                </Heading>
                <Divider />

                {/* Vehicle Number */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    מספר כלי
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר כלי"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Chassis Number */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    מספר שלדה
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר שלדה"
                    value={chassisNumber}
                    onChange={(e) => setChassisNumber(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Manufacturer */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    יצרן
                  </FormLabel>
                  <Input
                    placeholder="הזן יצרן"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Model */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    דגם
                  </FormLabel>
                  <Input
                    placeholder="הזן דגם"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Year */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    שנה
                  </FormLabel>
                  <Input
                    placeholder="הזן שנה"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Sub Model */}
                <FormControl>
                  <FormLabel fontSize="sm" color={textColor}>
                    תת דגם
                  </FormLabel>
                  <Input
                    placeholder="הזן תת דגם"
                    value={subModel}
                    onChange={(e) => setSubModel(e.target.value)}
                    size="sm"
                    borderRadius="lg"
                  />
                </FormControl>

                {/* Is Active */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="active-filter" mb="0" fontSize="sm">
                    מוצר פעיל
                  </FormLabel>
                  <Switch
                    id="active-filter"
                    colorScheme="orange"
                    isChecked={isActiveFilter === true}
                    onChange={(e) =>
                      setIsActiveFilter(e.target.checked ? true : null)
                    }
                  />
                </FormControl>

                <Divider />
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={clearFilters}
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
              borderRadius="lg"
              size="md"
            >
              עמודות
            </MenuButton>
            <MenuList p={4} minW="250px">
              <VStack spacing={3} align="stretch">
                <Heading size="sm" color={textColor}>
                  בחר עמודות להצגה
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
                      isChecked={isColumnVisible(column.value)}
                      onChange={() => toggleColumn(column.value)}
                    />
                  </FormControl>
                ))}
              </VStack>
            </MenuList>
          </Menu>

          {/* Refresh Button */}
          <IconButton
            icon={<RefreshCw size={18} />}
            variant="outline"
            borderRadius="lg"
            onClick={() => refetch()}
            isLoading={isFetching}
            aria-label="רענן"
          />

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              leftIcon={<X size={16} />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={clearFilters}
            >
              נקה סינון
            </Button>
          )}
        </Flex>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <Flex gap={2} mt={3} wrap="wrap">
            {searchQuery && (
              <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                חיפוש: {searchQuery}
              </Badge>
            )}
            {selectedCategory && (
              <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                קטגוריה:{" "}
                {categories.find((c) => c.value === selectedCategory)?.label}
              </Badge>
            )}
            {vehicleNumber && (
              <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                מספר כלי: {vehicleNumber}
              </Badge>
            )}
            {chassisNumber && (
              <Badge colorScheme="cyan" px={3} py={1} borderRadius="full">
                מספר שלדה: {chassisNumber}
              </Badge>
            )}
            {manufacturer && (
              <Badge colorScheme="orange" px={3} py={1} borderRadius="full">
                יצרן: {manufacturer}
              </Badge>
            )}
            {model && (
              <Badge colorScheme="pink" px={3} py={1} borderRadius="full">
                דגם: {model}
              </Badge>
            )}
            {year && (
              <Badge colorScheme="teal" px={3} py={1} borderRadius="full">
                שנה: {year}
              </Badge>
            )}
            {subModel && (
              <Badge colorScheme="yellow" px={3} py={1} borderRadius="full">
                תת דגם: {subModel}
              </Badge>
            )}
            {isActiveFilter !== null && (
              <Badge colorScheme="red" px={3} py={1} borderRadius="full">
                פעיל: {isActiveFilter ? "כן" : "לא"}
              </Badge>
            )}
          </Flex>
        )}
      </Box>

      {/* Error Alert */}
      {isError && (
        <Alert status="error" borderRadius="lg" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>שגיאה בטעינת מוצרים</AlertTitle>
            <AlertDescription>
              {error?.data?.message || error?.message || "אירעה שגיאה"}
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Table */}
      <Box
        bg={bgColor}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
      >
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg={stripedBg}>
              <Tr>
                {isColumnVisible("image") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      תמונה
                    </Text>
                  </Th>
                )}
                {isColumnVisible("name") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      שם מוצר
                    </Text>
                  </Th>
                )}
                {isColumnVisible("catalogNumber") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      מק"ט
                    </Text>
                  </Th>
                )}
                {isColumnVisible("category") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      קטגוריה
                    </Text>
                  </Th>
                )}
                {isColumnVisible("price") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      מחיר
                    </Text>
                  </Th>
                )}
                {isColumnVisible("stock") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      מלאי
                    </Text>
                  </Th>
                )}
                {isColumnVisible("supplier") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      ספק
                    </Text>
                  </Th>
                )}
                {isColumnVisible("isActive") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      סטטוס
                    </Text>
                  </Th>
                )}
                {isColumnVisible("actions") && (
                  <Th>
                    <Text fontSize="xs" fontWeight="700" color={textColor}>
                      פעולות
                    </Text>
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <ProductTableSkeleton rows={10} />
              ) : products.length === 0 ? (
                <Tr>
                  <Td colSpan={9} textAlign="center" py={10}>
                    <Text color={secondaryText}>לא נמצאו מוצרים</Text>
                  </Td>
                </Tr>
              ) : (
                products.map((product) => (
                  <Tr key={product._id} _hover={{ bg: hoverBg }}>
                    {isColumnVisible("image") && (
                      <Td>
                        <Image
                          src={
                            product.images?.[0] || "/placeholder-product.png"
                          }
                          alt={product.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                          fallbackSrc="https://via.placeholder.com/50"
                        />
                      </Td>
                    )}
                    {isColumnVisible("name") && (
                      <Td>
                        <Text fontWeight="600" color={textColor}>
                          {product.name}
                        </Text>
                      </Td>
                    )}
                    {isColumnVisible("catalogNumber") && (
                      <Td>
                        <Text color={secondaryText}>
                          {product.catalogNumber}
                        </Text>
                      </Td>
                    )}
                    {isColumnVisible("category") && (
                      <Td>
                        <Badge colorScheme="purple" borderRadius="full">
                          {product.category}
                        </Badge>
                      </Td>
                    )}
                    {isColumnVisible("price") && (
                      <Td>
                        <Text fontWeight="600" color={primary}>
                          ₪{product.price?.toLocaleString() || "0"}
                        </Text>
                      </Td>
                    )}
                    {isColumnVisible("stock") && (
                      <Td>
                        <Badge
                          colorScheme={
                            product.stock > 10
                              ? "green"
                              : product.stock > 0
                              ? "orange"
                              : "red"
                          }
                        >
                          {product.stock || 0}
                        </Badge>
                      </Td>
                    )}
                    {isColumnVisible("supplier") && (
                      <Td>
                        <Text color={secondaryText}>
                          {product.supplier || "-"}
                        </Text>
                      </Td>
                    )}
                    {isColumnVisible("isActive") && (
                      <Td>
                        <Badge
                          colorScheme={product.isActive ? "green" : "red"}
                          borderRadius="full"
                        >
                          {product.isActive ? "פעיל" : "לא פעיל"}
                        </Badge>
                      </Td>
                    )}
                    {isColumnVisible("actions") && (
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={18} />}
                            variant="ghost"
                            size="sm"
                            aria-label="פעולות"
                          />
                          <MenuList>
                            <ChakraMenuItem
                              icon={<Eye size={16} />}
                              onClick={() => openEditModal(product)}
                            >
                              צפייה
                            </ChakraMenuItem>
                            <ChakraMenuItem
                              icon={<Edit size={16} />}
                              onClick={() => openEditModal(product)}
                            >
                              עריכה
                            </ChakraMenuItem>
                            <Divider />
                            <ChakraMenuItem
                              icon={<Trash2 size={16} />}
                              color="red.500"
                              onClick={() => handleDelete(product._id)}
                            >
                              מחיקה
                            </ChakraMenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    )}
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Pagination */}
        {!isLoading && products.length > 0 && (
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Text fontSize="sm" color={secondaryText}>
              מציג {products.length} מתוך {total} מוצרים
            </Text>
            <HStack spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                הקודם
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === currentPage ? "solid" : "outline"}
                    bg={page === currentPage ? primary : "transparent"}
                    color={page === currentPage ? "white" : textColor}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              >
                הבא
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>

      {/* Product Modal */}
      <ProductModal isOpen={isOpen} onClose={closeModal} />
    </Box>
  );
};

export default ProductIndex;
