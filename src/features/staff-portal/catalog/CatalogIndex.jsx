import React from "react";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const CatalogIndex = () => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");

  return (
    <Box p={8} dir="rtl">
      <Heading size="xl" mb={2} color={textColor}>
        קטלוג
      </Heading>
      <Text fontSize="md" color={secondaryText}>
        ניהול קטלוג המוצרים והשירותים
      </Text>
    </Box>
  );
};

export default CatalogIndex;
