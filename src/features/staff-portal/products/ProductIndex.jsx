// React
import {
  useCallback,
  useMemo,
  lazy,
  Suspense,
  useDeferredValue,
  startTransition,
} from "react";

// Chakra UI
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Center,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

// Components
import ProductFiltersBar from "./components/ProductFiltersBar";
import ProductTable from "./components/ProductTable";
import ActiveFilters from "./components/ActiveFilters";

// Hooks
import {
  useProducts,
  useProductActions,
  useProductModal,
  useProductFilters,
} from "./hooks";

// External Services
import { useGetCategoriesQuery } from "../categories/services/categoriesApiSlice";
import { DivideCircle, Download, Upload } from "lucide-react";

// ✅ Lazy load modal for better performance
const ProductModalV2 = lazy(() => import("./ProductModalV2"));

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
    page,
  } = useProducts();

  // ✅ Defer rendering of products list to prevent blocking
  const deferredProducts = useDeferredValue(products);

  const { deleteProduct } = useProductActions();

  const {
    isOpen,
    modalInitialCategory,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useProductModal();

  const {
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
    setSearchQuery,
    setCategory,
    setVinNumber,
    setTractorNumber,
    setMachine,
    setModel,
    setVariant,
    setYear,
    setVisibility,
    clearFilters,
    setPage,
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
    // ✅ Complete reset: clear all filters and reset pagination
    startTransition(() => {
      clearFilters(); // This already resets page to 1 and clears all filters
      refetch(); // Fetch data with clean state
    });
  }, [clearFilters, refetch]);

  // ✅ Memoized pagination click handler
  const handlePageClick = useCallback(
    (pageNum) => {
      startTransition(() => {
        setPage(pageNum);
      });
    },
    [setPage]
  );

  // ✅ Memoized pagination buttons
  const paginationButtons = useMemo(() => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  }, [totalPages, page]);

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

      {/* ✅ Optimized Filters Bar */}
      <ProductFiltersBar
        searchQuery={searchQuery}
        category={category}
        vinNumber={vinNumber}
        tractorNumber={tractorNumber}
        machine={machine}
        model={model}
        variant={variant}
        year={year}
        visibility={visibility}
        selectedColumns={selectedColumns}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        onVinNumberChange={setVinNumber}
        onTractorNumberChange={setTractorNumber}
        onMachineChange={setMachine}
        onModelChange={setModel}
        onVariantChange={setVariant}
        onYearChange={setYear}
        onVisibilityChange={setVisibility}
        onClearFilters={clearFilters}
        onToggleColumn={toggleColumn}
        onRefresh={handleRefresh}
        onOpenCreateModal={openCreateModal}
        isFetching={isFetching}
      />

      <Divider my={6} borderColor={borderColor} />

      {/* Action Bar - Row 2 */}
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={3}>
          <Button
            leftIcon={<Download size={18} />}
            variant="ghost"
            size="sm"
            // color={secondaryText}
            // _hover={{ bg: hoverBg,   color: primary }}
          >
            ייצוא
          </Button>
          <Button
            leftIcon={<Upload size={18} />}
            variant="ghost"
            size="sm"
            // color={secondaryText}
            // _hover={{ bg: hoverBg, color: primary }}
          >
            ייבוא
          </Button>
        </HStack>
      </Flex>

      {/* ✅ Active Filters Display */}
      <ActiveFilters
        searchQuery={searchQuery}
        category={category}
        vinNumber={vinNumber}
        tractorNumber={tractorNumber}
        machine={machine}
        model={model}
        variant={variant}
        year={year}
        visibility={visibility}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        onVinNumberChange={setVinNumber}
        onTractorNumberChange={setTractorNumber}
        onMachineChange={setMachine}
        onModelChange={setModel}
        onVariantChange={setVariant}
        onYearChange={setYear}
        onVisibilityChange={setVisibility}
        onClearFilters={clearFilters}
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
            willChange: isFetching ? "contents" : "auto",
            contain: "layout style paint",
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
                onClick={() => handlePageClick(page - 1)}
                isDisabled={page === 1}
                borderRadius="lg"
              >
                הקודם
              </Button>

              {paginationButtons &&
                paginationButtons.map((pageNum) => (
                  <Button
                    key={pageNum}
                    size="sm"
                    variant={pageNum === page ? "solid" : "outline"}
                    bg={pageNum === page ? primary : "transparent"}
                    color={pageNum === page ? "white" : textColor}
                    onClick={() => handlePageClick(pageNum)}
                    borderRadius="lg"
                    minW="40px"
                  >
                    {pageNum}
                  </Button>
                ))}

              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePageClick(page + 1)}
                isDisabled={page === totalPages}
                borderRadius="lg"
              >
                הבא
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>

      {/* Product Modal - wrapped in Suspense for lazy loading */}
      <Suspense
        fallback={
          <Center>
            <Spinner size="xl" color={primary} />
          </Center>
        }
      >
        <ProductModalV2
          isOpen={isOpen}
          onClose={closeModal}
          initialCategory={modalInitialCategory}
        />
      </Suspense>
    </Box>
  );
};

export default ProductIndex;
