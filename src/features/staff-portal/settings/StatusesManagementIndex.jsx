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
import StatusModal from "./StatusModal";

const StatusesManagementIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 14 סטטוסים
  const statuses = [
    {
      id: 1,
      name: "ממתין להצעת מחיר",
      identifier: "STATUS-001",
    },
    {
      id: 2,
      name: "הצעת מחיר מוכנה",
      identifier: "STATUS-002",
    },
    {
      id: 3,
      name: "ממתין לתשלום",
      identifier: "STATUS-003",
    },
    {
      id: 4,
      name: "בבדיקה מול הספק החיצוני",
      identifier: "STATUS-004",
    },
    {
      id: 5,
      name: "נאסף",
      identifier: "STATUS-005",
    },
    {
      id: 6,
      name: "בוצע",
      identifier: "STATUS-006",
    },
    {
      id: 7,
      name: "אושר",
      identifier: "STATUS-007",
    },
    {
      id: 8,
      name: "בחיסום",
      identifier: "STATUS-008",
    },
    {
      id: 9,
      name: "נשלח הצעת מחיר ללקוח",
      identifier: "STATUS-009",
    },
    {
      id: 10,
      name: "נכשל",
      identifier: "STATUS-010",
    },
    {
      id: 11,
      name: "בוטל",
      identifier: "STATUS-011",
    },
    {
      id: 12,
      name: "לא אישר הצעת מחיר",
      identifier: "STATUS-012",
    },
    {
      id: 13,
      name: "ממתין להזמנת רכש",
      identifier: "STATUS-013",
    },
    {
      id: 14,
      name: "הוצאת עבודה",
      identifier: "STATUS-014",
    },
  ];

  const handleAddStatus = () => {
    setSelectedStatus(null);
    onOpen();
  };

  const handleEditStatus = (status) => {
    setSelectedStatus(status);
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
            ניהול סטטוסים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול סטטוסים במערכת לכרטיסי עבודה ומסמכים
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
            onClick={handleAddStatus}
          >
            יצירת סטטוס חדש
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
          {statuses.length} סטטוסים במערכת
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
                minW="350px"
              >
                שם הסטטוס
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
                מזהה
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
            {statuses.map((status, index) => (
              <Tr
                key={status.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="350px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {status.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" color={secondaryText}>
                    {status.identifier}
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
                        onClick={() => handleEditStatus(status)}
                      >
                        צפייה
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditStatus(status)}
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
          מציג 1-{statuses.length} מתוך {statuses.length} סטטוסים
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

      {/* Status Modal */}
      <StatusModal isOpen={isOpen} onClose={onClose} status={selectedStatus} />
    </Box>
  );
};

export default StatusesManagementIndex;
