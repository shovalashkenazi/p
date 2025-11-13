import { useDispatch } from "react-redux";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
} from "lucide-react";
import ProductCategoryModal from "./ProductCategoryModal";
import { CategoryTableSkeleton } from "./components/CategoryTableSkeleton";
import { useCategories, useCategoryActions, useCategoryModal } from "./hooks";
import { setSearchQuery } from "./services/categoriesSlice";

const ProductCategoriesIndex = () => {
  const dispatch = useDispatch();

  // ✅ Custom Hooks
  const {
    categories,
    allCategories,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    filteredTotal,
  } = useCategories();

  console.log("Rendered ProductCategoriesIndex", categories);

  const { deleteCategory } = useCategoryActions();

  const { isOpen, openCreateModal, openEditModal, closeModal } =
    useCategoryModal();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  // ✅ Handle search input
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            קטגוריות פריטים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול קטגוריות מוצרים והגדרות
          </Text>
        </Box>
      </Flex>

      {/* Action Bar - Row 1 */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
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
            onClick={openCreateModal}
          >
            יצירת קטגוריה חדשה
          </Button>

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
            onClick={refetch}
            isLoading={isFetching}
          >
            רענן נתונים
          </Button>
        </HStack>

        {/* Search */}
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none" h="full">
            <Search size={18} color={secondaryText} />
          </InputLeftElement>
          <Input
            placeholder="חיפוש מהיר..."
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            h="45px"
            fontSize="sm"
            onChange={handleSearchChange}
            _focus={{
              borderColor: primary,
              boxShadow: `0 0 0 1px var(--chakra-colors-primary-100)`,
            }}
          />
        </InputGroup>
      </Flex>

      <Divider my={6} borderColor={borderColor} />

      {/* Action Bar - Row 2 */}
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={3}>
          <Button
            leftIcon={<Download size={18} />}
            variant="ghost"
            size="sm"
            color={secondaryText}
            _hover={{ bg: hoverBg, color: primary }}
          >
            ייצוא
          </Button>
          <Button
            leftIcon={<Upload size={18} />}
            variant="ghost"
            size="sm"
            color={secondaryText}
            _hover={{ bg: hoverBg, color: primary }}
          >
            ייבוא
          </Button>
        </HStack>

        <Text fontSize="sm" color={secondaryText}>
          {filteredTotal} קטגוריות במערכת
        </Text>
      </Flex>

      {/* ✅ Error Alert */}
      {isError && (
        <Alert status="error" borderRadius="lg" mb={6}>
          <AlertIcon />
          <AlertTitle>שגיאה!</AlertTitle>
          <AlertDescription>
            {error?.data?.message ||
              error?.message ||
              "אירעה שגיאה בטעינת הנתונים"}
          </AlertDescription>
        </Alert>
      )}

      {/* Table Container */}
      <Box
        bg={bgColor}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="md"
        overflow="hidden"
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#CBD5E0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#A0AEC0",
          },
        }}
      >
        <Table variant="simple">
          <Thead bg={stripedBg}>
            <Tr>
              <Th
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                שם קטגוריה
              </Th>
              <Th
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                מזהה
              </Th>
              <Th
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                תמונה
              </Th>
              <Th
                textAlign="center"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                פעולות
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* ✅ Loading Skeleton */}
            {isLoading ? (
              <CategoryTableSkeleton rows={5} />
            ) : categories.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center" py={8}>
                  <Text color={secondaryText}>אין קטגוריות להצגה</Text>
                </Td>
              </Tr>
            ) : (
              categories.map((category, index) => (
                <Tr
                  key={category._id}
                  bg={index % 2 === 0 ? bgColor : stripedBg}
                  _hover={{ bg: hoverBg }}
                  transition="background 0.2s"
                >
                  <Td borderColor={borderColor} py={3}>
                    <Text fontSize="sm" fontWeight="600" color={textColor}>
                      {category.label}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} py={3}>
                    <Text fontSize="sm" color={secondaryText}>
                      {category.value}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} py={3}>
                    {category.image ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.label}
                        boxSize="40px"
                        borderRadius="md"
                        objectFit="cover"
                      />
                    ) : (
                      <Box
                        boxSize="40px"
                        borderRadius="md"
                        bg={stripedBg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xs" color={secondaryText}>
                          N/A
                        </Text>
                      </Box>
                    )}
                  </Td>
                  <Td borderColor={borderColor} py={3} textAlign="center">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={18} />}
                        variant="ghost"
                        size="sm"
                        borderRadius="full"
                        _hover={{ bg: hoverBg }}
                      />
                      <MenuList
                        dir="rtl"
                        borderColor={borderColor}
                        boxShadow="lg"
                      >
                        <ChakraMenuItem
                          icon={<Eye size={16} />}
                          _hover={{ bg: hoverBg }}
                          fontSize="sm"
                        >
                          צפייה בקטגוריה
                        </ChakraMenuItem>
                        <ChakraMenuItem
                          icon={<Edit size={16} />}
                          _hover={{ bg: hoverBg }}
                          fontSize="sm"
                          onClick={() => openEditModal(category)}
                        >
                          עריכת קטגוריה
                        </ChakraMenuItem>
                        <ChakraMenuItem
                          icon={<Trash2 size={16} />}
                          _hover={{ bg: "red.50" }}
                          color="red.500"
                          fontSize="sm"
                          onClick={() => deleteCategory(category._id)}
                        >
                          מחיקת קטגוריה
                        </ChakraMenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Footer Info */}
      <Flex justify="space-between" align="center" mt={6} px={2}>
        <Text fontSize="sm" color={secondaryText}>
          מציג 1-{filteredTotal} מתוך {allCategories.length} קטגוריות
        </Text>
        <HStack spacing={2}>
          <Button
            size="sm"
            variant="outline"
            borderRadius="lg"
            borderColor={borderColor}
            isDisabled
          >
            הקודם
          </Button>
          <Button size="sm" bg={primary} color="white" borderRadius="lg">
            1
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="lg"
            borderColor={borderColor}
            isDisabled
          >
            הבא
          </Button>
        </HStack>
      </Flex>

      {/* Product Category Modal */}
      <ProductCategoryModal isOpen={isOpen} onClose={closeModal} />
    </Box>
  );
};

export default ProductCategoriesIndex;
