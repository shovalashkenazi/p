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
  Tooltip,
  useDisclosure,
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
  Tag,
  ChevronDown,
} from "lucide-react";
import GovModal from "./GovModal";

const GovIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // נתוני דוגמה - 12 כלים
  const tools = [
    {
      id: 1,
      toolNumber: "TOOL-001",
      category: 'כלי צמ"ה',
      manufacturer: "קטרפילר",
      model: "320D",
      serialNumber: "CAT320D2024001",
      year: "2020",
      status: "פעיל",
      location: "מחסן ראשי",
    },
    {
      id: 2,
      toolNumber: "TOOL-002",
      category: "כלים כבדים",
      manufacturer: "קומטסו",
      model: "PC290LC",
      serialNumber: "KOM290LC2024002",
      year: "2019",
      status: "בתיקון",
      location: "מוסך צפון",
    },
    {
      id: 3,
      toolNumber: "TOOL-003",
      category: "כלי רכב",
      manufacturer: "פורד",
      model: "F-150",
      serialNumber: "FORDF1502024003",
      year: "2022",
      status: "פעיל",
      location: "מחסן דרום",
    },
    {
      id: 4,
      toolNumber: "TOOL-004",
      category: 'כלי צמ"ה',
      manufacturer: "ג'ון דיר",
      model: "6430",
      serialNumber: "JD64302024004",
      year: "2021",
      status: "פעיל",
      location: "מחסן ראשי",
    },
    {
      id: 5,
      toolNumber: "TOOL-005",
      category: "כלים כבדים",
      manufacturer: "וולבו",
      model: "EC220E",
      serialNumber: "VOLEC220E2024005",
      year: "2018",
      status: "לא פעיל",
      location: "מחסן מרכז",
    },
    {
      id: 6,
      toolNumber: "TOOL-006",
      category: "כלי רכב",
      manufacturer: "טויוטה",
      model: "Hilux",
      serialNumber: "TOYHILUX2024006",
      year: "2023",
      status: "פעיל",
      location: "מחסן צפון",
    },
    {
      id: 7,
      toolNumber: "TOOL-007",
      category: 'כלי צמ"ה',
      manufacturer: "מסי פרגוסון",
      model: "6713",
      serialNumber: "MF67132024007",
      year: "2020",
      status: "פעיל",
      location: "מחסן דרום",
    },
    {
      id: 8,
      toolNumber: "TOOL-008",
      category: "כלים כבדים",
      manufacturer: "קייס",
      model: "CX210D",
      serialNumber: "CSECX210D2024008",
      year: "2021",
      status: "בתיקון",
      location: "מוסך מרכזי",
    },
    {
      id: 9,
      toolNumber: "TOOL-009",
      category: "כלי רכב",
      manufacturer: "שברולט",
      model: "Silverado",
      serialNumber: "CHEVSILV2024009",
      year: "2022",
      status: "פעיל",
      location: "מחסן ראשי",
    },
    {
      id: 10,
      toolNumber: "TOOL-010",
      category: 'כלי צמ"ה',
      manufacturer: "קובוטה",
      model: "M7060",
      serialNumber: "KUBM70602024010",
      year: "2019",
      status: "פעיל",
      location: "מחסן צפון",
    },
    {
      id: 11,
      toolNumber: "TOOL-011",
      category: "כלים כבדים",
      manufacturer: "יונדאי",
      model: "R160LC-9",
      serialNumber: "HYUR160LC2024011",
      year: "2020",
      status: "פעיל",
      location: "מחסן דרום",
    },
    {
      id: 12,
      toolNumber: "TOOL-012",
      category: "כלי רכב",
      manufacturer: "ניסאן",
      model: "Navara",
      serialNumber: "NISNAV2024012",
      year: "2023",
      status: "פעיל",
      location: "מחסן מרכז",
    },
  ];

  // כל הקטגוריות הזמינות במערכת
  const categories = ['כלי צמ"ה', "כלים כבדים", "כלי רכב"];

  // סינון כלים לפי קטגוריה נבחרת
  const filteredTools = useMemo(() => {
    if (!selectedCategory) return tools;
    return tools.filter((tool) => tool.category === selectedCategory);
  }, [selectedCategory, tools]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      פעיל: { colorScheme: "green" },
      בתיקון: { colorScheme: "orange" },
      "לא פעיל": { colorScheme: "red" },
    };
    const config = statusConfig[status] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {status}
      </Badge>
    );
  };

  const handleRefresh = () => {
    console.log("רענון נתונים...");
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    onOpen();
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    onOpen();
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    onOpen();
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            כלים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול כלים ממשלתיים, כבדים ותעשייתיים
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
              הוסף כלי
            </MenuButton>
            <MenuList dir="rtl" borderColor={borderColor} boxShadow="lg">
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    handleAddVehicle();
                  }}
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
          {/* category filter button */}
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
            <MenuList
              dir="rtl"
              borderColor={borderColor}
              boxShadow="lg"
              maxH="300px"
              overflowY="auto"
            >
              <ChakraMenuItem
                _hover={{ bg: hoverBg }}
                fontSize="sm"
                fontWeight={!selectedCategory ? "700" : "400"}
                color={!selectedCategory ? primary : textColor}
                onClick={() => setSelectedCategory(null)}
              >
                הצג הכל
              </ChakraMenuItem>
              <Divider my={2} borderColor={borderColor} />
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
            ? `${filteredTools.length} כלים מתוך ${tools.length} (${selectedCategory})`
            : `${tools.length} כלים במערכת`}
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
                מספר כלי
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
                קטגוריה
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
                יצרן
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
                דגם
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
                minW="180px"
              >
                מספר סידורי
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
                שנה
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
                מיקום
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
            {filteredTools.map((tool, index) => (
              <Tr
                key={tool.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="120px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {tool.toolNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge colorScheme="blue" fontSize="xs">
                    {tool.category}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {tool.manufacturer}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {tool.model}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="180px">
                  <Tooltip label={tool.serialNumber} hasArrow>
                    <Text
                      fontSize="sm"
                      color={secondaryText}
                      isTruncated
                      maxW="150px"
                    >
                      {tool.serialNumber}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {tool.year}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getStatusBadge(tool.status)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {tool.location}
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
                        onClick={() => handleViewVehicle(tool)}
                      >
                        צפייה
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditVehicle(tool)}
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
          מציג 1-{filteredTools.length} מתוך {filteredTools.length} כלים
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

      {/* Gov Modal */}
      <GovModal isOpen={isOpen} onClose={onClose} vehicle={selectedVehicle} />
    </Box>
  );
};

export default GovIndex;
