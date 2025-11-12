import React, { useState } from "react";
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
  Badge,
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
  Tooltip,
} from "@chakra-ui/react";
import {
  Search,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import CustomerModal from "./CustomerModal";

const CustomersIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 12 לקוחות
  const customers = [
    {
      id: 1,
      name: "חברת גלובל טראנס בע״מ",
      businessId: "514567890",
      phone: "03-6543210",
      email: "info@globaltrans.co.il",
      address: "רחוב הרצל 45",
      city: "תל אביב",
      type: "business",
    },
    {
      id: 2,
      name: "משה דוד",
      businessId: "123456789",
      phone: "054-9876543",
      email: "moshe.david@gmail.com",
      address: "רחוב הגפן 12",
      city: "ירושלים",
      type: "private",
    },
    {
      id: 3,
      name: "חברת אגרו מכונות בע״מ",
      businessId: "520987654",
      phone: "04-8765432",
      email: "office@agromachines.co.il",
      address: "שדרות העמל 78",
      city: "חיפה",
      type: "business",
    },
    {
      id: 4,
      name: "רחל שמש",
      businessId: "234567890",
      phone: "052-1234567",
      email: "rachel.shemesh@walla.co.il",
      address: "רחוב הזית 23",
      city: "באר שבע",
      type: "private",
    },
    {
      id: 5,
      name: "חברת השדה הירוק בע״מ",
      businessId: "515678901",
      phone: "08-9876543",
      email: "green@field.co.il",
      address: "כביש 40 צומת",
      city: "קרית גת",
      type: "business",
    },
    {
      id: 6,
      name: "יעקב אברהם",
      businessId: "345678901",
      phone: "050-8765432",
      email: "yaakov.avraham@hotmail.com",
      address: "רחוב הדקל 56",
      city: "אשדוד",
      type: "private",
    },
    {
      id: 7,
      name: "חברת אופק טכנולוגיות בע״מ",
      businessId: "518765432",
      phone: "09-7654321",
      email: "contact@ofektech.co.il",
      address: "רחוב המלאכה 34",
      city: "רעננה",
      type: "business",
    },
    {
      id: 8,
      name: "שרה לוי",
      businessId: "456789012",
      phone: "053-6543210",
      email: "sara.levi@gmail.com",
      address: "רחוב הרימון 89",
      city: "פתח תקווה",
      type: "private",
    },
    {
      id: 9,
      name: "חברת דרך החקלאות בע״מ",
      businessId: "512345678",
      phone: "04-6789012",
      email: "info@agriroad.co.il",
      address: "מושב נחלים 15",
      city: "עפולה",
      type: "business",
    },
    {
      id: 10,
      name: "דוד בן דוד",
      businessId: "567890123",
      phone: "055-5432109",
      email: "david.bendavid@walla.co.il",
      address: "רחוב החרוב 67",
      city: "נתניה",
      type: "private",
    },
    {
      id: 11,
      name: "חברת כוח המנוף בע״מ",
      businessId: "519876543",
      phone: "02-5432109",
      email: "power@crane.co.il",
      address: "שדרות בן גוריון 123",
      city: "ירושלים",
      type: "business",
    },
    {
      id: 12,
      name: "אברהם יצחק",
      businessId: "678901234",
      phone: "051-4321098",
      email: "avraham.yitzhak@gmail.com",
      address: "רחוב הזמיר 91",
      city: "חולון",
      type: "private",
    },
  ];

  const getCustomerTypeColor = (type) => {
    return type === "business" ? "blue" : "purple";
  };

  const getCustomerTypeLabel = (type) => {
    return type === "business" ? "עסקי" : "פרטי";
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    onOpen();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
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
            ניהול לקוחות
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            צפייה וניהול פרטי לקוחות, היסטוריית רכישות ומסמכים
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
            onClick={handleAddCustomer}
          >
            הוספת לקוח
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
          {customers.length} לקוחות במערכת
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
              >
                מזהה
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
                שם
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
                סוג לקוח
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
                מספר ע״מ / ח.פ
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
                מס׳ טלפון
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
                דוא״ל
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
                עיר
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
            {customers.map((customer, index) => (
              <Tr
                key={customer.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    #{customer.id}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="250px">
                  <Tooltip label={customer.name} hasArrow>
                    <Text fontSize="sm" color={textColor} fontWeight="600" isTruncated>
                      {customer.name}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme={getCustomerTypeColor(customer.type)}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {getCustomerTypeLabel(customer.type)}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {customer.businessId}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="130px">
                  <Text fontSize="sm" color={secondaryText} dir="ltr" textAlign="right">
                    {customer.phone}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={customer.email} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {customer.email}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="180px">
                  <Tooltip label={customer.address} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {customer.address}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {customer.city}
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
                        icon={<Eye size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפייה בלקוח
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        עריכת לקוח
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת לקוח
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
          מציג 1-12 מתוך 12 לקוחות
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

      {/* Customer Modal */}
      <CustomerModal isOpen={isOpen} onClose={onClose} customer={selectedCustomer} />
    </Box>
  );
};

export default CustomersIndex;
