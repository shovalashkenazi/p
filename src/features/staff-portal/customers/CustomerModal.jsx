import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
  Switch,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { Plus, X, Upload } from "lucide-react";

const CustomerModal = ({ isOpen, onClose, customer }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [formData, setFormData] = useState({
    // פרטים בסיסיים
    customerType: customer?.type || "business",
    name: customer?.name || "",
    businessId: customer?.businessId || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    address: customer?.address || "",
    city: customer?.city || "",
    zipCode: customer?.zipCode || "",
    country: customer?.country || "ישראל",

    // פרטים נוספים
    website: customer?.website || "",
    fax: customer?.fax || "",
    bankName: customer?.bankName || "",
    bankBranch: customer?.bankBranch || "",
    bankAccount: customer?.bankAccount || "",
    paymentTerms: customer?.paymentTerms || "30",
    creditLimit: customer?.creditLimit || "",
    discount: customer?.discount || "",

    // הערות
    notes: customer?.notes || "",

    // הרשאות
    canViewPrices: customer?.canViewPrices || true,
    canPlaceOrders: customer?.canPlaceOrders || true,
    canViewDocuments: customer?.canViewDocuments || true,
    isActive: customer?.isActive || true,
  });

  // Additional contacts management
  const [contacts, setContacts] = useState([
    { id: 1, name: "", role: "", phone: "", email: "" },
  ]);

  const addContact = () => {
    setContacts([...contacts, { id: Date.now(), name: "", role: "", phone: "", email: "" }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleSubmit = () => {
    console.log("שמירת לקוח:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent dir="rtl" maxH="90vh">
        <ModalHeader
          borderBottom="1px solid"
          borderColor={borderColor}
          fontSize="2xl"
          fontWeight="700"
          color={textColor}
        >
          {customer ? "עריכת לקוח" : "יצירת לקוח חדש"}
        </ModalHeader>
        <ModalCloseButton top={4} left={4} />

        <ModalBody p={0}>
          <Tabs colorScheme="orange" isLazy>
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
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                פרטים בסיסיים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                פרטים נוספים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                הערות
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                אנשי קשר
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                משתמשים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                כלים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                מנויים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                הרשאות
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                היסטוריית מסמכים
              </Tab>
              <Tab
                fontSize="sm"
                fontWeight="600"
                _selected={{
                  color: primary,
                  borderColor: primary,
                  borderBottomWidth: "3px",
                }}
              >
                קבצים מצורפים
              </Tab>
            </TabList>

            <TabPanels>
              {/* טאב 1: פרטים בסיסיים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      מידע כללי
                    </Text>
                    <VStack spacing={4} align="stretch">
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          סוג לקוח
                        </FormLabel>
                        <Select
                          value={formData.customerType}
                          onChange={(e) =>
                            setFormData({ ...formData, customerType: e.target.value })
                          }
                          borderRadius="lg"
                          bg={bgColor}
                        >
                          <option value="business">עסקי</option>
                          <option value="private">פרטי</option>
                        </Select>
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              {formData.customerType === "business"
                                ? "שם החברה"
                                : "שם מלא"}
                            </FormLabel>
                            <Input
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder="שם הלקוח"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              {formData.customerType === "business"
                                ? "ח.פ / ע״מ"
                                : "ת.ז"}
                            </FormLabel>
                            <Input
                              value={formData.businessId}
                              onChange={(e) =>
                                setFormData({ ...formData, businessId: e.target.value })
                              }
                              placeholder="מספר זיהוי"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              טלפון
                            </FormLabel>
                            <Input
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              placeholder="050-1234567"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              דוא״ל
                            </FormLabel>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              placeholder="email@example.com"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>
                    </VStack>
                  </Box>

                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      כתובת
                    </Text>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          כתובת מלאה
                        </FormLabel>
                        <Input
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          placeholder="רחוב ומספר בית"
                          borderRadius="lg"
                          bg={bgColor}
                        />
                      </FormControl>

                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              עיר
                            </FormLabel>
                            <Input
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                              }
                              placeholder="תל אביב"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              מיקוד
                            </FormLabel>
                            <Input
                              value={formData.zipCode}
                              onChange={(e) =>
                                setFormData({ ...formData, zipCode: e.target.value })
                              }
                              placeholder="1234567"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              מדינה
                            </FormLabel>
                            <Input
                              value={formData.country}
                              onChange={(e) =>
                                setFormData({ ...formData, country: e.target.value })
                              }
                              placeholder="ישראל"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 2: פרטים נוספים */}
              <TabPanel p={6}>
                <VStack spacing={6} align="stretch">
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      פרטי תקשורת נוספים
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            אתר אינטרנט
                          </FormLabel>
                          <Input
                            value={formData.website}
                            onChange={(e) =>
                              setFormData({ ...formData, website: e.target.value })
                            }
                            placeholder="https://example.com"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            פקס
                          </FormLabel>
                          <Input
                            value={formData.fax}
                            onChange={(e) =>
                              setFormData({ ...formData, fax: e.target.value })
                            }
                            placeholder="03-1234567"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      פרטי בנק
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שם הבנק
                          </FormLabel>
                          <Input
                            value={formData.bankName}
                            onChange={(e) =>
                              setFormData({ ...formData, bankName: e.target.value })
                            }
                            placeholder="בנק לאומי"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מספר סניף
                          </FormLabel>
                          <Input
                            value={formData.bankBranch}
                            onChange={(e) =>
                              setFormData({ ...formData, bankBranch: e.target.value })
                            }
                            placeholder="123"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מספר חשבון
                          </FormLabel>
                          <Input
                            value={formData.bankAccount}
                            onChange={(e) =>
                              setFormData({ ...formData, bankAccount: e.target.value })
                            }
                            placeholder="123456"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      תנאי תשלום
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            תנאי תשלום (ימים)
                          </FormLabel>
                          <Select
                            value={formData.paymentTerms}
                            onChange={(e) =>
                              setFormData({ ...formData, paymentTerms: e.target.value })
                            }
                            borderRadius="lg"
                            bg={bgColor}
                          >
                            <option value="0">תשלום מיידי</option>
                            <option value="30">שוטף + 30</option>
                            <option value="60">שוטף + 60</option>
                            <option value="90">שוטף + 90</option>
                          </Select>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מסגרת אשראי
                          </FormLabel>
                          <Input
                            type="number"
                            value={formData.creditLimit}
                            onChange={(e) =>
                              setFormData({ ...formData, creditLimit: e.target.value })
                            }
                            placeholder="50000"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            אחוז הנחה
                          </FormLabel>
                          <Input
                            type="number"
                            value={formData.discount}
                            onChange={(e) =>
                              setFormData({ ...formData, discount: e.target.value })
                            }
                            placeholder="5"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 3: הערות */}
              <TabPanel p={6}>
                <Box
                  bg={cardBg}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                    הערות כלליות
                  </Text>
                  <FormControl>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="הוסף הערות נוספות על הלקוח..."
                      borderRadius="lg"
                      bg={bgColor}
                      rows={10}
                    />
                  </FormControl>
                </Box>
              </TabPanel>

              {/* טאב 4: אנשי קשר */}
              <TabPanel p={6}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="700" color={textColor}>
                      אנשי קשר
                    </Text>
                    <Button
                      leftIcon={<Plus size={16} />}
                      colorScheme="orange"
                      size="sm"
                      borderRadius="full"
                      onClick={addContact}
                    >
                      הוסף איש קשר
                    </Button>
                  </HStack>

                  {contacts.map((contact) => (
                    <Box
                      key={contact.id}
                      bg={cardBg}
                      p={6}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <HStack justify="space-between" mb={4}>
                        <Text fontSize="md" fontWeight="600" color={textColor}>
                          איש קשר
                        </Text>
                        <IconButton
                          icon={<X size={16} />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeContact(contact.id)}
                        />
                      </HStack>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              שם מלא
                            </FormLabel>
                            <Input
                              placeholder="שם איש הקשר"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              תפקיד
                            </FormLabel>
                            <Input
                              placeholder="מנהל רכש"
                              borderRadius="lg"
                              bg={bgColor}
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
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              דוא״ל
                            </FormLabel>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>

              {/* טאב 5: משתמשים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    משתמשי מערכת
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    ניהול משתמשים המשויכים ללקוח זה
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    הוסף משתמש
                  </Button>
                </Box>
              </TabPanel>

              {/* טאב 6: כלים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    כלים ורכב
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    רשימת הכלים והרכבים השייכים ללקוח
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    הוסף כלי
                  </Button>
                </Box>
              </TabPanel>

              {/* טאב 7: מנויים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    מנויים פעילים
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    חבילות מנוי ושירותים חוזרים
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    הוסף מנוי
                  </Button>
                </Box>
              </TabPanel>

              {/* טאב 8: הרשאות */}
              <TabPanel p={6}>
                <Box
                  bg={cardBg}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="lg" fontWeight="700" color={textColor} mb={6}>
                    הגדרות הרשאות
                  </Text>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between" p={4} bg={bgColor} borderRadius="lg">
                      <Box>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          לקוח פעיל
                        </Text>
                        <Text fontSize="xs" color={secondaryText}>
                          האם הלקוח פעיל במערכת
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="orange"
                        size="lg"
                        isChecked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                      />
                    </HStack>

                    <Divider />

                    <HStack justify="space-between" p={4} bg={bgColor} borderRadius="lg">
                      <Box>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          צפייה במחירים
                        </Text>
                        <Text fontSize="xs" color={secondaryText}>
                          האם הלקוח יכול לצפות במחירי מוצרים
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="orange"
                        size="lg"
                        isChecked={formData.canViewPrices}
                        onChange={(e) =>
                          setFormData({ ...formData, canViewPrices: e.target.checked })
                        }
                      />
                    </HStack>

                    <HStack justify="space-between" p={4} bg={bgColor} borderRadius="lg">
                      <Box>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          ביצוע הזמנות
                        </Text>
                        <Text fontSize="xs" color={secondaryText}>
                          האם הלקוח יכול לבצע הזמנות
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="orange"
                        size="lg"
                        isChecked={formData.canPlaceOrders}
                        onChange={(e) =>
                          setFormData({ ...formData, canPlaceOrders: e.target.checked })
                        }
                      />
                    </HStack>

                    <HStack justify="space-between" p={4} bg={bgColor} borderRadius="lg">
                      <Box>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          צפייה במסמכים
                        </Text>
                        <Text fontSize="xs" color={secondaryText}>
                          האם הלקוח יכול לצפות במסמכים שלו
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="orange"
                        size="lg"
                        isChecked={formData.canViewDocuments}
                        onChange={(e) =>
                          setFormData({ ...formData, canViewDocuments: e.target.checked })
                        }
                      />
                    </HStack>
                  </VStack>
                </Box>
              </TabPanel>

              {/* טאב 9: היסטוריית מסמכים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    מסמכים קודמים
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    היסטוריה מלאה של כל המסמכים והעסקאות עם הלקוח
                  </Text>
                  {customer && (
                    <Badge colorScheme="blue" mt={4} px={4} py={2} borderRadius="full">
                      אין מסמכים להצגה
                    </Badge>
                  )}
                </Box>
              </TabPanel>

              {/* טאב 10: קבצים מצורפים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    קבצים וצרופות
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    מסמכים, תמונות וקבצים רלוונטיים ללקוח
                  </Text>
                  <Button
                    leftIcon={<Upload size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    העלה קובץ
                  </Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* Footer with action buttons */}
        <Box p={6} borderTop="1px solid" borderColor={borderColor} bg={bgColor}>
          <HStack justify="flex-end" spacing={3}>
            <Button variant="outline" borderRadius="full" onClick={onClose} px={6}>
              ביטול
            </Button>
            <Button
              bg={primary}
              color="white"
              borderRadius="full"
              px={6}
              _hover={{ bg: "primary.200" }}
              onClick={handleSubmit}
            >
              שמור לקוח
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CustomerModal;
