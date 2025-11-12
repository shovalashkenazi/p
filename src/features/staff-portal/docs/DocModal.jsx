import React, { useState } from "react";
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
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { MapPin, Plus, X, Upload } from "lucide-react";

const DocModal = ({ isOpen, onClose, doc }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  const [formData, setFormData] = useState({
    // פרטי רכב
    manufacturer: doc?.manufacturer || "",
    model: doc?.model || "",
    year: doc?.year || "",
    vehicleType: doc?.vehicleType || "",
    chassisNumber: doc?.chassisNumber || "",
    vehicleNumber: doc?.vehicleNumber || "",

    // מיקום ביצוע העבודה
    deliveryDate: doc?.deliveryDate || "",
    city: doc?.city || "",
    fullAddress: doc?.fullAddress || "",
    street: doc?.street || "",
    buildingNumber: doc?.buildingNumber || "",
    arrivalTime: doc?.arrivalTime || "",
    locationNotes: doc?.locationNotes || "",
    locationUrl: doc?.locationUrl || "",

    // פרטי לקוח
    clientType: doc?.clientType || "business",
    companyName: doc?.companyName || "",
    companyId: doc?.companyId || "",
    phone: doc?.phone || "",
    address: doc?.address || "",
    clientCity: doc?.clientCity || "",
    email: doc?.email || "",
    zipCode: doc?.zipCode || "",
    country: doc?.country || "ישראל",

    // מפעיל כללי
    mainContactName: doc?.mainContactName || "",
    mainContactPhone: doc?.mainContactPhone || "",
    mainContactEmail: doc?.mainContactEmail || "",

    // פרטים לחיוב
    selectedClientForBilling: doc?.selectedClientForBilling || false,

    // הערות לקוח
    clientNotes: doc?.clientNotes || "",
  });

  // Additional contacts management
  const [additionalContacts, setAdditionalContacts] = useState([
    { id: 1, name: "", phone: "", email: "" },
  ]);

  const addContact = () => {
    setAdditionalContacts([
      ...additionalContacts,
      { id: Date.now(), name: "", phone: "", email: "" },
    ]);
  };

  const removeContact = (id) => {
    setAdditionalContacts(additionalContacts.filter((c) => c.id !== id));
  };

  const handleSubmit = () => {
    console.log("שמירת מסמך:", formData);
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
          {doc ? "עריכת מסמך" : "יצירת מסמך חדש"}
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
                סקירה כללית
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
                פריטים
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
                יומן פעילות
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
                מסמכים
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
                דוח נזקים
              </Tab>
            </TabList>

            <TabPanels>
              {/* טאב 1: סקירה כללית */}
              <TabPanel p={6}>
                <VStack spacing={8} align="stretch">
                  {/* 1. פרטי רכב */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      פרטי רכב
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            יצרן
                          </FormLabel>
                          <Input
                            value={formData.manufacturer}
                            onChange={(e) =>
                              setFormData({ ...formData, manufacturer: e.target.value })
                            }
                            placeholder="לדוגמה: קטרפילר"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            דגם
                          </FormLabel>
                          <Input
                            value={formData.model}
                            onChange={(e) =>
                              setFormData({ ...formData, model: e.target.value })
                            }
                            placeholder="לדוגמה: 320D"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שנה
                          </FormLabel>
                          <Input
                            type="number"
                            value={formData.year}
                            onChange={(e) =>
                              setFormData({ ...formData, year: e.target.value })
                            }
                            placeholder="2024"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            סוג הרכב
                          </FormLabel>
                          <Select
                            value={formData.vehicleType}
                            onChange={(e) =>
                              setFormData({ ...formData, vehicleType: e.target.value })
                            }
                            borderRadius="lg"
                            bg={bgColor}
                          >
                            <option value="">בחר סוג רכב</option>
                            <option value="טרקטור">טרקטור</option>
                            <option value="מחפר">מחפר</option>
                            <option value="מעמיס">מעמיס</option>
                            <option value="מנוף">מנוף</option>
                            <option value="משאית">משאית</option>
                          </Select>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מס׳ שלדה
                          </FormLabel>
                          <Input
                            value={formData.chassisNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, chassisNumber: e.target.value })
                            }
                            placeholder="מספר שלדה ייחודי"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מס׳ רכב
                          </FormLabel>
                          <Input
                            value={formData.vehicleNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, vehicleNumber: e.target.value })
                            }
                            placeholder="12-345-67"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>

                  {/* 2. מיקום ביצוע העבודה */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      מיקום ביצוע העבודה
                    </Text>
                    <VStack spacing={4} align="stretch">
                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              תאריך משלוח
                            </FormLabel>
                            <Input
                              type="date"
                              value={formData.deliveryDate}
                              onChange={(e) =>
                                setFormData({ ...formData, deliveryDate: e.target.value })
                              }
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              עיר
                            </FormLabel>
                            <Input
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                              }
                              placeholder="לדוגמה: תל אביב"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              שעת הגעה
                            </FormLabel>
                            <Input
                              type="time"
                              value={formData.arrivalTime}
                              onChange={(e) =>
                                setFormData({ ...formData, arrivalTime: e.target.value })
                              }
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          חיפוש כתובת מלאה
                        </FormLabel>
                        <Input
                          value={formData.fullAddress}
                          onChange={(e) =>
                            setFormData({ ...formData, fullAddress: e.target.value })
                          }
                          placeholder="הקלד כתובת מלאה"
                          borderRadius="lg"
                          bg={bgColor}
                        />
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              רחוב
                            </FormLabel>
                            <Input
                              value={formData.street}
                              onChange={(e) =>
                                setFormData({ ...formData, street: e.target.value })
                              }
                              placeholder="שם הרחוב"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              מספר בניין
                            </FormLabel>
                            <Input
                              value={formData.buildingNumber}
                              onChange={(e) =>
                                setFormData({ ...formData, buildingNumber: e.target.value })
                              }
                              placeholder="מספר"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          הערות (אם יש בשורה)
                        </FormLabel>
                        <Textarea
                          value={formData.locationNotes}
                          onChange={(e) =>
                            setFormData({ ...formData, locationNotes: e.target.value })
                          }
                          placeholder="הערות נוספות על המיקום"
                          borderRadius="lg"
                          bg={bgColor}
                          rows={2}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          מיקום בשטח
                        </FormLabel>
                        <HStack>
                          <Input
                            value={formData.locationUrl}
                            onChange={(e) =>
                              setFormData({ ...formData, locationUrl: e.target.value })
                            }
                            placeholder="https://maps.google.com/?q=..."
                            borderRadius="lg"
                            bg={bgColor}
                          />
                          <Button
                            leftIcon={<MapPin size={16} />}
                            colorScheme="blue"
                            variant="outline"
                            borderRadius="lg"
                            minW="140px"
                            onClick={() => {
                              if (formData.locationUrl) {
                                window.open(formData.locationUrl, "_blank");
                              }
                            }}
                          >
                            פתח במפות
                          </Button>
                        </HStack>
                      </FormControl>
                    </VStack>
                  </Box>

                  {/* 3. פרטי לקוח */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      פרטי לקוח
                    </Text>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          סוג לקוח
                        </FormLabel>
                        <Select
                          value={formData.clientType}
                          onChange={(e) =>
                            setFormData({ ...formData, clientType: e.target.value })
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
                              שם חברה
                            </FormLabel>
                            <Input
                              value={formData.companyName}
                              onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                              }
                              placeholder="שם החברה / שם פרטי"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              ח.פ חברה / ת.ז
                            </FormLabel>
                            <Input
                              value={formData.companyId}
                              onChange={(e) =>
                                setFormData({ ...formData, companyId: e.target.value })
                              }
                              placeholder="514567890"
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
                              אימייל
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

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                          כתובת
                        </FormLabel>
                        <Input
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          placeholder="רחוב ומספר"
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
                              value={formData.clientCity}
                              onChange={(e) =>
                                setFormData({ ...formData, clientCity: e.target.value })
                              }
                              placeholder="עיר"
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

                  {/* 4. צוות מטפל */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      צוות מטפל
                    </Text>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px dashed"
                      borderColor={borderColor}
                      textAlign="center"
                    >
                      <Text fontSize="sm" color={secondaryText}>
                        לא הוקצו אנשי צוות למסמך זה
                      </Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="orange"
                        mt={2}
                        leftIcon={<Plus size={16} />}
                      >
                        הוסף איש צוות
                      </Button>
                    </Box>
                  </Box>

                  {/* 5. מפעיל כללי */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      מפעיל כללי
                    </Text>
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="md" fontWeight="600" color={textColor}>
                        איש קשר ראשי
                      </Text>
                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                              שם מלא
                            </FormLabel>
                            <Input
                              value={formData.mainContactName}
                              onChange={(e) =>
                                setFormData({ ...formData, mainContactName: e.target.value })
                              }
                              placeholder="שם איש הקשר"
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
                              value={formData.mainContactPhone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  mainContactPhone: e.target.value,
                                })
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
                              אימייל
                            </FormLabel>
                            <Input
                              type="email"
                              value={formData.mainContactEmail}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  mainContactEmail: e.target.value,
                                })
                              }
                              placeholder="email@example.com"
                              borderRadius="lg"
                              bg={bgColor}
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>

                      <Divider my={2} />

                      <HStack justify="space-between">
                        <Text fontSize="md" fontWeight="600" color={textColor}>
                          אנשי קשר נוספים
                        </Text>
                        <Button
                          size="sm"
                          leftIcon={<Plus size={16} />}
                          colorScheme="orange"
                          variant="ghost"
                          onClick={addContact}
                        >
                          הוסף איש קשר
                        </Button>
                      </HStack>

                      {additionalContacts.map((contact) => (
                        <Box
                          key={contact.id}
                          p={4}
                          bg={bgColor}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={borderColor}
                        >
                          <HStack justify="space-between" mb={3}>
                            <Text fontSize="sm" fontWeight="600" color={secondaryText}>
                              איש קשר נוסף
                            </Text>
                            <IconButton
                              icon={<X size={16} />}
                              size="xs"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => removeContact(contact.id)}
                            />
                          </HStack>
                          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                            <GridItem>
                              <Input
                                placeholder="שם מלא"
                                borderRadius="lg"
                                size="sm"
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                placeholder="טלפון"
                                borderRadius="lg"
                                size="sm"
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                type="email"
                                placeholder="אימייל"
                                borderRadius="lg"
                                size="sm"
                              />
                            </GridItem>
                          </Grid>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  {/* 6. פרטים לחיוב */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      פרטים לחיוב
                    </Text>
                    <Checkbox
                      isChecked={formData.selectedClientForBilling}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          selectedClientForBilling: e.target.checked,
                        })
                      }
                      colorScheme="orange"
                    >
                      <Text fontSize="sm" color={textColor}>
                        חייב את הלקוח שנבחר בפרטי לקוח
                      </Text>
                    </Checkbox>
                  </Box>

                  {/* 7. הערות לקוח */}
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
                      הערות לקוח
                    </Text>
                    <FormControl>
                      <Textarea
                        value={formData.clientNotes}
                        onChange={(e) =>
                          setFormData({ ...formData, clientNotes: e.target.value })
                        }
                        placeholder="הוסף הערות נוספות עבור הלקוח..."
                        borderRadius="lg"
                        bg={bgColor}
                        rows={4}
                      />
                    </FormControl>
                  </Box>
                </VStack>
              </TabPanel>

              {/* טאב 2: פריטים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    רשימת פריטים
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    הוסף פריטים למסמך זה
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    הוסף פריט
                  </Button>
                </Box>
              </TabPanel>

              {/* טאב 3: הערות */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    הערות למסמך
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    אזור זה ישמש להערות פנימיות
                  </Text>
                </Box>
              </TabPanel>

              {/* טאב 4: יומן פעילות */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    יומן פעילות
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    היסטוריית שינויים ופעולות על המסמך
                  </Text>
                </Box>
              </TabPanel>

              {/* טאב 5: מסמכים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    מסמכים מצורפים
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    העלה קבצים ומסמכים רלוונטיים
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

              {/* טאב 6: דוח נזקים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    דוח נזקים
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    תיעוד נזקים והערות תיקון
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* Footer with action buttons */}
        <Box
          p={6}
          borderTop="1px solid"
          borderColor={borderColor}
          bg={bgColor}
        >
          <HStack justify="flex-end" spacing={3}>
            <Button
              variant="outline"
              borderRadius="full"
              onClick={onClose}
              px={6}
            >
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
              שמור מסמך
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default DocModal;
