import { useState, useMemo } from "react";
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
  Edit,
  Eye,
  Trash2,
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  Tag,
  ChevronDown,
} from "lucide-react";
import GenericAccountModal from "./GenericAccountModal";

// רכיב גנרי לכל סוגי החשבונות
const GenericAccountsIndex = ({ accountType, title, subtitle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // קטגוריות לפי סוג החשבון
  const categories = [
    "לקוחות",
    "עובדים",
    "סוכנים",
    "מתקינים",
    "מחסנאים",
    "ספקים",
  ];

  // נתוני דוגמה - 10 חשבונות
  const accounts = [
    {
      id: 1,
      accountId: `${accountType.toUpperCase()}-001`,
      name: "משה כהן",
      type: "עסקי",
      category: "לקוחות",
      businessId: "514234567",
      phone: "050-1234567",
      email: "moshe@example.com",
      address: "רח׳ הרצל 45",
      city: "תל אביב",
    },
    {
      id: 2,
      accountId: `${accountType.toUpperCase()}-002`,
      name: "שרה אברהם",
      type: "פרטי",
      category: "עובדים",
      businessId: "312345678",
      phone: "052-9876543",
      email: "sara@example.com",
      address: "רח׳ בן גוריון 12",
      city: "רמת גן",
    },
    {
      id: 3,
      accountId: `${accountType.toUpperCase()}-003`,
      name: "דוד ישראלי",
      type: "עסקי",
      category: "סוכנים",
      businessId: "514567890",
      phone: "054-4567891",
      email: "david@example.com",
      address: "רח׳ ויצמן 78",
      city: "פתח תקווה",
    },
    {
      id: 4,
      accountId: `${accountType.toUpperCase()}-004`,
      name: "רחל שלום",
      type: "פרטי",
      category: "מתקינים",
      businessId: "325678901",
      phone: "053-7891234",
      email: "rachel@example.com",
      address: "רח׳ רוטשילד 56",
      city: "ראשון לציון",
    },
    {
      id: 5,
      accountId: `${accountType.toUpperCase()}-005`,
      name: "יוסף מזרחי",
      type: "עסקי",
      category: "מחסנאים",
      businessId: "514678901",
      phone: "050-3216549",
      email: "yosef@example.com",
      address: "רח׳ דיזנגוף 89",
      city: "תל אביב",
    },
    {
      id: 6,
      accountId: `${accountType.toUpperCase()}-006`,
      name: "מרים ביטון",
      type: "פרטי",
      category: "ספקים",
      businessId: "336789012",
      phone: "052-6549873",
      email: "miriam@example.com",
      address: "רח׳ הרב קוק 34",
      city: "בני ברק",
    },
    {
      id: 7,
      accountId: `${accountType.toUpperCase()}-007`,
      name: "אברהם חדד",
      type: "עסקי",
      category: "לקוחות",
      businessId: "514789012",
      phone: "054-1472583",
      email: "avraham@example.com",
      address: "רח׳ סוקולוב 23",
      city: "הרצליה",
    },
    {
      id: 8,
      accountId: `${accountType.toUpperCase()}-008`,
      name: "שרה פרץ",
      type: "פרטי",
      category: "עובדים",
      businessId: "347890123",
      phone: "053-3692581",
      email: "sara.p@example.com",
      address: "רח׳ בן יהודה 67",
      city: "תל אביב",
    },
    {
      id: 9,
      accountId: `${accountType.toUpperCase()}-009`,
      name: "דניאל לוי",
      type: "עסקי",
      category: "סוכנים",
      businessId: "514890123",
      phone: "050-2581473",
      email: "daniel@example.com",
      address: "רח׳ ז'בוטינסקי 101",
      city: "רמת גן",
    },
    {
      id: 10,
      accountId: `${accountType.toUpperCase()}-010`,
      name: "תמר כהן",
      type: "פרטי",
      category: "מתקינים",
      businessId: "358901234",
      phone: "052-7418529",
      email: "tamar@example.com",
      address: "רח׳ ביאליק 45",
      city: "רמת גן",
    },
  ];

  // סינון לפי קטגוריה
  const filteredAccounts = useMemo(() => {
    if (!selectedCategory) return accounts;
    return accounts.filter((account) => account.category === selectedCategory);
  }, [selectedCategory, accounts]);

  const getTypeBadge = (type) => {
    const typeConfig = {
      עסקי: { colorScheme: "blue" },
      פרטי: { colorScheme: "purple" },
    };
    const config = typeConfig[type] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {type}
      </Badge>
    );
  };

  const handleAddAccount = (category = null) => {
    setSelectedAccount(null);
    if (category) {
      setSelectedCategory(category);
    }
    onOpen();
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
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
            {title}
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            {subtitle}
          </Text>
        </Box>
      </Flex>

      {/* Action Bar - Row 1 */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Plus size={20} />}
              rightIcon={<ChevronDown size={16} />}
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
            >
              הוספת חשבון
            </MenuButton>
            <MenuList dir="rtl" borderColor={borderColor} boxShadow="lg">
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  onClick={() => handleAddAccount(category)}
                >
                  {category}
                </ChakraMenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Tag size={18} />}
              rightIcon={<ChevronDown size={16} />}
              variant="outline"
              borderRadius="full"
              px={6}
              h="45px"
              fontSize="sm"
              fontWeight="600"
              color={selectedCategory ? primary : textColor}
              borderColor={selectedCategory ? primary : borderColor}
              borderWidth={selectedCategory ? "2px" : "1px"}
              bg={selectedCategory ? `${primary}15` : "transparent"}
              _hover={{ bg: hoverBg }}
            >
              {selectedCategory || "קטגוריה"}
            </MenuButton>
            <MenuList dir="rtl" borderColor={borderColor} boxShadow="lg">
              <ChakraMenuItem
                _hover={{ bg: hoverBg }}
                fontSize="sm"
                fontWeight={!selectedCategory ? "700" : "400"}
                color={!selectedCategory ? primary : textColor}
                onClick={() => setSelectedCategory(null)}
              >
                הצג הכל
              </ChakraMenuItem>
              <Divider />
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  fontWeight={selectedCategory === category ? "700" : "400"}
                  color={selectedCategory === category ? primary : textColor}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </ChakraMenuItem>
              ))}
            </MenuList>
          </Menu>
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
          {selectedCategory
            ? `${filteredAccounts.length} חשבונות מתוך ${accounts.length} (${selectedCategory})`
            : `${accounts.length} חשבונות במערכת`}
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
                סוג
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
            {filteredAccounts.map((account, index) => (
              <Tr
                key={account.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {account.accountId}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {account.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getTypeBadge(account.type)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text
                    fontSize="sm"
                    color={secondaryText}
                    dir="ltr"
                    textAlign="right"
                  >
                    {account.businessId}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text
                    fontSize="sm"
                    color={secondaryText}
                    dir="ltr"
                    textAlign="right"
                  >
                    {account.phone}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={account.email} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {account.email}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {account.address}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {account.city}
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
                        icon={<Eye size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפייה בחשבון
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditAccount(account)}
                      >
                        עריכת חשבון
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת חשבון
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
          מציג 1-{filteredAccounts.length} מתוך {filteredAccounts.length}{" "}
          חשבונות
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

      {/* Account Modal */}
      <GenericAccountModal
        isOpen={isOpen}
        onClose={onClose}
        account={selectedAccount}
        accountType={accountType}
      />
    </Box>
  );
};

export default GenericAccountsIndex;
