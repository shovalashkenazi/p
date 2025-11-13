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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Progress,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronRight, ChevronLeft, Upload } from "lucide-react";

const SubscriptionModal = ({ isOpen, onClose, subscription }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    // פרטי רכב / מנוי
    vehicleNumber: "",
    chassisNumber: "",
    manufacturer: "",
    model: "",
    year: "",
    subscriptionCode: subscription?.subscriptionCode || "",

    // פרטי לקוח
    customerName: subscription?.customerName || "",
    idNumber: "",
    phone: subscription?.phone || "",
    email: subscription?.email || "",
    address: "",
    city: "",

    // פרטי נזק
    damageType: "",
    damageDescription: "",
    damageLocation: "",

    // סוג מנוי
    subscriptionType: "",
    subscriptionPrice: "",
    deductible: "",
    startDate: subscription?.startDate || "",
    endDate: subscription?.endDate || "",

    // מסמכים ותמונות
    documents: [],
    images: [],
  });

  const steps = [
    { number: 1, title: "פרטי רכב" },
    { number: 2, title: "פרטי לקוח" },
    { number: 3, title: "פרטי נזק" },
    { number: 4, title: "סוג מנוי" },
    { number: 5, title: "מסמכים" },
    { number: 6, title: "תמונות" },
    { number: 7, title: "סיכום" },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log("שמירת מנוי:", formData);
    onClose();
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              פרטי רכב / מנוי
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    מק״ט מנוי
                  </FormLabel>
                  <Input
                    placeholder="הזן מק״ט מנוי"
                    value={formData.subscriptionCode}
                    onChange={(e) =>
                      setFormData({ ...formData, subscriptionCode: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    מספר רכב
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר רכב"
                    value={formData.vehicleNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleNumber: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    מספר שלדה
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר שלדה"
                    value={formData.chassisNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, chassisNumber: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    יצרן
                  </FormLabel>
                  <Input
                    placeholder="הזן יצרן"
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    דגם
                  </FormLabel>
                  <Input
                    placeholder="הזן דגם"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    שנת ייצור
                  </FormLabel>
                  <Input
                    placeholder="הזן שנת ייצור"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              פרטי לקוח
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    שם לקוח
                  </FormLabel>
                  <Input
                    placeholder="הזן שם לקוח"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    ת״ז / ח.פ
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר זהות"
                    value={formData.idNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, idNumber: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    טלפון
                  </FormLabel>
                  <Input
                    placeholder="הזן מספר טלפון"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    אימייל
                  </FormLabel>
                  <Input
                    placeholder="הזן כתובת אימייל"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    כתובת
                  </FormLabel>
                  <Input
                    placeholder="הזן כתובת"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    עיר
                  </FormLabel>
                  <Input
                    placeholder="הזן עיר"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              פרטי נזק
            </Text>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                סוג נזק
              </FormLabel>
              <Select
                placeholder="בחר סוג נזק"
                value={formData.damageType}
                onChange={(e) =>
                  setFormData({ ...formData, damageType: e.target.value })
                }
                borderColor={borderColor}
              >
                <option value="סדק">סדק</option>
                <option value="שבר">שבר</option>
                <option value="שריטה">שריטה</option>
                <option value="אחר">אחר</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                מיקום נזק
              </FormLabel>
              <Select
                placeholder="בחר מיקום נזק"
                value={formData.damageLocation}
                onChange={(e) =>
                  setFormData({ ...formData, damageLocation: e.target.value })
                }
                borderColor={borderColor}
              >
                <option value="זכוכית קדמית">זכוכית קדמית</option>
                <option value="זכוכית אחורית">זכוכית אחורית</option>
                <option value="זכוכית צדדית">זכוכית צדדית</option>
                <option value="אחר">אחר</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                תיאור הנזק
              </FormLabel>
              <Textarea
                placeholder="תאר את הנזק בפירוט"
                value={formData.damageDescription}
                onChange={(e) =>
                  setFormData({ ...formData, damageDescription: e.target.value })
                }
                borderColor={borderColor}
                rows={6}
              />
            </FormControl>
          </VStack>
        );

      case 4:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              סוג מנוי
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    סוג מנוי
                  </FormLabel>
                  <Select
                    placeholder="בחר סוג מנוי"
                    value={formData.subscriptionType}
                    onChange={(e) =>
                      setFormData({ ...formData, subscriptionType: e.target.value })
                    }
                    borderColor={borderColor}
                  >
                    <option value="מנוי פרימיום">מנוי פרימיום</option>
                    <option value="מנוי זהב">מנוי זהב</option>
                    <option value="מנוי כסף">מנוי כסף</option>
                    <option value="מנוי ברונזה">מנוי ברונזה</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    מחיר מנוי שנתי
                  </FormLabel>
                  <Input
                    placeholder="הזן מחיר"
                    value={formData.subscriptionPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subscriptionPrice: e.target.value,
                      })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    השתתפות עצמית
                  </FormLabel>
                  <Input
                    placeholder="הזן השתתפות עצמית"
                    value={formData.deductible}
                    onChange={(e) =>
                      setFormData({ ...formData, deductible: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    תאריך התחלה
                  </FormLabel>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                    תאריך סיום
                  </FormLabel>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    borderColor={borderColor}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 5:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              מסמכים
            </Text>
            <Box
              border="2px dashed"
              borderColor={borderColor}
              borderRadius="lg"
              p={12}
              textAlign="center"
              bg={cardBg}
              cursor="pointer"
              _hover={{ borderColor: primary }}
              transition="all 0.2s"
            >
              <Upload
                size={48}
                color={secondaryText}
                style={{ margin: "0 auto" }}
              />
              <Text fontSize="md" fontWeight="600" color={textColor} mt={4}>
                גרור מסמכים לכאן או לחץ לבחירה
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={2}>
                PDF, DOC, DOCX, XLS, XLSX עד 10MB
              </Text>
            </Box>
          </VStack>
        );

      case 6:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              תמונות
            </Text>
            <Box
              border="2px dashed"
              borderColor={borderColor}
              borderRadius="lg"
              p={12}
              textAlign="center"
              bg={cardBg}
              cursor="pointer"
              _hover={{ borderColor: primary }}
              transition="all 0.2s"
            >
              <Upload
                size={48}
                color={secondaryText}
                style={{ margin: "0 auto" }}
              />
              <Text fontSize="md" fontWeight="600" color={textColor} mt={4}>
                גרור תמונות לכאן או לחץ לבחירה
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={2}>
                JPG, PNG, GIF עד 5MB לתמונה
              </Text>
            </Box>
          </VStack>
        );

      case 7:
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="600" color={textColor}>
              סיכום
            </Text>
            <Box
              p={6}
              bg={cardBg}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                  <Text fontSize="md" fontWeight="600" color={primary} mb={4}>
                    פרטי רכב / מנוי
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    מק״ט מנוי
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.subscriptionCode || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    מספר רכב
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.vehicleNumber || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    יצרן
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.manufacturer || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    דגם
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.model || "-"}
                  </Text>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="md" fontWeight="600" color={primary} mt={4} mb={4}>
                    פרטי לקוח
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    שם לקוח
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.customerName || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    טלפון
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.phone || "-"}
                  </Text>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="md" fontWeight="600" color={primary} mt={4} mb={4}>
                    פרטי מנוי
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    סוג מנוי
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.subscriptionType || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    מחיר שנתי
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.subscriptionPrice || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    תאריך התחלה
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.startDate || "-"}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm" color={secondaryText}>
                    תאריך סיום
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {formData.endDate || "-"}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" dir="rtl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        maxW="90vw"
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
                {subscription ? "עריכת מנוי" : "מנוי חדש"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                שלב {currentStep} מתוך {totalSteps}: {steps[currentStep - 1].title}
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

        {/* Progress Bar */}
        <Box px={8} pt={4}>
          <Progress
            value={(currentStep / totalSteps) * 100}
            size="sm"
            colorScheme="orange"
            borderRadius="full"
          />
          <HStack justify="space-between" mt={2} spacing={1}>
            {steps.map((step) => (
              <Text
                key={step.number}
                fontSize="xs"
                color={step.number === currentStep ? primary : secondaryText}
                fontWeight={step.number === currentStep ? "600" : "400"}
              >
                {step.title}
              </Text>
            ))}
          </HStack>
        </Box>

        <ModalBody p={8}>{renderStepContent()}</ModalBody>

        {/* Navigation Buttons */}
        <Box
          borderTop="1px solid"
          borderColor={borderColor}
          p={6}
          bg={bgColor}
        >
          <HStack justify="space-between">
            <Button
              leftIcon={<ChevronRight size={18} />}
              variant="outline"
              borderColor={borderColor}
              px={6}
              h="45px"
              fontSize="md"
              fontWeight="600"
              borderRadius="full"
              _hover={{ bg: hoverBg }}
              onClick={handlePrevious}
              isDisabled={currentStep === 1}
            >
              הקודם
            </Button>
            <HStack spacing={3}>
              {currentStep === totalSteps ? (
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
                  שמירה וסיום
                </Button>
              ) : (
                <Button
                  rightIcon={<ChevronLeft size={18} />}
                  bg={primary}
                  color="white"
                  px={6}
                  h="45px"
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="full"
                  _hover={{ bg: "primary.200" }}
                  onClick={handleNext}
                >
                  הבא
                </Button>
              )}
            </HStack>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionModal;
