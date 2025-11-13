import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Divider,
  useDisclosure,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import {
  Search,
  MoreVertical,
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ServiceCallModal from "./ServiceCallModal";

const ServiceCallsIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCall, setSelectedCall] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 12 קריאות שירות
  const serviceCalls = [
    {
      id: 1,
      callNumber: "CALL-2025-001",
      status: "ממתין",
      customerName: "משה כהן",
      idNumber: "123456789",
      phone: "050-1234567",
      email: "moshe@example.com",
      createdBy: "דוד לוי",
    },
    {
      id: 2,
      callNumber: "CALL-2025-002",
      status: "אושר",
      customerName: "שרה אברהם",
      idNumber: "987654321",
      phone: "052-9876543",
      email: "sara@example.com",
      createdBy: "יוסי כהן",
    },
    {
      id: 3,
      callNumber: "CALL-2025-003",
      status: "בוטל",
      customerName: "דוד ישראלי",
      idNumber: "456789123",
      phone: "054-4567891",
      email: "david@example.com",
      createdBy: "רחל לוי",
    },
    {
      id: 4,
      callNumber: "CALL-2025-004",
      status: "ממתין",
      customerName: "רחל שלום",
      idNumber: "789123456",
      phone: "053-7891234",
      email: "rachel@example.com",
      createdBy: "אורי מזרחי",
    },
    {
      id: 5,
      callNumber: "CALL-2025-005",
      status: "אושר",
      customerName: "יוסף מזרחי",
      idNumber: "321654987",
      phone: "050-3216549",
      email: "yosef@example.com",
      createdBy: "גיא פרץ",
    },
    {
      id: 6,
      callNumber: "CALL-2025-006",
      status: "ממתין",
      customerName: "מרים ביטון",
      idNumber: "654987321",
      phone: "052-6549873",
      email: "miriam@example.com",
      createdBy: "נועם דהן",
    },
    {
      id: 7,
      callNumber: "CALL-2025-007",
      status: "אושר",
      customerName: "אברהם חדד",
      idNumber: "147258369",
      phone: "054-1472583",
      email: "avraham@example.com",
      createdBy: "יניב חדד",
    },
    {
      id: 8,
      callNumber: "CALL-2025-008",
      status: "בוטל",
      customerName: "שרה פרץ",
      idNumber: "369258147",
      phone: "053-3692581",
      email: "sara.p@example.com",
      createdBy: "אלון מזרחי",
    },
    {
      id: 9,
      callNumber: "CALL-2025-009",
      status: "ממתין",
      customerName: "דניאל לוי",
      idNumber: "258147369",
      phone: "050-2581473",
      email: "daniel@example.com",
      createdBy: "עמית שלום",
    },
    {
      id: 10,
      callNumber: "CALL-2025-010",
      status: "אושר",
      customerName: "תמר כהן",
      idNumber: "741852963",
      phone: "052-7418529",
      email: "tamar@example.com",
      createdBy: "רועי ישראלי",
    },
    {
      id: 11,
      callNumber: "CALL-2025-011",
      status: "ממתין",
      customerName: "אורי דהן",
      idNumber: "963852741",
      phone: "054-9638527",
      email: "uri@example.com",
      createdBy: "משה אברהם",
    },
    {
      id: 12,
      callNumber: "CALL-2025-012",
      status: "אושר",
      customerName: "נועה ישראלי",
      idNumber: "852963741",
      phone: "053-8529637",
      email: "noa@example.com",
      createdBy: "דוד לוי",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      ממתין: { colorScheme: "yellow" },
      אושר: { colorScheme: "green" },
      בוטל: { colorScheme: "red" },
    };
    const config = statusConfig[status] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {status}
      </Badge>
    );
  };

  const handleAddCall = () => {
    setSelectedCall(null);
    onOpen();
  };

  const handleRefresh = () => {
    console.log("רענון נתונים...");
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            קריאות שירות
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול קריאות שירות ובקשות תיקון
          </Text>
        </Box>
      </Flex>

      {/* Action Bar - Row 1 */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
          <Button
            leftIcon={<Plus size={20} />}
            bg={primary}
            color="white"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="md"
            fontWeight="600"
            _hover={{ bg: "primary.200", transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(0)" }}
            transition="all 0.2s"
            boxShadow="md"
            onClick={handleAddCall}
          >
            יצירת קריאה חדשה
          </Button>
          <Button
            leftIcon={<Filter size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            _hover={{ bg: hoverBg }}
          >
            מסננים
          </Button>
          <Button
            leftIcon={<Columns size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            _hover={{ bg: hoverBg }}
          >
            עמודות
          </Button>
          <Button
            leftIcon={<RefreshCw size={18} />}
            variant="outline"
            borderRadius="full"
            px={6}
            h="45px"
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            borderColor={borderColor}
            borderWidth="1px"
            transition="all 0.5s ease"
            onClick={handleRefresh}
          >
            רענן נתונים
          </Button>
        </HStack>

        {/* Search */}
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none" h="full">
            <Search size={18} color={secondaryText} />
          </InputLeftElement>
          <Input
            placeholder="חיפוש מהיר..."
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            h="45px"
            fontSize="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            _focus={{
              borderColor: primary,
              boxShadow: `0 0 0 1px var(--chakra-colors-primary-100)`,
            }}
          />
        </InputGroup>
      </Flex>

      <Divider my={6} borderColor={borderColor} />

      {/* Action Bar - Row 2 */}
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={3}>
          <Button
            leftIcon={<Download size={18} />}
            variant="ghost"
            size="sm"
            color={secondaryText}
            _hover={{ bg: hoverBg, color: primary }}
          >
            ייצוא
          </Button>
          <Button
            leftIcon={<Upload size={18} />}
            variant="ghost"
            size="sm"
            color={secondaryText}
            _hover={{ bg: hoverBg, color: primary }}
          >
            ייבוא
          </Button>
        </HStack>

        <Text fontSize="sm" color={secondaryText}>
          {serviceCalls.length} קריאות שירות במערכת
        </Text>
      </Flex>

      {/* Table Container */}
      <Box
        bg={bgColor}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="md"
        overflow="hidden"
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "8px",
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
                minW="150px"
              >
                מספר קריאה
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
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                שם לקוח
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
                ת״ז / ח.פ
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
                מספר טלפון
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
                כתובת דוא״ל
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
                יוצר הפנייה
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
            {serviceCalls.map((call, index) => (
              <Tr
                key={call.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {call.callNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getStatusBadge(call.status)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {call.customerName}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text
                    fontSize="sm"
                    color={secondaryText}
                    dir="ltr"
                    textAlign="right"
                  >
                    {call.idNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text
                    fontSize="sm"
                    color={secondaryText}
                    dir="ltr"
                    textAlign="right"
                  >
                    {call.phone}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={call.email} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {call.email}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {call.createdBy}
                  </Text>
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
                        icon={<CheckCircle size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        אישור קריאה
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<XCircle size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        ביטול קריאה
                      </ChakraMenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Footer Info */}
      <Flex justify="space-between" align="center" mt={6} px={2}>
        <Text fontSize="sm" color={secondaryText}>
          מציג 1-{serviceCalls.length} מתוך {serviceCalls.length} קריאות שירות
        </Text>
        <HStack spacing={2}>
          <Button
            size="sm"
            variant="outline"
            borderRadius="lg"
            borderColor={borderColor}
            isDisabled
          >
            הקודם
          </Button>
          <Button size="sm" bg={primary} color="white" borderRadius="lg">
            1
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="lg"
            borderColor={borderColor}
            isDisabled
          >
            הבא
          </Button>
        </HStack>
      </Flex>

      {/* Service Call Modal */}
      <ServiceCallModal
        isOpen={isOpen}
        onClose={onClose}
        serviceCall={selectedCall}
      />
    </Box>
  );
};

export default ServiceCallsIndex;
