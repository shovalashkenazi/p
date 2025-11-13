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
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import {
  Search,
  MoreVertical,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  Printer,
  Edit,
  FileText,
} from "lucide-react";

const WarehousesPortalIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // נתונים סטטיסטיים
  const stats = {
    picking: 34,
    production: 12,
    ordered: 18,
    receiving: 8,
    shipping: 15,
  };

  // נתוני דוגמה - 12 מסמכים
  const documents = [
    {
      id: 1,
      docNumber: "DOC-2025-001",
      category: "הזמנת רכש",
      customer: "משה כהן",
      createdDate: "10/01/2025",
      docStatus: "ממתין",
      city: "תל אביב",
      items: 5,
      pickingStatus: "לליקוט",
    },
    {
      id: 2,
      docNumber: "DOC-2025-002",
      category: "תעודת משלוח",
      customer: "שרה אברהם",
      createdDate: "11/01/2025",
      docStatus: "מאושר",
      city: "רמת גן",
      items: 3,
      pickingStatus: "בתהליך",
    },
    {
      id: 3,
      docNumber: "DOC-2025-003",
      category: "החזרת סחורה",
      customer: "דוד ישראלי",
      createdDate: "12/01/2025",
      docStatus: "בוצע",
      city: "פתח תקווה",
      items: 2,
      pickingStatus: "הושלם",
    },
    {
      id: 4,
      docNumber: "DOC-2025-004",
      category: "הזמנת רכש",
      customer: "רחל שלום",
      createdDate: "13/01/2025",
      docStatus: "ממתין",
      city: "ראשון לציון",
      items: 8,
      pickingStatus: "לליקוט",
    },
    {
      id: 5,
      docNumber: "DOC-2025-005",
      category: "תעודת משלוח",
      customer: "יוסף מזרחי",
      createdDate: "14/01/2025",
      docStatus: "מאושר",
      city: "תל אביב",
      items: 4,
      pickingStatus: "בתהליך",
    },
    {
      id: 6,
      docNumber: "DOC-2025-006",
      category: "ניפוק סחורה",
      customer: "מרים ביטון",
      createdDate: "15/01/2025",
      docStatus: "בוצע",
      city: "בני ברק",
      items: 6,
      pickingStatus: "הושלם",
    },
    {
      id: 7,
      docNumber: "DOC-2025-007",
      category: "הזמנת רכש",
      customer: "אברהם חדד",
      createdDate: "16/01/2025",
      docStatus: "ממתין",
      city: "הרצליה",
      items: 7,
      pickingStatus: "לליקוט",
    },
    {
      id: 8,
      docNumber: "DOC-2025-008",
      category: "תעודת משלוח",
      customer: "שרה פרץ",
      createdDate: "17/01/2025",
      docStatus: "מאושר",
      city: "תל אביב",
      items: 3,
      pickingStatus: "בתהליך",
    },
    {
      id: 9,
      docNumber: "DOC-2025-009",
      category: "החזרת סחורה",
      customer: "דניאל לוי",
      createdDate: "18/01/2025",
      docStatus: "בוצע",
      city: "רמת גן",
      items: 2,
      pickingStatus: "הושלם",
    },
    {
      id: 10,
      docNumber: "DOC-2025-010",
      category: "ניפוק סחורה",
      customer: "תמר כהן",
      createdDate: "19/01/2025",
      docStatus: "ממתין",
      city: "רמת גן",
      items: 5,
      pickingStatus: "לליקוט",
    },
    {
      id: 11,
      docNumber: "DOC-2025-011",
      category: "הזמנת רכש",
      customer: "אורי דהן",
      createdDate: "20/01/2025",
      docStatus: "מאושר",
      city: "חולון",
      items: 9,
      pickingStatus: "בתהליך",
    },
    {
      id: 12,
      docNumber: "DOC-2025-012",
      category: "תעודת משלוח",
      customer: "נועה ישראלי",
      createdDate: "21/01/2025",
      docStatus: "בוצע",
      city: "בת ים",
      items: 4,
      pickingStatus: "הושלם",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      ממתין: { colorScheme: "yellow" },
      מאושר: { colorScheme: "blue" },
      בוצע: { colorScheme: "green" },
    };
    const config = statusConfig[status] || { colorScheme: "gray" };
    return (
      <Badge colorScheme={config.colorScheme} fontSize="xs">
        {status}
      </Badge>
    );
  };

  const getPickingStatusBadge = (status) => {
    const statusConfig = {
      לליקוט: { colorScheme: "red" },
      בתהליך: { colorScheme: "orange" },
      הושלם: { colorScheme: "green" },
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

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === documents.length
        ? []
        : documents.map((doc) => doc.id)
    );
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            פורטל מחסנים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            מעקב וניהול מסמכי מחסן וסטטוס ליקוט
          </Text>
        </Box>
      </Flex>

      {/* Statistics Badges */}
      <Flex justify="center" align="center" mb={8} gap={4} flexWrap="wrap">
        <Box
          px={6}
          py={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
          minW="150px"
        >
          <Text fontSize="sm" color={secondaryText} mb={2}>
            פריטים לליקוט
          </Text>
          <Badge colorScheme="red" fontSize="2xl" px={4} py={2}>
            {stats.picking}
          </Badge>
        </Box>
        <Box
          px={6}
          py={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
          minW="150px"
        >
          <Text fontSize="sm" color={secondaryText} mb={2}>
            פריטים בייצור
          </Text>
          <Badge colorScheme="orange" fontSize="2xl" px={4} py={2}>
            {stats.production}
          </Badge>
        </Box>
        <Box
          px={6}
          py={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
          minW="150px"
        >
          <Text fontSize="sm" color={secondaryText} mb={2}>
            פריטים בהזמנה
          </Text>
          <Badge colorScheme="blue" fontSize="2xl" px={4} py={2}>
            {stats.ordered}
          </Badge>
        </Box>
        <Box
          px={6}
          py={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
          minW="150px"
        >
          <Text fontSize="sm" color={secondaryText} mb={2}>
            קבלה / החזרה סחורה
          </Text>
          <Badge colorScheme="purple" fontSize="2xl" px={4} py={2}>
            {stats.receiving}
          </Badge>
        </Box>
        <Box
          px={6}
          py={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
          minW="150px"
        >
          <Text fontSize="sm" color={secondaryText} mb={2}>
            ניפוק סחורה
          </Text>
          <Badge colorScheme="green" fontSize="2xl" px={4} py={2}>
            {stats.shipping}
          </Badge>
        </Box>
      </Flex>

      {/* Action Bar - Row 1 */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
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
          {documents.length} מסמכים במערכת
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
                textAlign="center"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                <Checkbox
                  isChecked={selectedItems.length === documents.length}
                  onChange={toggleSelectAll}
                  colorScheme="orange"
                />
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
                מס׳ מסמך
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
                תאריך יצירה
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
                סטטוס מסמך
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
                textAlign="right"
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                textTransform="none"
                borderColor={borderColor}
                py={4}
                whiteSpace="nowrap"
              >
                פריטים
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
                סטטוס ליקוט
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
            {documents.map((doc, index) => (
              <Tr
                key={doc.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} textAlign="center">
                  <Checkbox
                    isChecked={selectedItems.includes(doc.id)}
                    onChange={() => toggleSelectItem(doc.id)}
                    colorScheme="orange"
                  />
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {doc.docNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.category}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.customer}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.createdDate}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getStatusBadge(doc.docStatus)}
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.city}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge colorScheme="blue" fontSize="xs">
                    {doc.items}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  {getPickingStatusBadge(doc.pickingStatus)}
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
                        icon={<Printer size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        הדפס מדבקות
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        ערוך כרטיס
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<FileText size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        צפה ב-PDF
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
          מציג 1-{documents.length} מתוך {documents.length} מסמכים
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
    </Box>
  );
};

export default WarehousesPortalIndex;
