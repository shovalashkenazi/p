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
  // ✅ Custom comparison function - only re-render if these specific props changed
  // Check if handlers changed (should be stable with useCallback)
  if (prevProps.onEdit !== nextProps.onEdit || prevProps.onDelete !== nextProps.onDelete) {
    return false;
  }

  // Check if columns array changed (using length + every for performance)
  if (
    prevProps.selectedColumns.length !== nextProps.selectedColumns.length ||
    !prevProps.selectedColumns.every((col, i) => col === nextProps.selectedColumns[i])
  ) {
    return false;
  }

  // Check if critical product fields changed
  const prevProduct = prevProps.product;
  const nextProduct = nextProps.product;

  return (
    prevProduct._id === nextProduct._id &&
    prevProduct.name === nextProduct.name &&
    prevProduct.catalogNumber === nextProduct.catalogNumber &&
    prevProduct.category === nextProduct.category &&
    prevProduct.price === nextProduct.price &&
    prevProduct.stock === nextProduct.stock &&
    prevProduct.supplier === nextProduct.supplier &&
    prevProduct.isActive === nextProduct.isActive &&
    prevProduct.images?.[0] === nextProduct.images?.[0]
  );
});

ProductTableRow.displayName = "ProductTableRow";

export default ProductTableRow;
