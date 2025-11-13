import React, { useState, useMemo } from "react";
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
  VStack,
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
  useDisclosure,
  Tooltip,
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
  Printer,
  Tag,
  ChevronDown,
} from "lucide-react";
import ProductModal from "./ProductModal";

const ProductIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // נתוני דוגמה - 12 שורות עם שדות חדשים
  const products = [
    {
      id: 1,
      name: "זכוכית קדמית טרקטור ג'ון דיר 6430",
      sku: "JD-6430-FG",
      category: "זכוכיות טרקטורים",
      price: 2850,
      stock: 12,
      status: "זמין",
      supplier: "דלתא גלאס",
      image: null, // תמונה - יהיה placeholder
      isActive: true, // פעיל
      isOriginal: true, // מקורי
      notes: "זכוכית מקורית עם ציפוי UV", // הערות
    },
    {
      id: 2,
      name: "זכוכית צד ימין קטרפילר 320D",
      sku: "CAT-320D-SR",
      category: "זכוכיות מחפרים",
      price: 1420,
      stock: 8,
      status: "זמין",
      supplier: "פילקינגטון",
      image: null,
      isActive: true,
      isOriginal: false, // חלופי
      notes: "תואם למודלים 2015-2020",
    },
    {
      id: 3,
      name: "זכוכית אחורית יונדאי R160LC-9",
      sku: "HYU-R160-RG",
      category: "זכוכיות מחפרים",
      price: 1850,
      stock: 3,
      status: "מלאי נמוך",
      supplier: "סנט גובן",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "דורש הזמנה מראש",
    },
    {
      id: 4,
      name: "זכוכית גג מסי פרגוסון 6713",
      sku: "MF-6713-RG",
      category: "זכוכיות טרקטורים",
      price: 3200,
      stock: 0,
      status: "אזל מהמלאי",
      supplier: "אגסי פלסט",
      image: null,
      isActive: false, // לא פעיל
      isOriginal: true,
      notes: "מוצר מוקפא - ממתין לאישור",
    },
    {
      id: 5,
      name: "זכוכית דלת תא הנהג וולבו EC220E",
      sku: "VOL-EC220-DG",
      category: "זכוכיות מחפרים",
      price: 2150,
      stock: 15,
      status: "זמין",
      supplier: "דלתא גלאס",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "כולל מנגנון חלון",
    },
    {
      id: 6,
      name: "זכוכית צד שמאל קייס IH 340",
      sku: "CSE-340-SL",
      category: "זכוכיות טרקטורים",
      price: 1680,
      stock: 6,
      status: "זמין",
      supplier: "פילקינגטון",
      image: null,
      isActive: true,
      isOriginal: false,
      notes: "איכות פרימיום",
    },
    {
      id: 7,
      name: "זכוכית קדמית קובוטה M7060",
      sku: "KUB-M7060-FG",
      category: "זכוכיות טרקטורים",
      price: 2450,
      stock: 2,
      status: "מלאי נמוך",
      supplier: "סנט גובן",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "מתאים גם ל-M7040",
    },
    {
      id: 8,
      name: "זכוכית פנורמית קומטסו PC290LC",
      sku: "KOM-PC290-PG",
      category: "זכוכיות מחפרים",
      price: 3850,
      stock: 9,
      status: "זמין",
      supplier: "אגסי פלסט",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "זכוכית פנורמית מחוסמת",
    },
    {
      id: 9,
      name: "זכוכית אחורית ג'ון דיר 8320R",
      sku: "JD-8320-RG",
      category: "זכוכיות טרקטורים",
      price: 2980,
      stock: 4,
      status: "זמין",
      supplier: "דלתא גלאס",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "דגם חדש - 2023",
    },
    {
      id: 10,
      name: "זכוכית צד קטרפילר 336F",
      sku: "CAT-336F-SD",
      category: "זכוכיות מחפרים",
      price: 1590,
      stock: 11,
      status: "זמין",
      supplier: "פילקינגטון",
      image: null,
      isActive: true,
      isOriginal: false,
      notes: "תחליף איכותי",
    },
    {
      id: 11,
      name: "זכוכית תא נהג ניו הולנד T7.315",
      sku: "NH-T7315-CB",
      category: "זכוכיות טרקטורים",
      price: 2750,
      stock: 1,
      status: "מלאי נמוך",
      supplier: "סנט גובן",
      image: null,
      isActive: true,
      isOriginal: true,
      notes: "נדיר - אחרון במלאי",
    },
    {
      id: 12,
      name: "זכוכית קדמית קייס CX210D",
      sku: "CSE-CX210-FG",
      category: "זכוכיות מחפרים",
      price: 2200,
      stock: 7,
      status: "זמין",
      supplier: "אגסי פלסט",
      image: null,
      isActive: true,
      isOriginal: false,
      notes: "כולל אטמים",
    },
  ];

  // כל הקטגוריות הזמינות במערכת
  const categories = [
    "חלונות",
    "מראות",
    "פנסים",
    "זכוכיות",
    "זכוכיות טרקטורים",
    "זכוכיות מחפרים",
    "דלתות",
    "משטחים",
    "אביזרים",
    "חלקי חילוף",
  ];

  // סינון פריטים לפי קטגוריה נבחרת
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory, products]);

  const getStatusColor = (status) => {
    switch (status) {
      case "זמין":
        return "green";
      case "מלאי נמוך":
        return "orange";
      case "אזל מהמלאי":
        return "red";
      default:
        return "gray";
    }
  };

  // get stock badge color based on availability
  const getStockColor = (stock) => {
    if (stock === 0) return "red";
    if (stock <= 5) return "orange";
    return "green";
  };

  // get stock status text
  const getStockStatus = (stock) => {
    if (stock === 0) return "לא זמין";
    if (stock <= 5) return "מלאי נמוך";
    return "זמין";
  };

  const handleAddProduct = (category = null) => {
    setSelectedProduct(null);
    if (category) {
      setSelectedCategory(category);
    }
    onOpen();
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  // added refresh function
  const handleRefresh = () => {
    console.log("רענון נתונים...");
    // כאן ניתן להוסיף לוגיקה לטעינה מחדש של הנתונים
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            ניהול פריטים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            נהל את מלאי הזכוכיות והמוצרים שלך
          </Text>
        </Box>
      </Flex>

      {/* Action Bar - Row 1 */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Plus size={20} />}
              rightIcon={<ChevronDown size={16} />}
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
            >
              הוסף מוצר
            </MenuButton>
            <MenuList
              dir="rtl"
              borderColor={borderColor}
              boxShadow="lg"
              maxH="300px"
              overflowY="auto"
            >
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  onClick={() => handleAddProduct(category)}
                >
                  {category}
                </ChakraMenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            leftIcon={<Filter size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            _hover={{ bg: hoverBg }}
          >
            מסננים
          </Button>
          <Button
            leftIcon={<Columns size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            _hover={{ bg: hoverBg }}
          >
            עמודות
          </Button>
          {/* category filter button */}
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Tag size={18} />}
              rightIcon={<ChevronDown size={16} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={selectedCategory ? primary : textColor}
              borderColor={selectedCategory ? primary : borderColor}
              borderWidth={selectedCategory ? "2px" : "1px"}
              bg={selectedCategory ? `${primary}15` : "transparent"}
              _hover={{ bg: hoverBg }}
            >
              {selectedCategory || "קטגוריה"}
            </MenuButton>
            <MenuList
              dir="rtl"
              borderColor={borderColor}
              boxShadow="lg"
              maxH="300px"
              overflowY="auto"
            >
              <ChakraMenuItem
                _hover={{ bg: hoverBg }}
                fontSize="sm"
                fontWeight={!selectedCategory ? "700" : "400"}
                color={!selectedCategory ? primary : textColor}
                onClick={() => setSelectedCategory(null)}
              >
                הצג הכל
              </ChakraMenuItem>
              <Divider my={2} borderColor={borderColor} />
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  fontWeight={selectedCategory === category ? "700" : "400"}
                  color={selectedCategory === category ? primary : textColor}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </ChakraMenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* added refresh button */}
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
            onClick={handleRefresh}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {selectedCategory
            ? `${filteredProducts.length} פריטים מתוך ${products.length} (${selectedCategory})`
            : `${products.length} פריטים במערכת`}
        </Text>
      </Flex>

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
                מק״ט
              </Th>
              {/* new column: image */}
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
                תמונה
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
                שם המוצר
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
                קטגוריה
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
                מחיר
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
                מלאי
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
                סטטוס
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
                ספק
              </Th>
              {/* new column: active status */}
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
                פעיל
              </Th>
              {/* new column: original product */}
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
                מקורי
              </Th>
              {/* new column: notes */}
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
                הערות פריט
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
            {filteredProducts.map((product, index) => (
              <Tr
                key={product.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                {/* compact rows with py={3} */}
                <Td borderColor={borderColor} py={3}>
                  <Tooltip label={product.sku} hasArrow>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                      isTruncated
                      maxW="120px"
                    >
                      {product.sku}
                    </Text>
                  </Tooltip>
                </Td>
                {/* new column: image thumbnail */}
                <Td borderColor={borderColor} py={3} textAlign="center">
                  <Box
                    w="45px"
                    h="45px"
                    bg={stripedBg}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                  >
                    <Text fontSize="xs" color={secondaryText}>
                      IMG
                    </Text>
                  </Box>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="250px">
                  <Tooltip label={product.name} hasArrow>
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="500"
                      isTruncated
                    >
                      {product.name}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme="blue"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {product.category}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    ₪{product.price.toLocaleString()}
                  </Text>
                </Td>
                {/* updated: stock column now shows badge with color */}
                <Td borderColor={borderColor} py={3} textAlign="center">
                  <Tooltip label={`${product.stock} יחידות במלאי`} hasArrow>
                    <Badge
                      colorScheme={getStockColor(product.stock)}
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontSize="xs"
                      fontWeight="600"
                    >
                      {product.stock} יח'
                    </Badge>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme={getStatusColor(product.status)}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {product.status}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="150px">
                  <Tooltip label={product.supplier} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {product.supplier}
                    </Text>
                  </Tooltip>
                </Td>
                {/* new column: active status badge */}
                <Td borderColor={borderColor} py={3} textAlign="center">
                  <Badge
                    colorScheme={product.isActive ? "green" : "red"}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {product.isActive ? "פעיל" : "לא פעיל"}
                  </Badge>
                </Td>
                {/* new column: original product badge */}
                <Td borderColor={borderColor} py={3} textAlign="center">
                  <Badge
                    colorScheme={product.isOriginal ? "purple" : "gray"}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {product.isOriginal ? "מקורי" : "חלופי"}
                  </Badge>
                </Td>
                {/* new column: notes with tooltip */}
                <Td borderColor={borderColor} py={3} maxW="180px">
                  <Tooltip label={product.notes} hasArrow>
                    <Text fontSize="xs" color={secondaryText} isTruncated>
                      {product.notes}
                    </Text>
                  </Tooltip>
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
                        צפייה בפריט
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        עריכת פריט
                      </ChakraMenuItem>
                      {/* new option: print barcode */}
                      <ChakraMenuItem
                        icon={<Printer size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() =>
                          console.log(`הדפסת ברקוד למוצר ${product.sku}`)
                        }
                      >
                        הדפסת ברקוד
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת פריט
                      </ChakraMenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Footer Info */}
      <Flex justify="space-between" align="center" mt={6} px={2}>
        <Text fontSize="sm" color={secondaryText}>
          מציג 1-{filteredProducts.length} מתוך {filteredProducts.length} פריטים
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

      {/* Product Modal */}
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={selectedProduct}
      />
    </Box>
  );
};

export default ProductIndex;
