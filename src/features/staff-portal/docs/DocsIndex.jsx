import React, { useState, useMemo } from "react";
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
  Plus,
  Filter,
  Columns,
  Download,
  Upload,
  RefreshCw,
  Mail,
  FileDown,
  MessageCircle,
  Printer,
  Tag,
  ChevronDown,
} from "lucide-react";
import DocModal from "./DocModal";

const DocsIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // נתוני דוגמה - 12 מסמכים
  const documents = [
    {
      id: 1,
      status: "פעיל",
      docNumber: "DOC-2024-001",
      category: "הצעת מחיר",
      createdDate: "15/01/2024",
      deliveryDate: "20/01/2024",
      clientName: "חברת גלובל טראנס בע״מ",
      clientId: "514567890",
      vehicleNumber: "12-345-67",
      manufacturer: "קטרפילר",
      model: "320D",
      chassisNumber: "CAT320D2024001",
      generalStatus: "ממתין לאישור",
      handler: "יוסי כהן",
      installer: "דוד לוי",
      storekeeper: "משה אברהם",
      totalPrice: 45000,
    },
    {
      id: 2,
      status: "הושלם",
      docNumber: "DOC-2024-002",
      category: "חשבונית",
      createdDate: "16/01/2024",
      deliveryDate: "18/01/2024",
      clientName: "משה דוד",
      clientId: "123456789",
      vehicleNumber: "45-678-90",
      manufacturer: "ג'ון דיר",
      model: "6430",
      chassisNumber: "JD6430X2024002",
      generalStatus: "הושלם",
      handler: "שרה כהן",
      installer: "אבי ישראלי",
      storekeeper: "רונית ברוך",
      totalPrice: 32000,
    },
    {
      id: 3,
      status: "פעיל",
      docNumber: "DOC-2024-003",
      category: "כרטיס עבודה",
      createdDate: "17/01/2024",
      deliveryDate: "25/01/2024",
      clientName: "חברת אגרו מכונות בע״מ",
      clientId: "520987654",
      vehicleNumber: "78-901-23",
      manufacturer: "קומטסו",
      model: "PC290LC",
      chassisNumber: "KOM290LC2024003",
      generalStatus: "בטיפול",
      handler: "דני כהן",
      installer: "יצחק לוי",
      storekeeper: "משה אברהם",
      totalPrice: 58000,
    },
    {
      id: 4,
      status: "בוטל",
      docNumber: "DOC-2024-004",
      category: "חשבונית זיכוי",
      createdDate: "18/01/2024",
      deliveryDate: "22/01/2024",
      clientName: "רחל שמש",
      clientId: "234567890",
      vehicleNumber: "11-222-33",
      manufacturer: "וולבו",
      model: "EC220E",
      chassisNumber: "VOLEC220E2024004",
      generalStatus: "בוטל",
      handler: "אורי אלון",
      installer: "לא שויך",
      storekeeper: "רונית ברוך",
      totalPrice: 0,
    },
    {
      id: 5,
      status: "פעיל",
      category: "קבלה",
      docNumber: "DOC-2024-005",
      createdDate: "19/01/2024",
      deliveryDate: "28/01/2024",
      clientName: "חברת השדה הירוק בע״מ",
      clientId: "515678901",
      vehicleNumber: "55-666-77",
      manufacturer: "מסי פרגוסון",
      model: "6713",
      chassisNumber: "MF6713Y2024005",
      generalStatus: "ממתין לחלקים",
      handler: "שרה כהן",
      installer: "דוד לוי",
      storekeeper: "משה אברהם",
      totalPrice: 41000,
    },
    {
      id: 6,
      status: "הושלם",
      docNumber: "DOC-2024-006",
      category: "תעודת החזרה",
      createdDate: "20/01/2024",
      deliveryDate: "21/01/2024",
      clientName: "יעקב אברהם",
      clientId: "345678901",
      vehicleNumber: "88-999-00",
      manufacturer: "קייס",
      model: "IH 340",
      chassisNumber: "CSEIH340Z2024006",
      generalStatus: "הושלם",
      handler: "דני כהן",
      installer: "אבי ישראלי",
      storekeeper: "רונית ברוך",
      totalPrice: 28500,
    },
    {
      id: 7,
      status: "פעיל",
      docNumber: "DOC-2024-007",
      category: "הצעת מחיר",
      createdDate: "21/01/2024",
      deliveryDate: "30/01/2024",
      clientName: "חברת אופק טכנולוגיות בע״מ",
      clientId: "518765432",
      vehicleNumber: "22-333-44",
      manufacturer: "קובוטה",
      model: "M7060",
      chassisNumber: "KUBM7060A2024007",
      generalStatus: "בטיפול",
      handler: "יוסי כהן",
      installer: "יצחק לוי",
      storekeeper: "משה אברהם",
      totalPrice: 38000,
    },
    {
      id: 8,
      status: "הושלם",
      docNumber: "DOC-2024-008",
      category: "חשבונית",
      createdDate: "22/01/2024",
      deliveryDate: "24/01/2024",
      clientName: "שרה לוי",
      clientId: "456789012",
      vehicleNumber: "33-444-55",
      manufacturer: "יונדאי",
      model: "R160LC-9",
      chassisNumber: "HYUR160LC2024008",
      generalStatus: "הושלם",
      handler: "אורי אלון",
      installer: "דוד לוי",
      storekeeper: "רונית ברוך",
      totalPrice: 35500,
    },
    {
      id: 9,
      status: "פעיל",
      docNumber: "DOC-2024-009",
      category: "תעודת משלוח",
      createdDate: "23/01/2024",
      deliveryDate: "02/02/2024",
      clientName: "חברת דרך החקלאות בע״מ",
      clientId: "512345678",
      vehicleNumber: "66-777-88",
      manufacturer: "ג'ון דיר",
      model: "8320R",
      chassisNumber: "JD8320R2024009",
      generalStatus: "ממתין לאישור",
      handler: "שרה כהן",
      installer: "אבי ישראלי",
      storekeeper: "משה אברהם",
      totalPrice: 52000,
    },
    {
      id: 10,
      status: "פעיל",
      docNumber: "DOC-2024-010",
      category: "כרטיס עבודה",
      createdDate: "24/01/2024",
      deliveryDate: "05/02/2024",
      clientName: "דוד בן דוד",
      clientId: "567890123",
      vehicleNumber: "99-000-11",
      manufacturer: "קטרפילר",
      model: "336F",
      chassisNumber: "CAT336F2024010",
      generalStatus: "בטיפול",
      handler: "דני כהן",
      installer: "יצחק לוי",
      storekeeper: "משה אברהם",
      totalPrice: 46500,
    },
    {
      id: 11,
      status: "הושלם",
      docNumber: "DOC-2024-011",
      category: "חשבונית מס",
      createdDate: "25/01/2024",
      deliveryDate: "27/01/2024",
      clientName: "חברת כוח המנוף בע״מ",
      clientId: "519876543",
      vehicleNumber: "44-555-66",
      manufacturer: "ניו הולנד",
      model: "T7.315",
      chassisNumber: "NHT7315B2024011",
      generalStatus: "הושלם",
      handler: "יוסי כהן",
      installer: "דוד לוי",
      storekeeper: "רונית ברוך",
      totalPrice: 48000,
    },
    {
      id: 12,
      status: "פעיל",
      docNumber: "DOC-2024-012",
      category: "הצעת מחיר",
      createdDate: "26/01/2024",
      deliveryDate: "08/02/2024",
      clientName: "אברהם יצחק",
      clientId: "678901234",
      vehicleNumber: "77-888-99",
      manufacturer: "קייס",
      model: "CX210D",
      chassisNumber: "CSECX210D2024012",
      generalStatus: "ממתין לחלקים",
      handler: "אורי אלון",
      installer: "אבי ישראלי",
      storekeeper: "משה אברהם",
      totalPrice: 39500,
    },
  ];

  // כל הקטגוריות הזמינות במערכת
  const categories = [
    "הצעת מחיר",
    "חשבונית",
    "קבלה",
    "כרטיס עבודה",
    "תעודת החזרה",
    "חשבונית זיכוי",
    "תעודת משלוח",
    "חשבונית מס",
    "הזמנת רכש",
    "דוח עבודה",
  ];

  // סינון מסמכים לפי קטגוריה נבחרת
  const filteredDocuments = useMemo(() => {
    if (!selectedCategory) return documents;
    return documents.filter((doc) => doc.category === selectedCategory);
  }, [selectedCategory, documents]);

  const getStatusColor = (status) => {
    switch (status) {
      case "פעיל":
        return "blue";
      case "הושלם":
        return "green";
      case "בוטל":
        return "red";
      default:
        return "gray";
    }
  };

  const getGeneralStatusColor = (status) => {
    switch (status) {
      case "הושלם":
        return "green";
      case "בטיפול":
        return "blue";
      case "ממתין לאישור":
        return "orange";
      case "ממתין לחלקים":
        return "yellow";
      case "בוטל":
        return "red";
      default:
        return "gray";
    }
  };

  const handleAddDoc = (category = null) => {
    setSelectedDoc(null);
    if (category) {
      setSelectedCategory(category);
    }
    onOpen();
  };

  const handleEditDoc = (doc) => {
    setSelectedDoc(doc);
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
            הנהלת חשבונות
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            נהל מסמכים, הצעות מחיר ותעודות משלוח
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
              הוספת מסמך
            </MenuButton>
            <MenuList
              dir="rtl"
              borderColor={borderColor}
              boxShadow="lg"
              maxH="300px"
              overflowY="auto"
            >
              {categories.map((category) => (
                <ChakraMenuItem
                  key={category}
                  _hover={{ bg: hoverBg }}
                  fontSize="sm"
                  onClick={() => handleAddDoc(category)}
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
          {selectedCategory
            ? `${filteredDocuments.length} מסמכים מתוך ${documents.length} (${selectedCategory})`
            : `${documents.length} מסמכים במערכת`}
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
                מספר מסמך
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
                תאריך משלוח
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
                לקוח / שם חברה
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
                ח.פ / ת.ז
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
                minW="150px"
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
                שם יצרן
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
                minW="150px"
              >
                מספר שלדה
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
                סטטוס כללי
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
                גורם מטפל
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
                מתקין
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
                מחסנאי
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
                מחיר כולל
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
            {filteredDocuments.map((doc, index) => (
              <Tr
                key={doc.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme={getStatusColor(doc.status)}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {doc.status}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Tooltip label={doc.docNumber} hasArrow>
                    <Text fontSize="sm" fontWeight="600" color={textColor} isTruncated maxW="150px">
                      {doc.docNumber}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.createdDate}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.deliveryDate}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="200px">
                  <Tooltip label={doc.clientName} hasArrow>
                    <Text fontSize="sm" color={textColor} fontWeight="500" isTruncated>
                      {doc.clientName}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.clientId}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {doc.vehicleNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="120px">
                  <Tooltip label={doc.manufacturer} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {doc.manufacturer}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.model}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" color={secondaryText}>
                    {doc.chassisNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Badge
                    colorScheme={getGeneralStatusColor(doc.generalStatus)}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {doc.generalStatus}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="130px">
                  <Tooltip label={doc.handler} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {doc.handler}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="130px">
                  <Tooltip label={doc.installer} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {doc.installer}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="130px">
                  <Tooltip label={doc.storekeeper} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {doc.storekeeper}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    ₪{doc.totalPrice.toLocaleString()}
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
                        icon={<Mail size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        שלח במייל
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<FileDown size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        הורד PDF
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<MessageCircle size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        שלח ב־WhatsApp
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Printer size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        הדפסת ברקוד
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
          מציג 1-{filteredDocuments.length} מתוך {filteredDocuments.length} מסמכים
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

      {/* Doc Modal */}
      <DocModal
        isOpen={isOpen}
        onClose={onClose}
        doc={selectedDoc}
      />
    </Box>
  );
};

export default DocsIndex;
