// src/features/staff-portal/products/ProductModalV2.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  Alert,
  AlertIcon,
  AlertDescription,
  Badge,
  Divider,
  Flex,
} from "@chakra-ui/react";
import {
  Info,
  Wallet,
  Ruler,
  Image as ImageIcon,
  Layers,
  Hash,
  FileText,
  Package,
  AlertCircle,
} from "lucide-react";
import {
  useProductActions,
  useProductModal,
  useProductValidation,
  useDynamicFilters,
} from "./hooks";
import { useGetCategoriesQuery } from "../categories/services/categoriesApiSlice";

/**
 * ✅ ProductModalV2 - Complete redesign with full ProductSchema alignment
 *
 * Features:
 * - Fixed dimensions with internal scroll
 * - Tab system with icons and error indicators
 * - Cross-tab validation
 * - Full schema support
 * - Dynamic filters integration
 * - Modular and extensible structure
 *
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Close handler
 * @param {string|null} initialCategory - Category to pre-fill when creating new product
 */
const ProductModalV2 = ({ isOpen, onClose, initialCategory = null }) => {
  const { selectedProduct, isEditMode } = useProductModal();
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProductActions();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { errors, validate, hasTabErrors, clearErrors, errorSummary } =
    useProductValidation();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const errorBg = useColorModeValue("red.50", "red.900");
  const successBg = useColorModeValue("green.50", "green.900");

  const [tabIndex, setTabIndex] = useState(0);

  // ✅ Complete form state aligned with ProductSchema
  const defaultFormData = useMemo(
    () => ({
      // Basic fields
      visibility: false,
      isOriginal: false,
      category: "",
      imageUrl: [],
      catalogNumber: "",
      en_name: "",
      name: "",
      alternateCatalogNumber: [],
      docs: [],
      manufacturers: [],

      // Price fields
      price: "",
      priceBeforeVat: "",
      purchasePrice: "",
      supplierPrice: "",

      // Linet sync fields
      linetItemId: null,
      syncedWithLinet: false,
      linetSyncDate: null,
      linetSyncError: null,

      // Installation
      installationInstructions: "",

      // Custom details
      color: "",
      print: "no",
      holes: "",
      type: "",
      width: "",
      height: "",
      weight: "",
      curvature: "",
      comments: "",
    }),
    []
  );

  const [formData, setFormData] = useState(defaultFormData);

  // ✅ Load form data from selected product or use initial category
  const initialFormData = useMemo(() => {
    if (!selectedProduct) {
      // For new products, pre-fill category if provided
      if (initialCategory) {
        return { ...defaultFormData, category: initialCategory };
      }
      return defaultFormData;
    }

    return {
      _id: selectedProduct._id,
      visibility: selectedProduct.visibility ?? false,
      isOriginal: selectedProduct.isOriginal ?? false,
      category: selectedProduct.category || "",
      imageUrl: selectedProduct.imageUrl || [],
      catalogNumber: selectedProduct.catalogNumber || "",
      en_name: selectedProduct.en_name || "",
      name: selectedProduct.name || "",
      alternateCatalogNumber: selectedProduct.alternateCatalogNumber || [],
      docs: selectedProduct.docs || [],
      manufacturers: selectedProduct.manufacturers || [],
      price: selectedProduct.price || "",
      priceBeforeVat: selectedProduct.priceBeforeVat || "",
      purchasePrice: selectedProduct.purchasePrice || "",
      supplierPrice: selectedProduct.supplierPrice || "",
      linetItemId: selectedProduct.linetItemId || null,
      syncedWithLinet: selectedProduct.syncedWithLinet || false,
      linetSyncDate: selectedProduct.linetSyncDate || null,
      linetSyncError: selectedProduct.linetSyncError || null,
      installationInstructions: selectedProduct.installationInstructions || "",
      color: selectedProduct.color || "",
      print: selectedProduct.print || "no",
      holes: selectedProduct.holes || "",
      type: selectedProduct.type || "",
      width: selectedProduct.width || "",
      height: selectedProduct.height || "",
      weight: selectedProduct.weight || "",
      curvature: selectedProduct.curvature || "",
      comments: selectedProduct.comments || "",
    };
  }, [selectedProduct, defaultFormData, initialCategory]);

  // ✅ Dynamic filters for manufacturers
  const {
    machines,
    models,
    years,
    isLoading: isOptionsLoading,
  } = useDynamicFilters(formData.category, null, null);

  // ✅ Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      clearErrors();
      setTabIndex(0);
    }
  }, [isOpen, initialFormData, clearErrors]);

  // ✅ Handle form field change
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // ✅ Handle isOriginal change with catalogNumber reset logic
  const handleIsOriginalChange = useCallback((isChecked) => {
    setFormData((prev) => {
      // If changing from true (manual) to false (auto), clear the catalogNumber
      // The server will generate it automatically
      if (prev.isOriginal === true && isChecked === false) {
        return {
          ...prev,
          isOriginal: isChecked,
          catalogNumber: "", // Reset catalogNumber - server will generate it
        };
      }

      // If changing from false (auto) to true (manual), keep existing catalogNumber
      // User will need to enter it manually
      return {
        ...prev,
        isOriginal: isChecked,
      };
    });
  }, []);

  // ✅ Handle close
  const handleClose = useCallback(() => {
    setFormData(defaultFormData);
    clearErrors();
    setTabIndex(0);
    onClose();
  }, [defaultFormData, clearErrors, onClose]);

  // ✅ Handle save with validation
  const handleSave = useCallback(async () => {
    const validationResult = validate(formData);

    if (!validationResult.isValid) {
      // Jump to first tab with error
      if (validationResult.firstErrorTab >= 0) {
        setTabIndex(validationResult.firstErrorTab);
      }
      return;
    }

    let result;
    if (isEditMode) {
      // Update existing product
      result = await updateProduct({
        ...selectedProduct,
        ...formData,
      });
    } else {
      // Create new product
      result = await createProduct(formData);
    }

    if (result?.success) {
      handleClose();
    }
  }, [
    formData,
    validate,
    isEditMode,
    selectedProduct,
    updateProduct,
    createProduct,
    handleClose,
  ]);

  const isLoading = isCreating || isUpdating;

  // ✅ Tab configuration with icons
  const tabs = useMemo(
    () => [
      { label: "כללי", icon: Info },
      { label: "פרטים כספיים", icon: Wallet },
      { label: "פרטים טכניים", icon: Ruler },
      { label: "תמונות", icon: ImageIcon },
      { label: "תאימות", icon: Layers },
      { label: 'מק"ט חלופי', icon: Hash },
      { label: "הערות", icon: FileText },
    ],
    []
  );

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="6xl"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        dir="rtl"
        maxH="75vh"
        h="75vh"
        borderRadius="2xl"
        boxShadow="2xl"
      >
        {/* ========== HEADER ========== */}
        <ModalHeader
          borderBottom="1px solid"
          borderColor={borderColor}
          py={5}
          px={8}
          flexShrink={0}
        >
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Box p={2} bg={primary} borderRadius="lg" color="white">
                <Package size={24} />
              </Box>
              <Box>
                <Text fontSize="xl" fontWeight="700" color={textColor}>
                  {isEditMode ? "עריכת מוצר" : "הוספת מוצר חדש"}
                </Text>
                <Text fontSize="sm" color={secondaryText} mt={0.5}>
                  {isEditMode
                    ? selectedProduct?.name || "ללא שם"
                    : "מלא את כל הפרטים הנדרשים"}
                </Text>
              </Box>
            </HStack>
            {isEditMode && selectedProduct?.catalogNumber && (
              <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                {selectedProduct.catalogNumber}
              </Badge>
            )}
          </Flex>

          {/* ========== ERROR SUMMARY ========== */}
          {errorSummary && (
            <Alert status="error" borderRadius="lg" mt={4}>
              <AlertIcon />
              <AlertDescription fontSize="sm">
                {errorSummary.message} - אנא תקן את השגיאות לפני השמירה
              </AlertDescription>
            </Alert>
          )}
        </ModalHeader>

        <ModalCloseButton
          top={5}
          left={6}
          borderRadius="full"
          _hover={{ bg: hoverBg }}
        />

        {/* ========== BODY WITH TABS ========== */}
        <ModalBody p={0} overflow="hidden" flex="1">
          <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            colorScheme="orange"
            display="flex"
            flexDirection="column"
            h="full"
          >
            {/* Tab List */}
            <TabList
              px={6}
              pt={4}
              pb={2}
              borderBottom="2px solid"
              borderColor={borderColor}
              flexShrink={0}
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
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const hasError = hasTabErrors(index);

                return (
                  <Tab
                    key={index}
                    _selected={{
                      color: primary,
                      borderColor: primary,
                    }}
                    position="relative"
                  >
                    <HStack spacing={2}>
                      <Icon size={16} />
                      <Text>{tab.label}</Text>
                      {hasError && (
                        <Box
                          as={AlertCircle}
                          size={16}
                          color="red.500"
                          title="יש שגיאות בטאב זה"
                        />
                      )}
                    </HStack>
                  </Tab>
                );
              })}
            </TabList>

            {/* Tab Panels - Scrollable */}
            <TabPanels flex="1" overflow="auto">
              {/* ========== TAB 0: כללי ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isInvalid={errors.name} isRequired>
                        <FormLabel>שם מוצר</FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="הזן שם מוצר"
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.en_name}>
                        <FormLabel>שם באנגלית</FormLabel>
                        <Input
                          value={formData.en_name}
                          onChange={(e) =>
                            handleChange("en_name", e.target.value)
                          }
                          placeholder="Enter English name"
                        />
                        <FormErrorMessage>{errors.en_name}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl
                        isInvalid={errors.catalogNumber}
                        isRequired={formData.isOriginal}
                      >
                        <FormLabel>
                          מק"ט
                          {!formData.isOriginal && (
                            <Text
                              as="span"
                              fontSize="xs"
                              color={secondaryText}
                              mr={2}
                            >
                              (יווצר אוטומטית)
                            </Text>
                          )}
                        </FormLabel>
                        <Input
                          value={formData.catalogNumber}
                          onChange={(e) =>
                            handleChange("catalogNumber", e.target.value)
                          }
                          placeholder={
                            formData.isOriginal
                              ? "הזן מק״ט ידנית"
                              : "מק״ט יווצר אוטומטית בשרת"
                          }
                          isDisabled={!formData.isOriginal}
                          bg={!formData.isOriginal ? "gray.100" : "white"}
                        />
                        <FormErrorMessage>
                          {errors.catalogNumber}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.category} isRequired>
                        <FormLabel>קטגוריה</FormLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) =>
                            handleChange("category", e.target.value)
                          }
                          placeholder="בחר קטגוריה"
                        >
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.category}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Divider />

                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl display="flex" alignItems="center">
                        <Checkbox
                          isChecked={formData.visibility}
                          onChange={(e) =>
                            handleChange("visibility", e.target.checked)
                          }
                          colorScheme="green"
                        >
                          <Text fontWeight="500">מוצר פעיל (נראה באתר)</Text>
                        </Checkbox>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl display="flex" alignItems="center">
                        <Checkbox
                          isChecked={formData.isOriginal}
                          onChange={(e) =>
                            handleIsOriginalChange(e.target.checked)
                          }
                          colorScheme="blue"
                        >
                          <Text fontWeight="500">מוצר מקורי</Text>
                        </Checkbox>
                        <Text fontSize="xs" color={secondaryText} mr={2}>
                          {formData.isOriginal
                            ? "(מק״ט ידני)"
                            : "(מק״ט אוטומטי)"}
                        </Text>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </TabPanel>

              {/* ========== TAB 1: פרטים כספיים ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isInvalid={errors.price} isRequired>
                        <FormLabel>מחיר (₪)</FormLabel>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            handleChange("price", e.target.value)
                          }
                          placeholder="0.00"
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.priceBeforeVat}>
                        <FormLabel>מחיר לפני מע"מ (₪)</FormLabel>
                        <Input
                          type="number"
                          value={formData.priceBeforeVat}
                          onChange={(e) =>
                            handleChange("priceBeforeVat", e.target.value)
                          }
                          placeholder="0.00"
                        />
                        <FormErrorMessage>
                          {errors.priceBeforeVat}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.purchasePrice}>
                        <FormLabel>מחיר קניה (₪)</FormLabel>
                        <Input
                          type="number"
                          value={formData.purchasePrice}
                          onChange={(e) =>
                            handleChange("purchasePrice", e.target.value)
                          }
                          placeholder="0.00"
                        />
                        <FormErrorMessage>
                          {errors.purchasePrice}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.supplierPrice}>
                        <FormLabel>מחיר ספק (₪)</FormLabel>
                        <Input
                          type="number"
                          value={formData.supplierPrice}
                          onChange={(e) =>
                            handleChange("supplierPrice", e.target.value)
                          }
                          placeholder="0.00"
                        />
                        <FormErrorMessage>
                          {errors.supplierPrice}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Linet Sync Info */}
                  {isEditMode && formData.syncedWithLinet && (
                    <Box p={4} bg={successBg} borderRadius="lg">
                      <Text fontSize="sm" fontWeight="600" mb={1}>
                        מסונכרן עם Linet
                      </Text>
                      <Text fontSize="xs" color={secondaryText}>
                        Linet ID: {formData.linetItemId}
                      </Text>
                      {formData.linetSyncDate && (
                        <Text fontSize="xs" color={secondaryText}>
                          עודכן לאחרונה:{" "}
                          {new Date(formData.linetSyncDate).toLocaleString(
                            "he-IL"
                          )}
                        </Text>
                      )}
                    </Box>
                  )}

                  {isEditMode && formData.linetSyncError && (
                    <Box p={4} bg={errorBg} borderRadius="lg">
                      <Text fontSize="sm" fontWeight="600" mb={1}>
                        שגיאת סנכרון Linet
                      </Text>
                      <Text fontSize="xs" color={secondaryText}>
                        {formData.linetSyncError}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>

              {/* ========== TAB 2: פרטים טכניים ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isInvalid={errors.width}>
                        <FormLabel>רוחב</FormLabel>
                        <Input
                          value={formData.width}
                          onChange={(e) =>
                            handleChange("width", e.target.value)
                          }
                          placeholder="0"
                        />
                        <FormErrorMessage>{errors.width}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.height}>
                        <FormLabel>גובה</FormLabel>
                        <Input
                          value={formData.height}
                          onChange={(e) =>
                            handleChange("height", e.target.value)
                          }
                          placeholder="0"
                        />
                        <FormErrorMessage>{errors.height}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={errors.weight}>
                        <FormLabel>משקל</FormLabel>
                        <Input
                          value={formData.weight}
                          onChange={(e) =>
                            handleChange("weight", e.target.value)
                          }
                          placeholder="0"
                        />
                        <FormErrorMessage>{errors.weight}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>צבע</FormLabel>
                        <Input
                          value={formData.color}
                          onChange={(e) =>
                            handleChange("color", e.target.value)
                          }
                          placeholder="הזן צבע"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>סוג</FormLabel>
                        <Input
                          value={formData.type}
                          onChange={(e) => handleChange("type", e.target.value)}
                          placeholder="הזן סוג"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>עקמומיות</FormLabel>
                        <Input
                          value={formData.curvature}
                          onChange={(e) =>
                            handleChange("curvature", e.target.value)
                          }
                          placeholder="הזן עקמומיות"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>חורים</FormLabel>
                        <Input
                          value={formData.holes}
                          onChange={(e) =>
                            handleChange("holes", e.target.value)
                          }
                          placeholder="הזן חורים"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>הדפסה</FormLabel>
                        <Select
                          value={formData.print}
                          onChange={(e) =>
                            handleChange("print", e.target.value)
                          }
                        >
                          <option value="no">לא</option>
                          <option value="yes">כן</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </TabPanel>

              {/* ========== TAB 3: תמונות ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Box
                    p={8}
                    border="2px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <ImageIcon size={48} color={secondaryText} />
                    <Text mt={4} fontSize="lg" fontWeight="600">
                      📸 Image Gallery (Placeholder)
                    </Text>
                    <Text fontSize="sm" color={secondaryText} mt={2}>
                      תכונה זו תימשך בשלב הבא
                    </Text>
                    <Text fontSize="xs" color={secondaryText} mt={1}>
                      Drag & Drop, Preview, Delete functionality
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* ========== TAB 4: תאימות (Manufacturers) ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Box
                    p={8}
                    border="2px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Layers size={48} color={secondaryText} />
                    <Text mt={4} fontSize="lg" fontWeight="600">
                      🏗️ Manufacturers Hierarchy (Placeholder)
                    </Text>
                    <Text fontSize="sm" color={secondaryText} mt={2}>
                      תכונה זו תימשך בשלב הבא
                    </Text>
                    <Text fontSize="xs" color={secondaryText} mt={1}>
                      manufacturers → models → years → variants management
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* ========== TAB 5: מק"ט חלופי ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <Box
                    p={8}
                    border="2px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Hash size={48} color={secondaryText} />
                    <Text mt={4} fontSize="lg" fontWeight="600">
                      🔢 Alternate Catalog Numbers (Placeholder)
                    </Text>
                    <Text fontSize="sm" color={secondaryText} mt={2}>
                      תכונה זו תימשך בשלב הבא
                    </Text>
                    <Text fontSize="xs" color={secondaryText} mt={1}>
                      Add/remove alternate SKUs with chips UI
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* ========== TAB 6: הערות ========== */}
              <TabPanel>
                <VStack spacing={6} align="stretch" pb={6}>
                  <FormControl>
                    <FormLabel>הוראות התקנה</FormLabel>
                    <Textarea
                      value={formData.installationInstructions}
                      onChange={(e) =>
                        handleChange("installationInstructions", e.target.value)
                      }
                      placeholder="הזן הוראות התקנה"
                      rows={5}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>הערות</FormLabel>
                    <Textarea
                      value={formData.comments}
                      onChange={(e) => handleChange("comments", e.target.value)}
                      placeholder="הזן הערות נוספות"
                      rows={5}
                    />
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* ========== FOOTER ========== */}
        <ModalFooter
          borderTop="1px solid"
          borderColor={borderColor}
          py={4}
          px={8}
          flexShrink={0}
        >
          <HStack spacing={3}>
            <Button
              variant="ghost"
              onClick={handleClose}
              isDisabled={isLoading}
            >
              ביטול
            </Button>
            <Button
              bg={primary}
              color="white"
              onClick={handleSave}
              isLoading={isLoading}
              loadingText={isEditMode ? "מעדכן..." : "שומר..."}
              _hover={{ bg: "primary.200" }}
              px={8}
            >
              {isEditMode ? "עדכן מוצר" : "צור מוצר"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ProductModalV2.displayName = "ProductModalV2";

export default ProductModalV2;
