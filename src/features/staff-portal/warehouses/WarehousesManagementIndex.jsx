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
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import WarehouseManagementModal from "./WarehouseManagementModal";

const WarehousesManagementIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 12 מחסנים
  const warehouses = [
    {
      id: 1,
      warehouseNumber: "WH-001",
      name: "מחסן ראשי תל אביב",
      address: "רחוב ההסתדרות 35, תל אביב",
      type: "מרכזי",
      manager: "יוסי כהן",
      totalProducts: 1250,
    },
    {
      id: 2,
      warehouseNumber: "WH-002",
      name: "מחסן צפון",
      address: "שדרות בן גוריון 88, חיפה",
      type: "אזורי",
      manager: "שרה לוי",
      totalProducts: 890,
    },
    {
      id: 3,
      warehouseNumber: "WH-003",
      name: "מחסן דרום",
      address: "דרך בר לב 12, באר שבע",
      type: "אזורי",
      manager: "דוד מזרחי",
      totalProducts: 670,
    },
    {
      id: 4,
      warehouseNumber: "WH-004",
      name: "מחסן מרכז",
      address: "רחוב הרצל 45, פתח תקווה",
      type: "מרכזי",
      manager: "רחל אברהם",
      totalProducts: 1100,
    },
    {
      id: 5,
      warehouseNumber: "WH-005",
      name: "מחסן ירושלים",
      address: "דרך חברון 21, ירושלים",
      type: "אזורי",
      manager: "משה ביטון",
      totalProducts: 750,
    },
    {
      id: 6,
      warehouseNumber: "WH-006",
      name: "מחסן ראשון לציון",
      address: "רחוב רוטשילד 10, ראשון לציון",
      type: "מקומי",
      manager: "אורי דהן",
      totalProducts: 450,
    },
    {
      id: 7,
      warehouseNumber: "WH-007",
      name: "מחסן חולון",
      address: "שדרות וייצמן 67, חולון",
      type: "מקומי",
      manager: "תמר שלום",
      totalProducts: 380,
    },
    {
      id: 8,
      warehouseNumber: "WH-008",
      name: "מחסן נתניה",
      address: "רחוב הרצל 55, נתניה",
      type: "אזורי",
      manager: "אבי ישראלי",
      totalProducts: 820,
    },
    {
      id: 9,
      warehouseNumber: "WH-009",
      name: "מחסן אשדוד",
      address: "דרך מנחם בגין 33, אשדוד",
      type: "אזורי",
      manager: "נועה חדד",
      totalProducts: 690,
    },
    {
      id: 10,
      warehouseNumber: "WH-010",
      name: "מחסן קריות",
      address: "רחוב ההגנה 78, קרית מוצקין",
      type: "מקומי",
      manager: "גיא פרץ",
      totalProducts: 420,
    },
    {
      id: 11,
      warehouseNumber: "WH-011",
      name: "מחסן מודיעין",
      address: 'שדרות שז"ר 15, מודיעין',
      type: "מקומי",
      manager: "ליאת כהן",
      totalProducts: 510,
    },
    {
      id: 12,
      warehouseNumber: "WH-012",
      name: "מחסן רמת גן",
      address: "רחוב ביאליק 24, רמת גן",
      type: "מקומי",
      manager: "רונן עמר",
      totalProducts: 340,
    },
  ];

  const getTypeBadge = (type) => {
    const typeConfig = {
      מרכזי: { colorScheme: "purple" },
      אזורי: { colorScheme: "blue" },
      מקומי: { colorScheme: "green" },
    };
    const config = typeConfig[type] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {type}
      </Badge>
    );
  };

  const handleAddWarehouse = () => {
    setSelectedWarehouse(null);
    onOpen();
  };

  const handleEditWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
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
            ניהול מחסנים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול מחסנים וסניפים במערכת
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
            onClick={handleAddWarehouse}
          >
            יצירת מחסן
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
          {warehouses.length} מחסנים במערכת
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
                minW="120px"
              >
                מספר מחסן
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
                minW="200px"
              >
                שם המחסן
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
                minW="250px"
              >
                כתובת מחסן
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
                סוג מחסן
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
                מנהל מחסן
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
                סה״כ כמות מוצרים
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
            {warehouses.map((warehouse, index) => (
              <Tr
                key={warehouse.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="120px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {warehouse.warehouseNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="200px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {warehouse.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="250px">
                  <Text fontSize="sm" color={secondaryText}>
                    {warehouse.address}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getTypeBadge(warehouse.type)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {warehouse.manager}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={primary}>
                    {warehouse.totalProducts.toLocaleString()}
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
                        onClick={() => handleEditWarehouse(warehouse)}
                      >
                        צפייה
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditWarehouse(warehouse)}
                      >
                        עריכה
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        color="red.500"
                      >
                        מחיקה
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
          מציג 1-{warehouses.length} מתוך {warehouses.length} מחסנים
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

      {/* Warehouse Modal */}
      <WarehouseManagementModal
        isOpen={isOpen}
        onClose={onClose}
        warehouse={selectedWarehouse}
      />
    </Box>
  );
};

export default WarehousesManagementIndex;
