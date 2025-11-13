import React, { useCallback, useMemo, lazy, Suspense, useDeferredValue, startTransition } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Flex,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Button,
  Td,
  Spinner,
  Center,
} from "@chakra-ui/react";

// ✅ Lazy load modal for better initial load performance
const ProductModal = lazy(() => import("./ProductModal"));
import ProductFiltersBar from "./components/ProductFiltersBar";
import ProductTable from "./components/ProductTable";
import {
  useProducts,
  useProductActions,
  useProductModal,
  useProductFilters,
} from "./hooks";
import { useGetCategoriesQuery } from "../categories/services/categoriesApiSlice";

/**
 * ✅ OPTIMIZED ProductIndex Component
 * - React.memo on child components
 * - useCallback for handlers
 * - useMemo for computed values
 * - Debounced search/filters
 * - selectFromResult in RTK Query
 */
const ProductIndex = () => {
  // ✅ Custom Hooks (with built-in optimizations)
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

  // ✅ Defer rendering of products list to prevent blocking
  // This allows urgent UI updates (like pagination clicks) to render first
  const deferredProducts = useDeferredValue(products);

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

  // ✅ Fetch categories (memoized by RTK Query)
  const { data: categories = [] } = useGetCategoriesQuery();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  // ✅ Memoized handlers to prevent child re-renders
  const handleDelete = useCallback(
    async (productId) => {
      if (window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
        await deleteProduct(productId);
      }
    },
    [deleteProduct]
  );

  const handleEdit = useCallback(
    (product) => {
      openEditModal(product);
    },
    [openEditModal]
  );

  const handleRefresh = useCallback(() => {
    // Mark refetch as low-priority to not block UI
    startTransition(() => {
      refetch();
    });
  }, [refetch]);

  // ✅ Memoized pagination click handler with startTransition
  const handlePageClick = useCallback((page) => {
    // Mark pagination as low-priority update
    startTransition(() => {
      setCurrentPage(page);
    });
  }, [setCurrentPage]);

  // ✅ Memoized pagination buttons (only recalculate when totalPages/currentPage changes)
  const paginationButtons = useMemo(() => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  }, [totalPages, currentPage]);

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            ניהול מוצרים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            סה"כ {total.toLocaleString()} מוצרים במערכת
          </Text>
        </Box>
      </Flex>

      {/* ✅ Optimized Filters Bar (memoized component) */}
      <ProductFiltersBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        vehicleNumber={vehicleNumber}
        chassisNumber={chassisNumber}
        manufacturer={manufacturer}
        model={model}
        year={year}
        subModel={subModel}
        isActiveFilter={isActiveFilter}
        selectedColumns={selectedColumns}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onVehicleNumberChange={setVehicleNumber}
        onChassisNumberChange={setChassisNumber}
        onManufacturerChange={setManufacturer}
        onModelChange={setModel}
        onYearChange={setYear}
        onSubModelChange={setSubModel}
        onIsActiveFilterChange={setIsActiveFilter}
        onClearFilters={clearFilters}
        onToggleColumn={toggleColumn}
        onRefresh={handleRefresh}
        onOpenCreateModal={openCreateModal}
        isFetching={isFetching}
      />

      {/* Error Alert */}
      {isError && (
        <Alert status="error" borderRadius="xl" mb={6}>
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
        boxShadow="sm"
      >
        <Box
          overflowX="auto"
          sx={{
            // ✅ CSS optimization hints for smooth scrolling and rendering
            willChange: isFetching ? 'contents' : 'auto',
            contain: 'layout style paint',
          }}
        >
          {/* ✅ Memoized table component with deferred products */}
          <ProductTable
            products={deferredProducts}
            selectedColumns={selectedColumns}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            textColor={textColor}
            stripedBg={stripedBg}
            secondaryText={secondaryText}
          />
        </Box>

        {/* Pagination */}
        {!isLoading && products.length > 0 && totalPages > 0 && (
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Text fontSize="sm" color={secondaryText}>
              מציג {products.length} מתוך {total.toLocaleString()} מוצרים
            </Text>
            <HStack spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePageClick(currentPage - 1)}
                isDisabled={currentPage === 1}
                borderRadius="lg"
              >
                הקודם
              </Button>

              {paginationButtons &&
                paginationButtons.map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === currentPage ? "solid" : "outline"}
                    bg={page === currentPage ? primary : "transparent"}
                    color={page === currentPage ? "white" : textColor}
                    onClick={() => handlePageClick(page)}
                    borderRadius="lg"
                    minW="40px"
                  >
                    {page}
                  </Button>
                ))}

              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePageClick(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                borderRadius="lg"
              >
                הבא
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>

      {/* Product Modal - wrapped in Suspense for lazy loading */}
      <Suspense fallback={
        <Center>
          <Spinner size="xl" color={primary} />
        </Center>
      }>
        <ProductModal isOpen={isOpen} onClose={closeModal} />
      </Suspense>
    </Box>
  );
};

export default ProductIndex;
