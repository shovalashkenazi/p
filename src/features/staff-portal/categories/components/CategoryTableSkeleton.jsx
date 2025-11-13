// src/features/staff-portal/categories/components/CategoryTableSkeleton.jsx
import {
  Tr,
  Td,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * ✅ Skeleton loader for category table rows
 */
export const CategoryTableSkeleton = ({ rows = 5 }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      {Array(rows)
        .fill("")
        .map((_, index) => (
          <Tr key={index}>
            {/* Category Name */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="120px" />
            </Td>

            {/* Identifier */}
            <Td borderColor={borderColor} py={3}>
              <SkeletonText noOfLines={1} width="100px" />
            </Td>

            {/* Image */}
            <Td borderColor={borderColor} py={3}>
              <Skeleton height="40px" width="40px" borderRadius="md" />
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
