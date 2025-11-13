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
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
} from "@chakra-ui/react";
import { MoreVertical, Eye, Edit, Trash2, MapPin } from "lucide-react";

const DriversRoutesModal = ({ isOpen, onClose, driver }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const [activeTab, setActiveTab] = useState("all");

  // כרטיסי עבודה לדוגמה
  const workCards = [
    {
      id: 1,
      cardNumber: "WC-001",
      customer: "משה כהן",
      address: "רח׳ הרצל 45, תל אביב",
      vehicleNumber: "12-345-67",
      serviceType: "תיקון זכוכית",
      status: "completed",
      scheduledTime: "08:00",
      completedTime: "08:45",
    },
    {
      id: 2,
      cardNumber: "WC-002",
      customer: "שרה לוי",
      address: "רח׳ בן גוריון 12, רמת גן",
      vehicleNumber: "45-678-90",
      serviceType: "החלפת זכוכית",
      status: "inRoute",
      scheduledTime: "09:30",
      completedTime: null,
    },
    {
      id: 3,
      cardNumber: "WC-003",
      customer: "דוד אברהם",
      address: "רח׳ ויצמן 78, פתח תקווה",
      vehicleNumber: "78-901-23",
      serviceType: "תיקון סדק",
      status: "completed",
      scheduledTime: "10:00",
      completedTime: "10:30",
    },
    {
      id: 4,
      cardNumber: "WC-004",
      customer: "רחל ישראלי",
      address: "רח׳ רוטשילד 56, ראשון לציון",
      vehicleNumber: "11-222-33",
      serviceType: "החלפת זכוכית",
      status: "failed",
      scheduledTime: "11:00",
      completedTime: null,
    },
    {
      id: 5,
      cardNumber: "WC-005",
      customer: "אורי שלום",
      address: "רח׳ דיזנגוף 89, תל אביב",
      vehicleNumber: "55-666-77",
      serviceType: "תיקון זכוכית",
      status: "inRoute",
      scheduledTime: "12:00",
      completedTime: null,
    },
    {
      id: 6,
      cardNumber: "WC-006",
      customer: "יעל מזרחי",
      address: "רח׳ הרב קוק 34, בני ברק",
      vehicleNumber: "88-999-00",
      serviceType: "החלפת זכוכית קדמית",
      status: "completed",
      scheduledTime: "13:30",
      completedTime: "14:15",
    },
    {
      id: 7,
      cardNumber: "WC-007",
      customer: "גיא פרץ",
      address: "רח׳ סוקולוב 23, הרצליה",
      vehicleNumber: "22-333-44",
      serviceType: "תיקון סדק",
      status: "inRoute",
      scheduledTime: "14:30",
      completedTime: null,
    },
    {
      id: 8,
      cardNumber: "WC-008",
      customer: "נועם דהן",
      address: "רח׳ בן יהודה 67, תל אביב",
      vehicleNumber: "33-444-55",
      serviceType: "תיקון זכוכית",
      status: "completed",
      scheduledTime: "15:00",
      completedTime: "15:40",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: "בוצע", colorScheme: "green" },
      inRoute: { label: "במסלול", colorScheme: "blue" },
      failed: { label: "נכשל", colorScheme: "red" },
    };
    const config = statusConfig[status];
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {config.label}
      </Badge>
    );
  };

  const filteredCards = () => {
    if (activeTab === "all") return workCards;
    if (activeTab === "inRoute")
      return workCards.filter((c) => c.status === "inRoute");
    if (activeTab === "completed")
      return workCards.filter((c) => c.status === "completed");
    if (activeTab === "failed")
      return workCards.filter((c) => c.status === "failed");
    return workCards;
  };

  const tabs = [
    { id: "all", label: "כל הכרטיסים", count: workCards.length },
    {
      id: "inRoute",
      label: "במסלול",
      count: workCards.filter((c) => c.status === "inRoute").length,
    },
    {
      id: "completed",
      label: "בוצע",
      count: workCards.filter((c) => c.status === "completed").length,
    },
    {
      id: "failed",
      label: "נכשל",
      count: workCards.filter((c) => c.status === "failed").length,
    },
  ];

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
                {driver ? `מסלול - ${driver.name}` : "מסלול נהג חדש"}
              </Text>
              <Text fontSize="sm" color={secondaryText} mt={1}>
                ניהול כרטיסי עבודה ומעקב מסלול
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
          {/* Tabs */}
          <HStack
            spacing={0}
            borderBottom="1px solid"
            borderColor={borderColor}
            px={8}
            bg={bgColor}
            position="sticky"
            top={0}
            zIndex={1}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                borderRadius={0}
                px={6}
                py={6}
                fontWeight={activeTab === tab.id ? "700" : "500"}
                color={activeTab === tab.id ? primary : secondaryText}
                borderBottom="3px solid"
                borderColor={activeTab === tab.id ? primary : "transparent"}
                _hover={{
                  bg: hoverBg,
                  color: activeTab === tab.id ? primary : textColor,
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <Badge
                  mr={2}
                  colorScheme={activeTab === tab.id ? "orange" : "gray"}
                  fontSize="xs"
                >
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </HStack>

          {/* Content */}
          <Box p={8} maxH="calc(90vh - 250px)" overflowY="auto">
            <Box
              bg={bgColor}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="md"
              overflow="hidden"
              overflowX="auto"
            >
              <Table variant="simple">
                <Thead bg={stripedBg}>
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
                      מספר כרטיס
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
                      לקוח
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
                      כתובת
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
                      מספר רכב
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
                      סוג שירות
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
                      שעה מתוכננת
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
                      שעה בוצעה
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
                    <Th
                      textAlign="center"
                      fontSize="sm"
                      fontWeight="700"
                      color={textColor}
                      textTransform="none"
                      borderColor={borderColor}
                      py={4}
                      whiteSpace="nowrap"
                    >
                      פעולות
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCards().map((card, index) => (
                    <Tr
                      key={card.id}
                      bg={index % 2 === 0 ? bgColor : stripedBg}
                      _hover={{ bg: hoverBg }}
                      transition="background 0.2s"
                    >
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          {card.cardNumber}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" color={secondaryText}>
                          {card.customer}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <HStack spacing={2}>
                          <MapPin size={14} color={secondaryText} />
                          <Text fontSize="sm" color={secondaryText}>
                            {card.address}
                          </Text>
                        </HStack>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" color={secondaryText}>
                          {card.vehicleNumber}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" color={secondaryText}>
                          {card.serviceType}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" color={secondaryText}>
                          {card.scheduledTime}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        <Text fontSize="sm" color={secondaryText}>
                          {card.completedTime || "-"}
                        </Text>
                      </Td>
                      <Td borderColor={borderColor} py={3}>
                        {getStatusBadge(card.status)}
                      </Td>
                      <Td borderColor={borderColor} py={3} textAlign="center">
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={18} />}
                            variant="ghost"
                            size="sm"
                            borderRadius="full"
                            _hover={{ bg: hoverBg }}
                          />
                          <MenuList
                            dir="rtl"
                            borderColor={borderColor}
                            boxShadow="lg"
                          >
                            <ChakraMenuItem
                              icon={<Eye size={16} />}
                              _hover={{ bg: hoverBg }}
                              fontSize="sm"
                            >
                              צפייה בכרטיס
                            </ChakraMenuItem>
                            <ChakraMenuItem
                              icon={<Edit size={16} />}
                              _hover={{ bg: hoverBg }}
                              fontSize="sm"
                            >
                              עריכת כרטיס
                            </ChakraMenuItem>
                            <ChakraMenuItem
                              icon={<Trash2 size={16} />}
                              _hover={{ bg: "red.50" }}
                              color="red.500"
                              fontSize="sm"
                            >
                              מחיקת כרטיס
                            </ChakraMenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {filteredCards().length === 0 && (
              <Box textAlign="center" py={12}>
                <Text fontSize="md" color={secondaryText}>
                  אין כרטיסי עבודה להצגה
                </Text>
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DriversRoutesModal;
