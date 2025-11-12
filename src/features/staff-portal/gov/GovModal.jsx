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
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Plus, Upload } from "lucide-react";

const GovModal = ({ isOpen, onClose, vehicle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [formData, setFormData] = useState({
    // פרטי רכב - 18 שדות
    vehicleNumber: vehicle?.vehicleNumber || "",
    chassisNumber: vehicle?.chassisNumber || "",
    manufacturerName: vehicle?.manufacturer || "",
    modelName: vehicle?.model || "",
    yearOfManufacture: vehicle?.year || "",
    productCode: vehicle?.productCode || "",
    vehicleTypeCode: vehicle?.vehicleTypeCode || "",
    vehicleTypeName: vehicle?.vehicleTypeName || "",
    engineCode: vehicle?.engineCode || "",
    engineName: vehicle?.engineName || "",
    registrationDate: vehicle?.registrationDate || "",
    horsePower: vehicle?.horsePower || "",
    weight: vehicle?.weight || "",
    expiryDate: vehicle?.expiryDate || "",
    totalWeight: vehicle?.totalWeight || "",
    liftingCapacity: vehicle?.liftingCapacity || "",
    restrictionCode: vehicle?.restrictionCode || "",
    restrictionName: vehicle?.restrictionName || "",
  });

  const handleSubmit = () => {
    console.log("שמירת כלי:", formData);
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
          {vehicle ? "עריכת כלי" : "יצירת כלי חדש"}
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
                פרטי הרכב
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
                לקוחות
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
                ביטוחים
              </Tab>
            </TabList>

            <TabPanels>
              {/* טאב 1: פרטי הרכב - 18 שדות */}
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
                      נתוני זיהוי בסיסיים
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מספר רכב
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

                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            מספר שלדה
                          </FormLabel>
                          <Input
                            value={formData.chassisNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, chassisNumber: e.target.value })
                            }
                            placeholder="CAT320D2024001"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            קוד תוצר
                          </FormLabel>
                          <Input
                            value={formData.productCode}
                            onChange={(e) =>
                              setFormData({ ...formData, productCode: e.target.value })
                            }
                            placeholder="קוד תוצר"
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
                      יצרן ודגם
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שם תוצר (יצרן)
                          </FormLabel>
                          <Input
                            value={formData.manufacturerName}
                            onChange={(e) =>
                              setFormData({ ...formData, manufacturerName: e.target.value })
                            }
                            placeholder="קטרפילר"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שם דגם
                          </FormLabel>
                          <Input
                            value={formData.modelName}
                            onChange={(e) =>
                              setFormData({ ...formData, modelName: e.target.value })
                            }
                            placeholder="320D"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שנת יצור
                          </FormLabel>
                          <Input
                            type="number"
                            value={formData.yearOfManufacture}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearOfManufacture: e.target.value,
                              })
                            }
                            placeholder="2020"
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
                      סיווג וסוג כלי
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            סוג תוצר (קוד)
                          </FormLabel>
                          <Input
                            value={formData.vehicleTypeCode}
                            onChange={(e) =>
                              setFormData({ ...formData, vehicleTypeCode: e.target.value })
                            }
                            placeholder="קוד סוג תוצר"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            סוג תוצר (שם)
                          </FormLabel>
                          <Input
                            value={formData.vehicleTypeName}
                            onChange={(e) =>
                              setFormData({ ...formData, vehicleTypeName: e.target.value })
                            }
                            placeholder="שם סוג תוצר"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            הנעה (קוד)
                          </FormLabel>
                          <Input
                            value={formData.engineCode}
                            onChange={(e) =>
                              setFormData({ ...formData, engineCode: e.target.value })
                            }
                            placeholder="קוד הנעה"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            הנעה (שם)
                          </FormLabel>
                          <Input
                            value={formData.engineName}
                            onChange={(e) =>
                              setFormData({ ...formData, engineName: e.target.value })
                            }
                            placeholder="שם הנעה"
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
                      תאריכים ורישוי
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            תאריך רישום
                          </FormLabel>
                          <Input
                            type="date"
                            value={formData.registrationDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                registrationDate: e.target.value,
                              })
                            }
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            תאריך תוקף
                          </FormLabel>
                          <Input
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) =>
                              setFormData({ ...formData, expiryDate: e.target.value })
                            }
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
                      מפרט טכני
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            כוח סוס
                          </FormLabel>
                          <Input
                            type="number"
                            value={formData.horsePower}
                            onChange={(e) =>
                              setFormData({ ...formData, horsePower: e.target.value })
                            }
                            placeholder="כ״ס"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            משקל (טון)
                          </FormLabel>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) =>
                              setFormData({ ...formData, weight: e.target.value })
                            }
                            placeholder="טון"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            משקל כולל (טון)
                          </FormLabel>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.totalWeight}
                            onChange={(e) =>
                              setFormData({ ...formData, totalWeight: e.target.value })
                            }
                            placeholder="טון"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            כושר הרמה (טון)
                          </FormLabel>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.liftingCapacity}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                liftingCapacity: e.target.value,
                              })
                            }
                            placeholder="טון"
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
                      הגבלות
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            קוד הגבלה
                          </FormLabel>
                          <Input
                            value={formData.restrictionCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                restrictionCode: e.target.value,
                              })
                            }
                            placeholder="קוד הגבלה"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                            שם הגבלה
                          </FormLabel>
                          <Input
                            value={formData.restrictionName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                restrictionName: e.target.value,
                              })
                            }
                            placeholder="שם הגבלה"
                            borderRadius="lg"
                            bg={bgColor}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
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
                    פריטים וחלקים המותקנים בכלי
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

              {/* טאב 3: לקוחות */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    לקוחות משויכים
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    רשימת הלקוחות שהכלי משויך אליהם
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    שייך ללקוח
                  </Button>
                </Box>
              </TabPanel>

              {/* טאב 4: קבצים מצורפים */}
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
                    מסמכים, תמונות וקבצים רלוונטיים לכלי
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

              {/* טאב 5: היסטוריית מסמכים */}
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
                    היסטוריה מלאה של כל המסמכים והשירותים לכלי זה
                  </Text>
                </Box>
              </TabPanel>

              {/* טאב 6: ביטוחים */}
              <TabPanel p={6}>
                <Box
                  p={8}
                  borderRadius="lg"
                  border="2px dashed"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={2}>
                    ביטוחים פעילים
                  </Text>
                  <Text fontSize="sm" color={secondaryText} mb={4}>
                    פוליסות ביטוח וכיסוי לכלי זה
                  </Text>
                  <Button
                    leftIcon={<Plus size={18} />}
                    colorScheme="orange"
                    borderRadius="full"
                  >
                    הוסף ביטוח
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
              שמור כלי
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default GovModal;
