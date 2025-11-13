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
  Progress,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DriversRoutesModal from "./DriversRoutesModal";

const DriversRoutesIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState("2025-11-13");

  // נתוני דוגמה - 10 נהגים
  const drivers = [
    {
      id: 1,
      name: "יוסי כהן",
      yesterday: { completed: 12, failed: 1, total: 13 },
      today: { completed: 8, inProgress: 3, failed: 0, total: 15 },
      tomorrow: { scheduled: 14 },
    },
    {
      id: 2,
      name: "דוד לוי",
      yesterday: { completed: 10, failed: 0, total: 10 },
      today: { completed: 6, inProgress: 2, failed: 1, total: 12 },
      tomorrow: { scheduled: 11 },
    },
    {
      id: 3,
      name: "משה אברהם",
      yesterday: { completed: 15, failed: 2, total: 17 },
      today: { completed: 10, inProgress: 4, failed: 1, total: 18 },
      tomorrow: { scheduled: 16 },
    },
    {
      id: 4,
      name: "רועי ישראלי",
      yesterday: { completed: 8, failed: 0, total: 8 },
      today: { completed: 5, inProgress: 1, failed: 0, total: 9 },
      tomorrow: { scheduled: 10 },
    },
    {
      id: 5,
      name: "עמית שלום",
      yesterday: { completed: 11, failed: 1, total: 12 },
      today: { completed: 7, inProgress: 2, failed: 0, total: 11 },
      tomorrow: { scheduled: 13 },
    },
    {
      id: 6,
      name: "אלון מזרחי",
      yesterday: { completed: 9, failed: 0, total: 9 },
      today: { completed: 4, inProgress: 3, failed: 1, total: 10 },
      tomorrow: { scheduled: 12 },
    },
    {
      id: 7,
      name: "גיא פרץ",
      yesterday: { completed: 13, failed: 2, total: 15 },
      today: { completed: 9, inProgress: 5, failed: 0, total: 16 },
      tomorrow: { scheduled: 15 },
    },
    {
      id: 8,
      name: "אורי דהן",
      yesterday: { completed: 7, failed: 0, total: 7 },
      today: { completed: 3, inProgress: 2, failed: 0, total: 8 },
      tomorrow: { scheduled: 9 },
    },
    {
      id: 9,
      name: "נועם ביטון",
      yesterday: { completed: 14, failed: 1, total: 15 },
      today: { completed: 11, inProgress: 3, failed: 1, total: 17 },
      tomorrow: { scheduled: 14 },
    },
    {
      id: 10,
      name: "יניב חדד",
      yesterday: { completed: 10, failed: 0, total: 10 },
      today: { completed: 6, inProgress: 4, failed: 0, total: 13 },
      tomorrow: { scheduled: 11 },
    },
  ];

  // חישוב סיכומים
  const totalCompleted = drivers.reduce(
    (sum, d) => sum + d.today.completed,
    0
  );
  const totalFailed = drivers.reduce((sum, d) => sum + d.today.failed, 0);
  const totalCards = drivers.reduce((sum, d) => sum + d.today.total, 0);

  const handleAddDriver = () => {
    setSelectedDriver(null);
    onOpen();
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    onOpen();
  };

  const handlePreviousDay = () => {
    console.log("מעבר ליום הקודם");
  };

  const handleNextDay = () => {
    console.log("מעבר ליום הבא");
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
            מסלולי נהגים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול מסלולי נהגים וכרטיסי עבודה יומיים
          </Text>
        </Box>
      </Flex>

      {/* Date Navigation */}
      <Flex justify="center" align="center" mb={6}>
        <HStack spacing={4}>
          <Button
            leftIcon={<ChevronRight size={20} />}
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
            onClick={handleNextDay}
          >
            יום הבא
          </Button>
          <Box
            px={6}
            py={3}
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            boxShadow="sm"
          >
            <Text fontSize="lg" fontWeight="700" color={textColor}>
              {currentDate}
            </Text>
          </Box>
          <Button
            rightIcon={<ChevronLeft size={20} />}
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
            onClick={handlePreviousDay}
          >
            יום קודם
          </Button>
        </HStack>
      </Flex>

      {/* Status Summary */}
      <Flex justify="center" align="center" mb={8}>
        <HStack spacing={6}>
          <Box
            px={6}
            py={4}
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="xl"
            boxShadow="md"
            textAlign="center"
          >
            <Text fontSize="sm" color={secondaryText} mb={1}>
              בוצעו
            </Text>
            <Badge colorScheme="green" fontSize="xl" px={4} py={2}>
              {totalCompleted}
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
          >
            <Text fontSize="sm" color={secondaryText} mb={1}>
              נכשלו
            </Text>
            <Badge colorScheme="red" fontSize="xl" px={4} py={2}>
              {totalFailed}
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
          >
            <Text fontSize="sm" color={secondaryText} mb={1}>
              סה״כ כרטיסים
            </Text>
            <Badge colorScheme="blue" fontSize="xl" px={4} py={2}>
              {totalCards}
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
          >
            <Text fontSize="sm" color={secondaryText} mb={1}>
              סיכום כללי
            </Text>
            <Badge colorScheme="orange" fontSize="xl" px={4} py={2}>
              {((totalCompleted / totalCards) * 100).toFixed(0)}%
            </Badge>
          </Box>
        </HStack>
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
            onClick={handleAddDriver}
          >
            הוספת נהג
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
          {drivers.length} נהגים פעילים
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
                נהג
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
                אתמול
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
                התקדמות היום
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
                מחר
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
            {drivers.map((driver, index) => (
              <Tr
                key={driver.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {driver.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="180px">
                  <HStack spacing={2}>
                    <Badge colorScheme="green" fontSize="xs">
                      {driver.yesterday.completed}
                    </Badge>
                    <Text fontSize="xs" color={secondaryText}>
                      /
                    </Text>
                    <Badge colorScheme="gray" fontSize="xs">
                      {driver.yesterday.total}
                    </Badge>
                    {driver.yesterday.failed > 0 && (
                      <>
                        <Text fontSize="xs" color={secondaryText}>
                          |
                        </Text>
                        <Badge colorScheme="red" fontSize="xs">
                          {driver.yesterday.failed} נכשל
                        </Badge>
                      </>
                    )}
                  </HStack>
                </Td>
                <Td borderColor={borderColor} py={3} minW="250px">
                  <Box>
                    <HStack spacing={2} mb={2}>
                      <Badge colorScheme="green" fontSize="xs">
                        {driver.today.completed} בוצע
                      </Badge>
                      <Badge colorScheme="blue" fontSize="xs">
                        {driver.today.inProgress} במסלול
                      </Badge>
                      {driver.today.failed > 0 && (
                        <Badge colorScheme="red" fontSize="xs">
                          {driver.today.failed} נכשל
                        </Badge>
                      )}
                    </HStack>
                    <Progress
                      value={(driver.today.completed / driver.today.total) * 100}
                      size="sm"
                      colorScheme="green"
                      borderRadius="full"
                    />
                    <Text fontSize="xs" color={secondaryText} mt={1}>
                      {driver.today.completed} / {driver.today.total} (
                      {((driver.today.completed / driver.today.total) * 100).toFixed(0)}
                      %)
                    </Text>
                  </Box>
                </Td>
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Badge colorScheme="purple" fontSize="xs">
                    {driver.tomorrow.scheduled} מתוכנן
                  </Badge>
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
                        onClick={() => handleEditDriver(driver)}
                      >
                        צפייה במסלול
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                      >
                        עריכת מסלול
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת נהג
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
          מציג 1-{drivers.length} מתוך {drivers.length} נהגים
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

      {/* Drivers Routes Modal */}
      <DriversRoutesModal
        isOpen={isOpen}
        onClose={onClose}
        driver={selectedDriver}
      />
    </Box>
  );
};

export default DriversRoutesIndex;
