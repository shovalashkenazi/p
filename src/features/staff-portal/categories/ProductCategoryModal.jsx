import { useState, useEffect } from "react";
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
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Upload } from "lucide-react";
import { useCategoryActions, useCategoryModal } from "./hooks";

const ProductCategoryModal = ({ isOpen, onClose }) => {
  const { selectedCategory, isEditMode } = useCategoryModal();
  const { createCategory, updateCategory, isCreating, isUpdating } =
    useCategoryActions();

  // ✅ Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  // ✅ Form state
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    label: "",
    value: "",
  });

  // ✅ Update form when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        label: selectedCategory.label || "",
        value: selectedCategory.value || "",
        image: selectedCategory.image || null,
      });
    } else {
      setFormData({
        label: "",
        value: "",
        image: null,
      });
    }
    setErrors({ label: "", value: "" });
  }, [selectedCategory, isOpen]);

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = { label: "", value: "" };
    let isValid = true;

    if (!formData.label || formData.label.trim().length < 2) {
      newErrors.label = "שם קטגוריה חייב להכיל לפחות 2 תווים";
      isValid = false;
    }

    if (!isEditMode && (!formData.value || formData.value.trim().length < 2)) {
      newErrors.value = "מזהה חייב להכיל לפחות 2 תווים";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Handle save (create or update)
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    let result;
    if (isEditMode) {
      // Update existing category
      result = await updateCategory({
        _id: selectedCategory._id,
        newLabel: formData.label,
      });
    } else {
      // Create new category
      result = await createCategory({
        label: formData.label,
        value: formData.value,
      });
    }

    // Close modal on success
    if (result.success) {
      handleClose();
    }
  };

  // ✅ Handle close
  const handleClose = () => {
    setFormData({ label: "", value: "", image: null });
    setErrors({ label: "", value: "" });
    onClose();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl" dir="rtl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        maxW="700px"
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
                {isEditMode ? "עריכת קטגוריה" : "יצירת קטגוריה חדשה"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                הזן את פרטי הקטגוריה
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
            {/* שם הקטגוריה */}
            <FormControl isRequired isInvalid={!!errors.label}>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                שם קטגוריה
              </FormLabel>
              <Input
                placeholder="הזן שם קטגוריה"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                borderColor={borderColor}
                _focus={{
                  borderColor: primary,
                  boxShadow: `0 0 0 1px ${primary}`,
                }}
              />
              {errors.label && <FormErrorMessage>{errors.label}</FormErrorMessage>}
            </FormControl>

            {/* מזהה קטגוריה (רק ביצירה) */}
            {!isEditMode && (
              <FormControl isRequired isInvalid={!!errors.value}>
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                  מזהה קטגוריה
                </FormLabel>
                <Input
                  placeholder="הזן מזהה קטגוריה (לדוגמה: CAT-001)"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  borderColor={borderColor}
                  _focus={{
                    borderColor: primary,
                    boxShadow: `0 0 0 1px ${primary}`,
                  }}
                />
                {errors.value && <FormErrorMessage>{errors.value}</FormErrorMessage>}
              </FormControl>
            )}

            {/* העלאת תמונה */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                העלאת תמונה
              </FormLabel>
              <Box
                border="2px dashed"
                borderColor={borderColor}
                borderRadius="lg"
                p={8}
                textAlign="center"
                bg={cardBg}
                cursor="pointer"
                _hover={{ borderColor: primary }}
                transition="all 0.2s"
              >
                <Upload
                  size={40}
                  color={secondaryText}
                  style={{ margin: "0 auto" }}
                />
                <Text fontSize="sm" color={secondaryText} mt={3}>
                  גרור תמונה לכאן או לחץ לבחירה
                </Text>
                <Text fontSize="xs" color={secondaryText} mt={1}>
                  JPG, PNG, GIF עד 5MB
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
              isLoading={isLoading}
              loadingText="שומר..."
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
              onClick={handleClose}
              isDisabled={isLoading}
            >
              ביטול
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductCategoryModal;
