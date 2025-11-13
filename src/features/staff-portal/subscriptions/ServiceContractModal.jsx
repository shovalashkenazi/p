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
  VStack,
} from "@chakra-ui/react";
import { Upload } from "lucide-react";

const ServiceContractModal = ({ isOpen, onClose, contract }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [formData, setFormData] = useState({
    subscriptionName: contract?.subscriptionType || "",
    subscriptionType: contract?.subscriptionType || "",
    subscriptionPrice: contract?.annualPrice || "",
    deductible: contract?.deductible || "",
    document: null,
  });

  const handleSave = () => {
    console.log("שמירת כתב שירות:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" dir="rtl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        maxW="900px"
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
                {contract ? "עריכת כתב שירות" : "כתב שירות חדש"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                הזן את פרטי כתב השירות
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

        <ModalBody p={8}>
          <VStack spacing={6} align="stretch">
            {/* שם המנוי */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                שם המנוי
              </FormLabel>
              <Input
                placeholder="הזן שם מנוי"
                value={formData.subscriptionName}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionName: e.target.value })
                }
                borderColor={borderColor}
                _focus={{
                  borderColor: primary,
                  boxShadow: `0 0 0 1px ${primary}`,
                }}
              />
            </FormControl>

            {/* סוג המנוי */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                סוג המנוי
              </FormLabel>
              <Select
                placeholder="בחר סוג מנוי"
                value={formData.subscriptionType}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionType: e.target.value })
                }
                borderColor={borderColor}
                _focus={{
                  borderColor: primary,
                  boxShadow: `0 0 0 1px ${primary}`,
                }}
              >
                <option value="מנוי פרימיום">מנוי פרימיום</option>
                <option value="מנוי זהב">מנוי זהב</option>
                <option value="מנוי כסף">מנוי כסף</option>
                <option value="מנוי ברונזה">מנוי ברונזה</option>
              </Select>
            </FormControl>

            {/* מחיר המנוי */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                מחיר המנוי
              </FormLabel>
              <Input
                placeholder="הזן מחיר שנתי"
                value={formData.subscriptionPrice}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionPrice: e.target.value })
                }
                borderColor={borderColor}
                _focus={{
                  borderColor: primary,
                  boxShadow: `0 0 0 1px ${primary}`,
                }}
              />
            </FormControl>

            {/* השתתפות עצמית */}
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
                _focus={{
                  borderColor: primary,
                  boxShadow: `0 0 0 1px ${primary}`,
                }}
              />
            </FormControl>

            {/* העלאת מסמך */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                העלאת מסמך
              </FormLabel>
              <Box
                border="2px dashed"
                borderColor={borderColor}
                borderRadius="lg"
                p={6}
                textAlign="center"
                bg={cardBg}
                cursor="pointer"
                _hover={{ borderColor: primary }}
                transition="all 0.2s"
              >
                <Upload size={32} color={secondaryText} style={{ margin: "0 auto" }} />
                <Text fontSize="sm" color={secondaryText} mt={2}>
                  גרור קובץ לכאן או לחץ לבחירה
                </Text>
                <Text fontSize="xs" color={secondaryText} mt={1}>
                  PDF, DOC, DOCX עד 10MB
                </Text>
              </Box>
            </FormControl>
          </VStack>

          {/* Action Buttons */}
          <HStack justify="flex-start" mt={8} spacing={3}>
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
              שמירה
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceContractModal;
