// src/features/staff-portal/products/components/ProductTable.jsx
import React, { memo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ProductTableRow from "./ProductTableRow";
import { ProductTableSkeleton } from "./ProductTableSkeleton";

/**
 * ✅ Memoized Product Table Component
 * Prevents re-render when only parent state changes
 */
const ProductTable = memo(
  ({
    products,
    selectedColumns,
    isLoading,
    onEdit,
    onDelete,
    textColor,
    stripedBg,
    secondaryText,
  }) => {
    // Check if column is visible
    const isColumnVisible = (columnName) =>
      selectedColumns.includes(columnName);

    return (
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
            {isColumnVisible("visibility") && (
              <Th>
                <Text fontSize="xs" fontWeight="700" color={textColor}>
                  נראות
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
                <Text color={secondaryText} fontSize="lg">
                  לא נמצאו מוצרים
                </Text>
              </Td>
            </Tr>
          ) : (
            products.map((product) => (
              <ProductTableRow
                key={product._id}
                product={product}
                selectedColumns={selectedColumns}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </Tbody>
      </Table>
    );
  },
  (prevProps, nextProps) => {
    // ✅ Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.products === nextProps.products &&
      prevProps.selectedColumns === nextProps.selectedColumns &&
      prevProps.onEdit === nextProps.onEdit &&
      prevProps.onDelete === nextProps.onDelete &&
      prevProps.textColor === nextProps.textColor &&
      prevProps.stripedBg === nextProps.stripedBg &&
      prevProps.secondaryText === nextProps.secondaryText
    );
  }
);

ProductTable.displayName = "ProductTable";

export default ProductTable;
