// src/features/staff-portal/products/components/ProductModalTabContent.jsx
import React, { memo } from "react";
import {
  VStack,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  HStack,
  Box,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * ✅ Memoized Tab Content Components
 * Each tab is isolated to prevent unnecessary re-renders
 */

// Tab 1: General Information
export const GeneralTab = memo(({ formData, errors, categories, onFieldChange, onCheckboxChange, textColor, secondaryText }) => {
  return (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              שם המוצר
            </FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              placeholder="לדוגמה: זכוכית קדמית טרקטור"
              borderRadius="lg"
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired isInvalid={!!errors.catalogNumber}>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              מק״ט
            </FormLabel>
            <Input
              value={formData.catalogNumber}
              onChange={(e) => onFieldChange("catalogNumber", e.target.value)}
              placeholder="לדוגמה: JD-6430-FG"
              borderRadius="lg"
            />
            {errors.catalogNumber && <FormErrorMessage>{errors.catalogNumber}</FormErrorMessage>}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired isInvalid={!!errors.category}>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              קטגוריה
            </FormLabel>
            <Select
              value={formData.category}
              onChange={(e) => onFieldChange("category", e.target.value)}
              borderRadius="lg"
            >
              <option value="">בחר קטגוריה</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
            {errors.category && <FormErrorMessage>{errors.category}</FormErrorMessage>}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              ברקוד
            </FormLabel>
            <Input
              value={formData.barcode}
              onChange={(e) => onFieldChange("barcode", e.target.value)}
              placeholder="ברקוד אופציונלי"
              borderRadius="lg"
            />
          </FormControl>
        </GridItem>
      </Grid>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
          תיאור
        </FormLabel>
        <Textarea
          value={formData.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="תיאור מפורט של המוצר..."
          rows={4}
          borderRadius="lg"
        />
      </FormControl>

      <HStack spacing={4}>
        <Checkbox
          colorScheme="orange"
          isChecked={formData.isActive}
          onChange={(e) => onCheckboxChange("isActive", e.target.checked)}
        >
          פריט פעיל
        </Checkbox>
        <Checkbox
          colorScheme="orange"
          isChecked={formData.isAvailable}
          onChange={(e) => onCheckboxChange("isAvailable", e.target.checked)}
        >
          זמין להזמנה
        </Checkbox>
        <Checkbox
          colorScheme="orange"
          isChecked={formData.isFeatured}
          onChange={(e) => onCheckboxChange("isFeatured", e.target.checked)}
        >
          מוצר מומלץ
        </Checkbox>
      </HStack>
    </VStack>
  );
});

GeneralTab.displayName = "GeneralTab";

// Tab 2: Financial Information
export const FinancialTab = memo(({ formData, errors, financialSummary, onFieldChange, textColor, secondaryText, primary, hoverBg }) => {
  return (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl isRequired isInvalid={!!errors.price}>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              מחיר מכירה
            </FormLabel>
            <NumberInput
              value={formData.price}
              onChange={(value) => onFieldChange("price", parseFloat(value) || 0)}
              min={0}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage>}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              מחיר עלות
            </FormLabel>
            <NumberInput
              value={formData.costPrice}
              onChange={(value) => onFieldChange("costPrice", parseFloat(value) || 0)}
              min={0}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              אחוז מע״מ
            </FormLabel>
            <NumberInput
              value={formData.taxRate}
              onChange={(value) => onFieldChange("taxRate", parseFloat(value) || 0)}
              min={0}
              max={100}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
              מטבע
            </FormLabel>
            <Select
              value={formData.currency}
              onChange={(e) => onFieldChange("currency", e.target.value)}
              borderRadius="lg"
            >
              <option value="ILS">שקל (₪)</option>
              <option value="USD">דולר ($)</option>
              <option value="EUR">יורו (€)</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>

      <Box p={4} bg={hoverBg} borderRadius="lg">
        <Text fontSize="sm" fontWeight="600" color={textColor} mb={2}>
          סיכום פיננסי
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <Box>
            <Text fontSize="xs" color={secondaryText}>רווח ליחידה</Text>
            <Text fontSize="lg" fontWeight="bold" color={primary}>
              ₪{financialSummary.profit.toFixed(2)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color={secondaryText}>אחוז רווח</Text>
            <Text fontSize="lg" fontWeight="bold" color={primary}>
              {financialSummary.profitPercent}%
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color={secondaryText}>מחיר כולל מע״מ</Text>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              ₪{financialSummary.priceWithTax}
            </Text>
          </Box>
        </Grid>
      </Box>
    </VStack>
  );
});

FinancialTab.displayName = "FinancialTab";
