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
  Edit,
  Eye,
  Trash2,
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  FileText,
} from "lucide-react";
import ServiceContractModal from "./ServiceContractModal";

const ServiceContractsIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 10 כתבי שירות
  const contracts = [
    {
      id: 1,
      contractCode: "SC-2025-001",
      subscriptionType: "מנוי זהב",
      annualPrice: "₪5,000",
      serviceLocation: "תל אביב והמרכז",
      deductible: "₪200",
    },
    {
      id: 2,
      contractCode: "SC-2025-002",
      subscriptionType: "מנוי כסף",
      annualPrice: "₪3,500",
      serviceLocation: "חיפה והצפון",
      deductible: "₪300",
    },
    {
      id: 3,
      contractCode: "SC-2025-003",
      subscriptionType: "מנוי ברונזה",
      annualPrice: "₪2,000",
      serviceLocation: "באר שבע והדרום",
      deductible: "₪400",
    },
    {
      id: 4,
      contractCode: "SC-2025-004",
      subscriptionType: "מנוי זהב",
      annualPrice: "₪5,000",
      serviceLocation: "ירושלים והסביבה",
      deductible: "₪200",
    },
    {
      id: 5,
      contractCode: "SC-2025-005",
      subscriptionType: "מנוי פרימיום",
      annualPrice: "₪7,500",
      serviceLocation: "כל הארץ",
      deductible: "₪0",
    },
    {
      id: 6,
      contractCode: "SC-2025-006",
      subscriptionType: "מנוי כסף",
      annualPrice: "₪3,500",
      serviceLocation: "פתח תקווה ורמת גן",
      deductible: "₪300",
    },
    {
      id: 7,
      contractCode: "SC-2025-007",
      subscriptionType: "מנוי ברונזה",
      annualPrice: "₪2,000",
      serviceLocation: "נתניה והשרון",
      deductible: "₪400",
    },
    {
      id: 8,
      contractCode: "SC-2025-008",
      subscriptionType: "מנוי זהב",
      annualPrice: "₪5,000",
      serviceLocation: "אשדוד ואשקלון",
      deductible: "₪200",
    },
    {
      id: 9,
      contractCode: "SC-2025-009",
      subscriptionType: "מנוי פרימיום",
      annualPrice: "₪7,500",
      serviceLocation: "כל הארץ",
      deductible: "₪0",
    },
    {
      id: 10,
      contractCode: "SC-2025-010",
      subscriptionType: "מנוי כסף",
      annualPrice: "₪3,500",
      serviceLocation: "רעננה והרצליה",
      deductible: "₪300",
    },
  ];

  const handleAddContract = () => {
    setSelectedContract(null);
    onOpen();
  };

  const handleEditContract = (contract) => {
    setSelectedContract(contract);
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
            כתבי שירות
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול כתבי שירות והסכמי תחזוקה
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
            onClick={handleAddContract}
          >
            יצירת כתב שירות
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
          {contracts.length} כתבי שירות במערכת
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
                מק״ט כתב שירות
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
                סוג המנוי
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
                מחיר מנוי שנתי
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
                מיקום קבלת שירות
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
                השתתפות עצמית
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
            {contracts.map((contract, index) => (
              <Tr
                key={contract.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {contract.contractCode}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme={
                      contract.subscriptionType === "מנוי פרימיום"
                        ? "purple"
                        : contract.subscriptionType === "מנוי זהב"
                        ? "orange"
                        : contract.subscriptionType === "מנוי כסף"
                        ? "blue"
                        : "gray"
                    }
                    fontSize="xs"
                  >
                    {contract.subscriptionType}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {contract.annualPrice}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={contract.serviceLocation} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {contract.serviceLocation}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {contract.deductible}
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
                        צפייה בכתב שירות
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditContract(contract)}
                      >
                        עריכת כתב שירות
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<FileText size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפייה ב-PDF
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת כתב שירות
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
          מציג 1-{contracts.length} מתוך {contracts.length} כתבי שירות
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

      {/* Service Contract Modal */}
      <ServiceContractModal
        isOpen={isOpen}
        onClose={onClose}
        contract={selectedContract}
      />
    </Box>
  );
};

export default ServiceContractsIndex;
