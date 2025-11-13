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
  FileText,
} from "lucide-react";
import SubscriptionModal from "./SubscriptionModal";

const SubscriptionsListIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 12 מנויים
  const subscriptions = [
    {
      id: 1,
      subscriptionCode: "SUB-2025-001",
      status: "פעיל",
      customerName: "משה כהן",
      email: "moshe@example.com",
      phone: "050-1234567",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
    },
    {
      id: 2,
      subscriptionCode: "SUB-2025-002",
      status: "פעיל",
      customerName: "שרה אברהם",
      email: "sara@example.com",
      phone: "052-9876543",
      startDate: "15/01/2025",
      endDate: "14/01/2026",
    },
    {
      id: 3,
      subscriptionCode: "SUB-2025-003",
      status: "לא פעיל",
      customerName: "דוד ישראלי",
      email: "david@example.com",
      phone: "054-4567891",
      startDate: "01/12/2024",
      endDate: "31/12/2024",
    },
    {
      id: 4,
      subscriptionCode: "SUB-2025-004",
      status: "פעיל",
      customerName: "רחל שלום",
      email: "rachel@example.com",
      phone: "053-7891234",
      startDate: "10/02/2025",
      endDate: "09/02/2026",
    },
    {
      id: 5,
      subscriptionCode: "SUB-2025-005",
      status: "מושעה",
      customerName: "יוסף מזרחי",
      email: "yosef@example.com",
      phone: "050-3216549",
      startDate: "05/01/2025",
      endDate: "04/01/2026",
    },
    {
      id: 6,
      subscriptionCode: "SUB-2025-006",
      status: "פעיל",
      customerName: "מרים ביטון",
      email: "miriam@example.com",
      phone: "052-6549873",
      startDate: "20/01/2025",
      endDate: "19/01/2026",
    },
    {
      id: 7,
      subscriptionCode: "SUB-2025-007",
      status: "פעיל",
      customerName: "אברהם חדד",
      email: "avraham@example.com",
      phone: "054-1472583",
      startDate: "01/03/2025",
      endDate: "28/02/2026",
    },
    {
      id: 8,
      subscriptionCode: "SUB-2025-008",
      status: "לא פעיל",
      customerName: "שרה פרץ",
      email: "sara.p@example.com",
      phone: "053-3692581",
      startDate: "15/11/2024",
      endDate: "14/11/2025",
    },
    {
      id: 9,
      subscriptionCode: "SUB-2025-009",
      status: "פעיל",
      customerName: "דניאל לוי",
      email: "daniel@example.com",
      phone: "050-2581473",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
    },
    {
      id: 10,
      subscriptionCode: "SUB-2025-010",
      status: "מושעה",
      customerName: "תמר כהן",
      email: "tamar@example.com",
      phone: "052-7418529",
      startDate: "10/01/2025",
      endDate: "09/01/2026",
    },
    {
      id: 11,
      subscriptionCode: "SUB-2025-011",
      status: "פעיל",
      customerName: "אורי דהן",
      email: "uri@example.com",
      phone: "054-9638527",
      startDate: "25/02/2025",
      endDate: "24/02/2026",
    },
    {
      id: 12,
      subscriptionCode: "SUB-2025-012",
      status: "פעיל",
      customerName: "נועה ישראלי",
      email: "noa@example.com",
      phone: "053-8529637",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      פעיל: { colorScheme: "green" },
      "לא פעיל": { colorScheme: "red" },
      מושעה: { colorScheme: "yellow" },
    };
    const config = statusConfig[status] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {status}
      </Badge>
    );
  };

  const handleAddSubscription = () => {
    setSelectedSubscription(null);
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
            מנויים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול מנויים ומעקב תקופות מנוי
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
            onClick={handleAddSubscription}
          >
            יצירת מנוי
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
            _hover={{ bg: hoverBg, transform: "rotate(180deg)" }}
            _active={{ transform: "rotate(360deg)" }}
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
          {subscriptions.length} מנויים במערכת
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
                מק״ט מנוי
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
                אימייל
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
                טלפון
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
                תאריך התחלה
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
                תאריך סיום
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
            {subscriptions.map((subscription, index) => (
              <Tr
                key={subscription.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {subscription.subscriptionCode}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getStatusBadge(subscription.status)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {subscription.customerName}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={subscription.email} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {subscription.email}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText} dir="ltr" textAlign="right">
                    {subscription.phone}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {subscription.startDate}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {subscription.endDate}
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
                    <MenuList dir="rtl" borderColor={borderColor} boxShadow="lg">
                      <ChakraMenuItem
                        icon={<FileText size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפייה ב-PDF
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
          מציג 1-{subscriptions.length} מתוך {subscriptions.length} מנויים
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

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isOpen}
        onClose={onClose}
        subscription={selectedSubscription}
      />
    </Box>
  );
};

export default SubscriptionsListIndex;
