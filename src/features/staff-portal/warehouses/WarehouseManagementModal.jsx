import { useState } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Switch,
  Textarea,
} from "@chakra-ui/react";

const WarehouseManagementModal = ({ isOpen, onClose, warehouse }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const [formData, setFormData] = useState({
    warehouseNumber: warehouse?.warehouseNumber || "",
    name: warehouse?.name || "",
    address: warehouse?.address || "",
    type: warehouse?.type || "מקומי",
    manager: warehouse?.manager || "",
    phone: warehouse?.phone || "",
    email: warehouse?.email || "",
    isActive: warehouse?.isActive !== false,
    notes: warehouse?.notes || "",
  });

  // מוצרים לדוגמה במחסן
  const productsInWarehouse = [
    {
      id: 1,
      productCode: "PROD-001",
      productName: "חלון PVC כפול",
      category: "חלונות",
      quantity: 45,
      minStock: 20,
      location: "A-01-03",
    },
    {
      id: 2,
      productCode: "PROD-002",
      productName: "מראת צד ימין",
      category: "מראות",
      quantity: 12,
      minStock: 10,
      location: "B-02-05",
    },
    {
      id: 3,
      productCode: "PROD-003",
      productName: "פנס קדמי LED",
      category: "פנסים",
      quantity: 28,
      minStock: 15,
      location: "C-03-07",
    },
    {
      id: 4,
      productCode: "PROD-004",
      productName: "זכוכית שמשה קדמית",
      category: "זכוכיות",
      quantity: 8,
      minStock: 5,
      location: "A-01-08",
    },
    {
      id: 5,
      productCode: "PROD-005",
      productName: "חלון הזזה אלומיניום",
      category: "חלונות",
      quantity: 33,
      minStock: 20,
      location: "A-02-01",
    },
    {
      id: 6,
      productCode: "PROD-006",
      productName: "מראת צד שמאל",
      category: "מראות",
      quantity: 15,
      minStock: 10,
      location: "B-02-06",
    },
    {
      id: 7,
      productCode: "PROD-007",
      productName: "פנס אחורי",
      category: "פנסים",
      quantity: 22,
      minStock: 15,
      location: "C-03-08",
    },
    {
      id: 8,
      productCode: "PROD-008",
      productName: "זכוכית דלת",
      category: "זכוכיות",
      quantity: 6,
      minStock: 5,
      location: "A-01-09",
    },
  ];

  const getStockBadge = (quantity, minStock) => {
    if (quantity <= minStock) {
      return (
        <Badge colorScheme="red" fontSize="xs">
          מלאי נמוך
        </Badge>
      );
    }
    return (
      <Badge colorScheme="green" fontSize="xs">
        תקין
      </Badge>
    );
  };

  const handleSave = () => {
    console.log("שמירת מחסן:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" dir="rtl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        maxW="1200px"
        maxH="90vh"
        m={4}
        bg={bgColor}
        borderRadius="2xl"
        boxShadow="2xl"
        overflow="hidden"
      >
        <ModalHeader
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
          px={8}
        >
          <HStack justify="space-between">
            <Box>
              <Text fontSize="2xl" fontWeight="700" color={textColor}>
                {warehouse ? "עריכת מחסן" : "יצירת מחסן חדש"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                הזן את פרטי המחסן ונהל את המוצרים במחסן
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
          <Tabs colorScheme="orange" isLazy>
            <TabList
              px={8}
              pt={4}
              borderBottom="2px solid"
              borderColor={borderColor}
            >
              <Tab
                fontWeight="600"
                fontSize="md"
                _selected={{
                  color: primary,
                  borderColor: primary,
                }}
              >
                פרטים כלליים
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="md"
                _selected={{
                  color: primary,
                  borderColor: primary,
                }}
              >
                מוצרים במחסן
              </Tab>
              <Tab
                fontWeight="600"
                fontSize="md"
                _selected={{
                  color: primary,
                  borderColor: primary,
                }}
              >
                (שמורה להרחבה)
              </Tab>
            </TabList>

            <TabPanels>
              {/* Tab 1: פרטים כלליים */}
              <TabPanel p={8}>
                <VStack spacing={6} align="stretch">
                  {/* שורה 1 */}
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מספר מחסן
                        </FormLabel>
                        <Input
                          placeholder="WH-001"
                          value={formData.warehouseNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              warehouseNumber: e.target.value,
                            })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          שם המחסן
                        </FormLabel>
                        <Input
                          placeholder="מחסן ראשי"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          סוג מחסן
                        </FormLabel>
                        <Select
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        >
                          <option value="מרכזי">מרכזי</option>
                          <option value="אזורי">אזורי</option>
                          <option value="מקומי">מקומי</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* שורה 2 */}
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      כתובת מחסן
                    </FormLabel>
                    <Input
                      placeholder="רחוב, עיר, מיקוד"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      borderColor={borderColor}
                      _focus={{
                        borderColor: primary,
                        boxShadow: `0 0 0 1px ${primary}`,
                      }}
                    />
                  </FormControl>

                  {/* שורה 3 */}
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מנהל מחסן
                        </FormLabel>
                        <Input
                          placeholder="שם מלא"
                          value={formData.manager}
                          onChange={(e) =>
                            setFormData({ ...formData, manager: e.target.value })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          טלפון
                        </FormLabel>
                        <Input
                          placeholder="050-1234567"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          אימייל
                        </FormLabel>
                        <Input
                          placeholder="warehouse@example.com"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          borderColor={borderColor}
                          _focus={{
                            borderColor: primary,
                            boxShadow: `0 0 0 1px ${primary}`,
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* שורה 4 */}
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                      הערות
                    </FormLabel>
                    <Textarea
                      placeholder="הערות נוספות על המחסן..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      borderColor={borderColor}
                      rows={4}
                      _focus={{
                        borderColor: primary,
                        boxShadow: `0 0 0 1px ${primary}`,
                      }}
                    />
                  </FormControl>

                  {/* שורה 5 */}
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      htmlFor="warehouse-active"
                      mb="0"
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                    >
                      מחסן פעיל
                    </FormLabel>
                    <Switch
                      id="warehouse-active"
                      colorScheme="orange"
                      isChecked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Tab 2: מוצרים במחסן */}
              <TabPanel p={0}>
                <Box
                  overflowY="auto"
                  maxH="500px"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#CBD5E0",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#A0AEC0",
                    },
                  }}
                >
                  <Table variant="simple">
                    <Thead bg={stripedBg} position="sticky" top={0} zIndex={1}>
                      <Tr>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          מק״ט
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          שם מוצר
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          קטגוריה
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          כמות
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          מינימום
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          מיקום
                        </Th>
                        <Th
                          textAlign="right"
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                          textTransform="none"
                          borderColor={borderColor}
                          py={4}
                          whiteSpace="nowrap"
                        >
                          סטטוס
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {productsInWarehouse.map((product, index) => (
                        <Tr
                          key={product.id}
                          bg={index % 2 === 0 ? bgColor : stripedBg}
                          _hover={{ bg: hoverBg }}
                          transition="background 0.2s"
                        >
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" fontWeight="600" color={textColor}>
                              {product.productCode}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" color={textColor}>
                              {product.productName}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" color={secondaryText}>
                              {product.category}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" fontWeight="600" color={primary}>
                              {product.quantity}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" color={secondaryText}>
                              {product.minStock}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            <Text fontSize="sm" color={secondaryText}>
                              {product.location}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor} py={3}>
                            {getStockBadge(product.quantity, product.minStock)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Tab 3: שמורה להרחבה */}
              <TabPanel p={8}>
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  p={12}
                  textAlign="center"
                  border="2px dashed"
                  borderColor={borderColor}
                >
                  <Text fontSize="xl" fontWeight="600" color={textColor} mb={2}>
                    טאב זה שמור להרחבה עתידית
                  </Text>
                  <Text fontSize="md" color={secondaryText}>
                    ניתן להוסיף כאן תכונות נוספות בעתיד
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* Footer with Action Buttons */}
        <Box
          borderTop="1px solid"
          borderColor={borderColor}
          p={6}
          bg={cardBg}
        >
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
            >
              שמור מחסן
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
              onClick={onClose}
            >
              ביטול
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default WarehouseManagementModal;
