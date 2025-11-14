import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Box,
  Text,
  useColorModeValue,
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
  VStack,
  Grid,
  GridItem,
  FormErrorMessage,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
} from "@chakra-ui/react";
import { useProductActions, useProductModal } from "./hooks";
import { useGetCategoriesQuery } from "../categories/services/categoriesApiSlice";

const ProductModal = ({ isOpen, onClose }) => {
  const { selectedProduct, isEditMode } = useProductModal();
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProductActions();
  const { data: categories = [] } = useGetCategoriesQuery();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const [tabIndex, setTabIndex] = useState(0);

  // ✅ Memoized default form state (created only once)
  const defaultFormData = useMemo(
    () => ({
      // כללי
      name: "",
      catalogNumber: "",
      category: "",
      description: "",
      barcode: "",
      isActive: true,
      isAvailable: true,
      isFeatured: false,
      // פרטים כספיים
      price: 0,
      costPrice: 0,
      taxRate: 17,
      currency: "ILS",
      // מלאי
      stock: 0,
      minStock: 5,
      maxStock: 100,
      warehouse: "",
      lowStockAlert: false,
      outOfStockAlert: false,
      autoReorder: false,
      // תאימות
      compatibleModels: [],
      width: "",
      height: "",
      thickness: "",
      weight: "",
      // תמונות
      images: [],
      // ספקים
      supplier: "",
      supplierSku: "",
      minOrderQuantity: 1,
      deliveryTime: 3,
      // הערות
      notes: "",
      attachments: [],
    }),
    []
  );

  // ✅ Form state
  const [formData, setFormData] = useState(defaultFormData);

  const [errors, setErrors] = useState({
    name: "",
    catalogNumber: "",
    category: "",
    price: "",
  });

  // ✅ Memoize form data from selectedProduct (prevents recreation)
  const initialFormData = useMemo(() => {
    if (!selectedProduct) return defaultFormData;

    return {
      name: selectedProduct.name || "",
      catalogNumber: selectedProduct.catalogNumber || "",
      category: selectedProduct.category || "",
      description: selectedProduct.description || "",
      barcode: selectedProduct.barcode || "",
      isActive: selectedProduct.isActive ?? true,
      isAvailable: selectedProduct.isAvailable ?? true,
      isFeatured: selectedProduct.isFeatured ?? false,
      price: selectedProduct.price || 0,
      costPrice: selectedProduct.costPrice || 0,
      taxRate: selectedProduct.taxRate || 17,
      currency: selectedProduct.currency || "ILS",
      stock: selectedProduct.stock || 0,
      minStock: selectedProduct.minStock || 5,
      maxStock: selectedProduct.maxStock || 100,
      warehouse: selectedProduct.warehouse || "",
      lowStockAlert: selectedProduct.lowStockAlert || false,
      outOfStockAlert: selectedProduct.outOfStockAlert || false,
      autoReorder: selectedProduct.autoReorder || false,
      compatibleModels: selectedProduct.compatibleModels || [],
      width: selectedProduct.width || "",
      height: selectedProduct.height || "",
      thickness: selectedProduct.thickness || "",
      weight: selectedProduct.weight || "",
      images: selectedProduct.images || [],
      supplier: selectedProduct.supplier || "",
      supplierSku: selectedProduct.supplierSku || "",
      minOrderQuantity: selectedProduct.minOrderQuantity || 1,
      deliveryTime: selectedProduct.deliveryTime || 3,
      notes: selectedProduct.notes || "",
      attachments: selectedProduct.attachments || [],
    };
  }, [selectedProduct, defaultFormData]);

  // ✅ Update form when modal opens (lighter useEffect)
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setErrors({ name: "", catalogNumber: "", category: "", price: "" });
      setTabIndex(0);
    }
  }, [isOpen, initialFormData]);

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = { name: "", catalogNumber: "", category: "", price: "" };
    let isValid = true;

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "שם מוצר חייב להכיל לפחות 2 תווים";
      isValid = false;
    }

    if (!formData.catalogNumber || formData.catalogNumber.trim().length < 1) {
      newErrors.catalogNumber = "מק״ט הוא שדה חובה";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "יש לבחור קטגוריה";
      isValid = false;
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "מחיר חייב להיות גדול מ-0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Memoized close handler
  const handleClose = useCallback(() => {
    // Use defaultFormData instead of recreating object
    setFormData(defaultFormData);
    setErrors({ name: "", catalogNumber: "", category: "", price: "" });
    setTabIndex(0);
    onClose();
  }, [defaultFormData, onClose]);

  // ✅ Memoized save handler
  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      setTabIndex(0); // Go to first tab if validation fails
      return;
    }

    let result;
    if (isEditMode) {
      // Update existing product - keep all original fields
      result = await updateProduct({
        ...selectedProduct, // Keep all original product fields
        ...formData, // Override with form data
      });
    } else {
      // Create new product
      result = await createProduct(formData);
    }

    // Close modal on success
    if (result.success) {
      handleClose();
    }
  }, [
    formData,
    isEditMode,
    selectedProduct,
    updateProduct,
    createProduct,
    handleClose,
  ]);

  // ✅ Memoized financial calculations (only recalculate when price/cost changes)
  const financialSummary = useMemo(() => {
    const profit = formData.price - formData.costPrice;
    const profitPercent =
      formData.costPrice > 0
        ? (
            ((formData.price - formData.costPrice) / formData.costPrice) *
            100
          ).toFixed(1)
        : 0;
    const priceWithTax = (
      formData.price *
      (1 + formData.taxRate / 100)
    ).toFixed(2);

    return { profit, profitPercent, priceWithTax };
  }, [formData.price, formData.costPrice, formData.taxRate]);

  const isLoading = isCreating || isUpdating;

  // ✅ Early return if not open (don't render heavy modal until needed)
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="6xl"
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent dir="rtl" maxH="90vh" borderRadius="2xl" boxShadow="2xl">
        <ModalHeader
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
          px={8}
        >
          <HStack justify="space-between">
            <Box>
              <Text fontSize="2xl" fontWeight="700" color={textColor}>
                {isEditMode ? "עריכת מוצר" : "הוספת מוצר חדש"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                {isEditMode
                  ? `עדכון פרטי: ${selectedProduct?.name || ""}`
                  : "הזן את פרטי המוצר"}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>

        <ModalCloseButton
          top={6}
          left={6}
          borderRadius="full"
          _hover={{ bg: hoverBg }}
        />

        <ModalBody p={0}>
          <Tabs index={tabIndex} onChange={setTabIndex} colorScheme="orange">
            <TabList
              px={6}
              pt={4}
              borderBottom="2px solid"
              borderColor={borderColor}
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": {
                  height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#CBD5E0",
                  borderRadius: "10px",
                },
              }}
            >
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                כללי
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                פרטים כספיים
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                מלאי
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                תאימות
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                ספקים
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="sm"
                _selected={{ color: primary, borderColor: primary }}
              >
                הערות
              </Tab>
            </TabList>

            <TabPanels>
              {/* טאב 1: כללי */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired isInvalid={!!errors.name}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          שם המוצר
                        </FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="לדוגמה: זכוכית קדמית טרקטור"
                          borderRadius="lg"
                        />
                        {errors.name && (
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl
                        isRequired
                        isInvalid={!!errors.catalogNumber}
                      >
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מק״ט
                        </FormLabel>
                        <Input
                          value={formData.catalogNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              catalogNumber: e.target.value,
                            })
                          }
                          placeholder="לדוגמה: JD-6430-FG"
                          borderRadius="lg"
                        />
                        {errors.catalogNumber && (
                          <FormErrorMessage>
                            {errors.catalogNumber}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired isInvalid={!!errors.category}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          קטגוריה
                        </FormLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          borderRadius="lg"
                        >
                          <option value="">בחר קטגוריה</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </Select>
                        {errors.category && (
                          <FormErrorMessage>{errors.category}</FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          ברקוד
                        </FormLabel>
                        <Input
                          value={formData.barcode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              barcode: e.target.value,
                            })
                          }
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="תיאור מפורט של המוצר..."
                      rows={4}
                      borderRadius="lg"
                    />
                  </FormControl>

                  <HStack spacing={4}>
                    <Checkbox
                      colorScheme="orange"
                      isChecked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    >
                      פריט פעיל
                    </Checkbox>
                    <Checkbox
                      colorScheme="orange"
                      isChecked={formData.isAvailable}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isAvailable: e.target.checked,
                        })
                      }
                    >
                      זמין להזמנה
                    </Checkbox>
                    <Checkbox
                      colorScheme="orange"
                      isChecked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFeatured: e.target.checked,
                        })
                      }
                    >
                      מוצר מומלץ
                    </Checkbox>
                  </HStack>
                </VStack>
              </TabPanel>

              {/* טאב 2: פרטים כספיים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired isInvalid={!!errors.price}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מחיר מכירה
                        </FormLabel>
                        <NumberInput
                          value={formData.price}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              price: parseFloat(value) || 0,
                            })
                          }
                          min={0}
                        >
                          <NumberInputField borderRadius="lg" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        {errors.price && (
                          <FormErrorMessage>{errors.price}</FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מחיר עלות
                        </FormLabel>
                        <NumberInput
                          value={formData.costPrice}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              costPrice: parseFloat(value) || 0,
                            })
                          }
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
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          אחוז מע״מ
                        </FormLabel>
                        <NumberInput
                          value={formData.taxRate}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              taxRate: parseFloat(value) || 0,
                            })
                          }
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
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מטבע
                        </FormLabel>
                        <Select
                          value={formData.currency}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              currency: e.target.value,
                            })
                          }
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
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                      mb={2}
                    >
                      סיכום פיננסי
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <Box>
                        <Text fontSize="xs" color={secondaryText}>
                          רווח ליחידה
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color={primary}>
                          ₪{financialSummary.profit.toFixed(2)}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color={secondaryText}>
                          אחוז רווח
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color={primary}>
                          {financialSummary.profitPercent}%
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color={secondaryText}>
                          מחיר כולל מע״מ
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                          ₪{financialSummary.priceWithTax}
                        </Text>
                      </Box>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 3: מלאי */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          כמות במלאי
                        </FormLabel>
                        <NumberInput
                          value={formData.stock}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              stock: parseInt(value) || 0,
                            })
                          }
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
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מחסן
                        </FormLabel>
                        <Select
                          value={formData.warehouse}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              warehouse: e.target.value,
                            })
                          }
                          borderRadius="lg"
                        >
                          <option value="">בחר מחסן</option>
                          <option value="main">מחסן ראשי</option>
                          <option value="secondary">מחסן משני</option>
                          <option value="external">מחסן חיצוני</option>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מלאי מינימום
                        </FormLabel>
                        <NumberInput
                          value={formData.minStock}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              minStock: parseInt(value) || 0,
                            })
                          }
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
                        <FormLabel
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                        >
                          מלאי מקסימום
                        </FormLabel>
                        <NumberInput
                          value={formData.maxStock}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              maxStock: parseInt(value) || 0,
                            })
                          }
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
                  </Grid>

                  <Box p={4} bg={hoverBg} borderRadius="lg">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                      mb={2}
                    >
                      התראות מלאי
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <Checkbox
                        colorScheme="orange"
                        isChecked={formData.lowStockAlert}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lowStockAlert: e.target.checked,
                          })
                        }
                      >
                        שלח התראה כאשר המלאי נמוך מ-{formData.minStock} יחידות
                      </Checkbox>
                      <Checkbox
                        colorScheme="orange"
                        isChecked={formData.outOfStockAlert}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            outOfStockAlert: e.target.checked,
                          })
                        }
                      >
                        שלח התראה כאשר המלאי מגיע ל-0
                      </Checkbox>
                      <Checkbox
                        colorScheme="orange"
                        isChecked={formData.autoReorder}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            autoReorder: e.target.checked,
                          })
                        }
                      >
                        הזמן אוטומטית כאשר המלאי נמוך
                      </Checkbox>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 4: תאימות */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      מידות (ס״מ)
                    </FormLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <Input
                        placeholder="רוחב"
                        value={formData.width}
                        onChange={(e) =>
                          setFormData({ ...formData, width: e.target.value })
                        }
                        borderRadius="lg"
                      />
                      <Input
                        placeholder="גובה"
                        value={formData.height}
                        onChange={(e) =>
                          setFormData({ ...formData, height: e.target.value })
                        }
                        borderRadius="lg"
                      />
                      <Input
                        placeholder="עובי"
                        value={formData.thickness}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            thickness: e.target.value,
                          })
                        }
                        borderRadius="lg"
                      />
                    </Grid>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      משקל (ק״ג)
                    </FormLabel>
                    <Input
                      placeholder="משקל המוצר"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      borderRadius="lg"
                    />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* טאב 5: ספקים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      ספק ראשי
                    </FormLabel>
                    <Select
                      value={formData.supplier}
                      onChange={(e) =>
                        setFormData({ ...formData, supplier: e.target.value })
                      }
                      borderRadius="lg"
                    >
                      <option value="">בחר ספק</option>
                      <option value="delta">דלתא גלאס</option>
                      <option value="pilkington">פילקינגטון</option>
                      <option value="saint-gobain">סנט גובן</option>
                      <option value="agsi">אגסי פלסט</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      מק״ט אצל הספק
                    </FormLabel>
                    <Input
                      value={formData.supplierSku}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          supplierSku: e.target.value,
                        })
                      }
                      placeholder="מק״ט המוצר אצל הספק"
                      borderRadius="lg"
                    />
                  </FormControl>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                      >
                        כמות הזמנה מינימלית
                      </FormLabel>
                      <NumberInput
                        value={formData.minOrderQuantity}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            minOrderQuantity: parseInt(value) || 1,
                          })
                        }
                        min={1}
                      >
                        <NumberInputField borderRadius="lg" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                      >
                        זמן אספקה (ימים)
                      </FormLabel>
                      <NumberInput
                        value={formData.deliveryTime}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            deliveryTime: parseInt(value) || 1,
                          })
                        }
                        min={1}
                      >
                        <NumberInputField borderRadius="lg" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Grid>
                </VStack>
              </TabPanel>

              {/* טאב 6: הערות */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      הערות פנימיות
                    </FormLabel>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="הערות פנימיות למוצר..."
                      rows={8}
                      borderRadius="lg"
                    />
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <Box borderTop="1px solid" borderColor={borderColor} p={6}>
          <HStack justify="flex-start" spacing={3}>
            <Button
              bg={primary}
              color="white"
              px={8}
              h="45px"
              fontSize="md"
              fontWeight="600"
              borderRadius="full"
              _hover={{ bg: "primary.200" }}
              onClick={handleSave}
              isLoading={isLoading}
              loadingText={isEditMode ? "מעדכן..." : "שומר..."}
            >
              {isEditMode ? "עדכן" : "שמור"}
            </Button>
            <Button
              variant="outline"
              borderColor={borderColor}
              px={8}
              h="45px"
              fontSize="md"
              fontWeight="600"
              borderRadius="full"
              _hover={{ bg: hoverBg }}
              onClick={handleClose}
              isDisabled={isLoading}
            >
              ביטול
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
