import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  VStack,
  HStack,
  Grid,
  GridItem,
  useColorModeValue,
  Text,
  Box,
  Image,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { Upload, X, Plus } from "lucide-react";

const ProductModal = ({ isOpen, onClose, product }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    // כללי
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    description: "",
    // פרטים כספיים
    price: product?.price || 0,
    costPrice: 0,
    taxRate: 17,
    currency: "ILS",
    // מלאי
    stock: product?.stock || 0,
    minStock: 5,
    maxStock: 100,
    warehouse: "",
    // תאימות
    compatibleModels: [],
    // תמונות
    images: [],
    // ספקים
    suppliers: [product?.supplier || ""],
    // הערות
    notes: "",
    attachments: [],
  });

  const handleSave = () => {
    console.log("Saving product:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent dir="rtl" maxH="90vh">
        <ModalHeader borderBottom="1px solid" borderColor={borderColor}>
          {product ? "עריכת מוצר" : "הוספת מוצר חדש"}
        </ModalHeader>
        <ModalCloseButton />

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
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                כללי
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                פרטים כספיים
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                מלאי
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                תאימות
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                תמונות
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                ספקים
              </Tab>
              <Tab fontWeight="600" fontSize="sm" _selected={{ color: primary, borderColor: primary }}>
                הערות / קבצים
              </Tab>
            </TabList>

            <TabPanels>
              {/* טאב 1: כללי */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          שם המוצר
                        </FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="לדוגמה: זכוכית קדמית טרקטור"
                          borderRadius="lg"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מק״ט
                        </FormLabel>
                        <Input
                          value={formData.sku}
                          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                          placeholder="לדוגמה: JD-6430-FG"
                          borderRadius="lg"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          קטגוריה
                        </FormLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          borderRadius="lg"
                        >
                          <option value="">בחר קטגוריה</option>
                          <option value="זכוכיות טרקטורים">זכוכיות טרקטורים</option>
                          <option value="זכוכיות מחפרים">זכוכיות מחפרים</option>
                          <option value="זכוכיות מלגזות">זכוכיות מלגזות</option>
                          <option value="אביזרים">אביזרים</option>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          ברקוד
                        </FormLabel>
                        <Input
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
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="תיאור מפורט של המוצר..."
                      rows={4}
                      borderRadius="lg"
                    />
                  </FormControl>

                  <HStack spacing={4}>
                    <Checkbox colorScheme="orange">פריט פעיל</Checkbox>
                    <Checkbox colorScheme="orange">זמין להזמנה</Checkbox>
                    <Checkbox colorScheme="orange">מוצר מומלץ</Checkbox>
                  </HStack>
                </VStack>
              </TabPanel>

              {/* טאב 2: פרטים כספיים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מחיר מכירה
                        </FormLabel>
                        <NumberInput
                          value={formData.price}
                          onChange={(value) => setFormData({ ...formData, price: value })}
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
                          מחיר עלות
                        </FormLabel>
                        <NumberInput
                          value={formData.costPrice}
                          onChange={(value) => setFormData({ ...formData, costPrice: value })}
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
                          onChange={(value) => setFormData({ ...formData, taxRate: value })}
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
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
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
                          ₪{(formData.price - formData.costPrice).toFixed(2)}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color={secondaryText}>אחוז רווח</Text>
                        <Text fontSize="lg" fontWeight="bold" color={primary}>
                          {formData.costPrice > 0
                            ? ((((formData.price - formData.costPrice) / formData.costPrice) * 100).toFixed(1))
                            : 0}%
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color={secondaryText}>מחיר כולל מע״מ</Text>
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                          ₪{(formData.price * (1 + formData.taxRate / 100)).toFixed(2)}
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
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          כמות במלאי
                        </FormLabel>
                        <NumberInput
                          value={formData.stock}
                          onChange={(value) => setFormData({ ...formData, stock: value })}
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
                          מחסן
                        </FormLabel>
                        <Select
                          value={formData.warehouse}
                          onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
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
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מלאי מינימום
                        </FormLabel>
                        <NumberInput
                          value={formData.minStock}
                          onChange={(value) => setFormData({ ...formData, minStock: value })}
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
                          מלאי מקסימום
                        </FormLabel>
                        <NumberInput
                          value={formData.maxStock}
                          onChange={(value) => setFormData({ ...formData, maxStock: value })}
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
                    <Text fontSize="sm" fontWeight="600" color={textColor} mb={2}>
                      התראות מלאי
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <Checkbox colorScheme="orange">
                        שלח התראה כאשר המלאי נמוך מ-{formData.minStock} יחידות
                      </Checkbox>
                      <Checkbox colorScheme="orange">
                        שלח התראה כאשר המלאי מגיע ל-0
                      </Checkbox>
                      <Checkbox colorScheme="orange">
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
                      דגמי רכב תואמים
                    </FormLabel>
                    <HStack>
                      <Input
                        placeholder="הזן דגם רכב (לדוגמה: ג'ון דיר 6430)"
                        borderRadius="lg"
                      />
                      <IconButton
                        icon={<Plus size={18} />}
                        colorScheme="orange"
                        borderRadius="lg"
                        aria-label="הוסף דגם"
                      />
                    </HStack>
                  </FormControl>

                  <Box>
                    <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
                      דגמים תואמים
                    </Text>
                    <Stack spacing={2}>
                      {["ג'ון דיר 6430", "קייס IH 340", "מסי פרגוסון 6713"].map((model, idx) => (
                        <HStack
                          key={idx}
                          p={3}
                          bg={hoverBg}
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <Text fontSize="sm">{model}</Text>
                          <IconButton
                            icon={<X size={16} />}
                            size="sm"
                            variant="ghost"
                            aria-label="הסר"
                            color="red.500"
                          />
                        </HStack>
                      ))}
                    </Stack>
                  </Box>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      מידות (ס״מ)
                    </FormLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <Input placeholder="רוחב" borderRadius="lg" />
                      <Input placeholder="גובה" borderRadius="lg" />
                      <Input placeholder="עובי" borderRadius="lg" />
                    </Grid>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      משקל (ק״ג)
                    </FormLabel>
                    <Input placeholder="משקל המוצר" borderRadius="lg" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* טאב 5: תמונות */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Box
                    border="2px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    p={8}
                    textAlign="center"
                    cursor="pointer"
                    _hover={{ bg: hoverBg }}
                    transition="all 0.2s"
                  >
                    <VStack spacing={3}>
                      <Upload size={48} color={secondaryText} />
                      <Text fontSize="sm" fontWeight="600" color={textColor}>
                        גרור קבצים לכאן או לחץ לבחירה
                      </Text>
                      <Text fontSize="xs" color={secondaryText}>
                        PNG, JPG, GIF עד 10MB
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        variant="outline"
                        borderRadius="lg"
                      >
                        בחר תמונות
                      </Button>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
                      תמונות שהועלו
                    </Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                      {[1, 2, 3].map((img) => (
                        <Box
                          key={img}
                          position="relative"
                          borderRadius="lg"
                          overflow="hidden"
                          border="1px solid"
                          borderColor={borderColor}
                        >
                          <Box
                            h="150px"
                            bg={hoverBg}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color={secondaryText} fontSize="xs">
                              תמונה {img}
                            </Text>
                          </Box>
                          <IconButton
                            icon={<X size={16} />}
                            size="sm"
                            position="absolute"
                            top={2}
                            left={2}
                            colorScheme="red"
                            aria-label="מחק תמונה"
                          />
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 6: ספקים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      ספק ראשי
                    </FormLabel>
                    <Select borderRadius="lg">
                      <option value="">בחר ספק</option>
                      <option value="delta">דלתא גלאס</option>
                      <option value="pilkington">פילקינגטון</option>
                      <option value="saint-gobain">סנט גובן</option>
                      <option value="agsi">אגסי פלסט</option>
                    </Select>
                  </FormControl>

                  <Box>
                    <HStack justify="space-between" mb={3}>
                      <Text fontSize="sm" fontWeight="600" color={textColor}>
                        ספקים נוספים
                      </Text>
                      <Button
                        size="sm"
                        leftIcon={<Plus size={16} />}
                        variant="outline"
                        colorScheme="orange"
                        borderRadius="lg"
                      >
                        הוסף ספק
                      </Button>
                    </HStack>
                    <Stack spacing={3}>
                      {["פילקינגטון", "סנט גובן"].map((supplier, idx) => (
                        <HStack
                          key={idx}
                          p={3}
                          bg={hoverBg}
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="600">{supplier}</Text>
                            <Text fontSize="xs" color={secondaryText}>זמן אספקה: 3-5 ימים</Text>
                          </VStack>
                          <IconButton
                            icon={<X size={16} />}
                            size="sm"
                            variant="ghost"
                            aria-label="הסר"
                            color="red.500"
                          />
                        </HStack>
                      ))}
                    </Stack>
                  </Box>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      מק״ט אצל הספק
                    </FormLabel>
                    <Input
                      placeholder="מק״ט המוצר אצל הספק"
                      borderRadius="lg"
                    />
                  </FormControl>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                        כמות הזמנה מינימלית
                      </FormLabel>
                      <NumberInput min={1} defaultValue={1}>
                        <NumberInputField borderRadius="lg" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                        זמן אספקה (ימים)
                      </FormLabel>
                      <NumberInput min={1} defaultValue={3}>
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

              {/* טאב 7: הערות / קבצים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      הערות פנימיות
                    </FormLabel>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="הערות פנימיות למוצר..."
                      rows={6}
                      borderRadius="lg"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      קבצים מצורפים
                    </FormLabel>
                    <Box
                      border="2px dashed"
                      borderColor={borderColor}
                      borderRadius="lg"
                      p={6}
                      textAlign="center"
                      cursor="pointer"
                      _hover={{ bg: hoverBg }}
                    >
                      <VStack spacing={2}>
                        <Upload size={32} color={secondaryText} />
                        <Text fontSize="sm" color={textColor}>
                          העלה קבצים (PDF, DOC, XLS)
                        </Text>
                        <Button size="sm" variant="outline" colorScheme="orange" borderRadius="lg">
                          בחר קבצים
                        </Button>
                      </VStack>
                    </Box>
                  </FormControl>

                  <Box>
                    <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
                      קבצים שהועלו
                    </Text>
                    <Stack spacing={2}>
                      {["מפרט טכני.pdf", "תעודת אישור.pdf"].map((file, idx) => (
                        <HStack
                          key={idx}
                          p={3}
                          bg={hoverBg}
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <Text fontSize="sm">{file}</Text>
                          <HStack>
                            <Button size="xs" variant="ghost">הורד</Button>
                            <IconButton
                              icon={<X size={14} />}
                              size="xs"
                              variant="ghost"
                              aria-label="מחק"
                              color="red.500"
                            />
                          </HStack>
                        </HStack>
                      ))}
                    </Stack>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor={borderColor}>
          <HStack spacing={3}>
            <Button
              colorScheme="orange"
              bg={primary}
              px={8}
              borderRadius="full"
              onClick={handleSave}
            >
              שמור
            </Button>
            <Button
              variant="outline"
              px={8}
              borderRadius="full"
              onClick={onClose}
            >
              ביטול
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
