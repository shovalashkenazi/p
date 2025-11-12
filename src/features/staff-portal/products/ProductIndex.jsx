import React, { useState } from "react";
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
  MenuItem,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { Search, MoreVertical, Edit, Eye, Trash2, Plus, Filter } from "lucide-react";

const ProductIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  // נתוני דוגמה
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
    },
  ];

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
        <Button
          leftIcon={<Plus size={20} />}
          bg={primary}
          color="white"
          borderRadius="full"
          px={6}
          py={6}
          fontSize="md"
          fontWeight="600"
          _hover={{ bg: "primary.200", transform: "translateY(-2px)" }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s"
          boxShadow="md"
        >
          הוסף פריט חדש
        </Button>
      </Flex>

      {/* Filters & Search */}
      <Flex gap={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none" h="full">
            <Search size={18} color={secondaryText} />
          </InputLeftElement>
          <Input
            placeholder="חיפוש פריטים..."
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            h="45px"
            fontSize="sm"
            _focus={{
              borderColor: primary,
              boxShadow: `0 0 0 1px var(--chakra-colors-primary-100)`,
            }}
          />
        </InputGroup>
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
          סינון
        </Button>
      </Flex>

      {/* Table Container */}
      <Box
        bg={bgColor}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="md"
        overflow="hidden"
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
              >
                מק"ט
              </Th>
              <Th
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
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
              >
                ספק
              </Th>
              <Th
                textAlign="center"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
              >
                פעולות
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr
                key={product.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={4}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {product.sku}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={4}>
                  <Text fontSize="sm" color={textColor} fontWeight="500">
                    {product.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={4}>
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
                <Td borderColor={borderColor} py={4}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    ₪{product.price.toLocaleString()}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={4}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {product.stock} יח'
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={4}>
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
                <Td borderColor={borderColor} py={4}>
                  <Text fontSize="sm" color={secondaryText}>
                    {product.supplier}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={4} textAlign="center">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MoreVertical size={18} />}
                      variant="ghost"
                      size="sm"
                      borderRadius="full"
                      _hover={{ bg: hoverBg }}
                    />
                    <MenuList dir="rtl" borderColor={borderColor} boxShadow="lg">
                      <MenuItem
                        icon={<Eye size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפייה בפריט
                      </MenuItem>
                      <MenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        עריכת פריט
                      </MenuItem>
                      <MenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת פריט
                      </MenuItem>
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
          מציג 1-8 מתוך 8 פריטים
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
    </Box>
  );
};

export default ProductIndex;
