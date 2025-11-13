import React, { memo, useCallback } from "react";
import {
  Tr,
  Td,
  Text,
  Image,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  IconButton,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

/**
 * ✅ Memoized Product Table Row
 * Only re-renders when product data or selected columns change
 */
const ProductTableRow = memo(({
  product,
  selectedColumns,
  onEdit,
  onDelete,
}) => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  // Memoized handlers
  const handleEdit = useCallback(() => {
    onEdit(product);
  }, [onEdit, product]);

  const handleDelete = useCallback(() => {
    onDelete(product._id);
  }, [onDelete, product._id]);

  // Check if column is visible
  const isVisible = useCallback(
    (columnName) => selectedColumns.includes(columnName),
    [selectedColumns]
  );

  return (
    <Tr _hover={{ bg: hoverBg }} transition="background 0.1s">
      {isVisible("image") && (
        <Td>
          <Image
            src={product.images?.[0] || "/placeholder-product.png"}
            alt={product.name}
            boxSize="50px"
            objectFit="cover"
            borderRadius="md"
            fallbackSrc="https://via.placeholder.com/50"
            loading="lazy"
          />
        </Td>
      )}
      {isVisible("name") && (
        <Td>
          <Text fontWeight="600" color={textColor} isTruncated maxW="200px">
            {product.name}
          </Text>
        </Td>
      )}
      {isVisible("catalogNumber") && (
        <Td>
          <Text color={secondaryText}>{product.catalogNumber}</Text>
        </Td>
      )}
      {isVisible("category") && (
        <Td>
          <Badge colorScheme="purple" borderRadius="full">
            {product.category}
          </Badge>
        </Td>
      )}
      {isVisible("price") && (
        <Td>
          <Text fontWeight="600" color={primary}>
            ₪{product.price?.toLocaleString() || "0"}
          </Text>
        </Td>
      )}
      {isVisible("stock") && (
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
      {isVisible("supplier") && (
        <Td>
          <Text color={secondaryText}>{product.supplier || "-"}</Text>
        </Td>
      )}
      {isVisible("isActive") && (
        <Td>
          <Badge
            colorScheme={product.isActive ? "green" : "red"}
            borderRadius="full"
          >
            {product.isActive ? "פעיל" : "לא פעיל"}
          </Badge>
        </Td>
      )}
      {isVisible("actions") && (
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
              <ChakraMenuItem icon={<Eye size={16} />} onClick={handleEdit}>
                צפייה
              </ChakraMenuItem>
              <ChakraMenuItem icon={<Edit size={16} />} onClick={handleEdit}>
                עריכה
              </ChakraMenuItem>
              <Divider />
              <ChakraMenuItem
                icon={<Trash2 size={16} />}
                color="red.500"
                onClick={handleDelete}
              >
                מחיקה
              </ChakraMenuItem>
            </MenuList>
          </Menu>
        </Td>
      )}
    </Tr>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.product._id === nextProps.product._id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.stock === nextProps.product.stock &&
    prevProps.product.isActive === nextProps.product.isActive &&
    prevProps.selectedColumns.join(',') === nextProps.selectedColumns.join(',')
  );
});

ProductTableRow.displayName = "ProductTableRow";

export default ProductTableRow;
