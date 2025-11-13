// src/features/staff-portal/products/components/ProductTableSkeleton.jsx
import {
  Tr,
  Td,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * ✅ Skeleton loader for product table rows
 */
export const ProductTableSkeleton = ({ rows = 5 }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      {Array(rows)
        .fill("")
        .map((_, index) => (
          <Tr key={index}>
            {/* Image */}
            <Td borderColor={borderColor} py={3}>
              <Skeleton height="50px" width="50px" borderRadius="md" />
            </Td>

            {/* Product Name */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={2} spacing={2} width="150px" />
            </Td>

            {/* Catalog Number */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="100px" />
            </Td>

            {/* Category */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="80px" />
            </Td>

            {/* Price */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="60px" />
            </Td>

            {/* Stock */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="40px" />
            </Td>

            {/* Actions */}
            <Td borderColor={borderColor} py={3} textAlign="center">
              <SkeletonCircle size="30px" />
            </Td>
          </Tr>
        ))}
    </>
  );
};
