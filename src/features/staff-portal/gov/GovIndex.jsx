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
import GovModal from "./GovModal";

const GovIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה - 12 כלים
  const vehicles = [
    {
      id: 1,
      vehicleNumber: "12-345-67",
      chassisNumber: "CAT320D2024001",
      manufacturer: "קטרפילר",
      model: "320D",
      year: "2020",
      description: "מחפר הידראולי 20 טון",
    },
    {
      id: 2,
      vehicleNumber: "45-678-90",
      chassisNumber: "JD6430X2024002",
      manufacturer: "ג'ון דיר",
      model: "6430",
      year: "2019",
      description: "טרקטור חקלאי 130 כ״ס",
    },
    {
      id: 3,
      vehicleNumber: "78-901-23",
      chassisNumber: "KOM290LC2024003",
      manufacturer: "קומטסו",
      model: "PC290LC",
      year: "2021",
      description: "מחפר זחלים 29 טון",
    },
    {
      id: 4,
      vehicleNumber: "11-222-33",
      chassisNumber: "VOLEC220E2024004",
      manufacturer: "וולבו",
      model: "EC220E",
      year: "2018",
      description: "מחפר 22 טון עם מצלמות",
    },
    {
      id: 5,
      vehicleNumber: "55-666-77",
      chassisNumber: "MF6713Y2024005",
      manufacturer: "מסי פרגוסון",
      model: "6713",
      year: "2022",
      description: "טרקטור עם תא ממוזג",
    },
    {
      id: 6,
      vehicleNumber: "88-999-00",
      chassisNumber: "CSEIH340Z2024006",
      manufacturer: "קייס",
      model: "IH 340",
      year: "2017",
      description: "מעמיס פורקן אחורי",
    },
    {
      id: 7,
      vehicleNumber: "22-333-44",
      chassisNumber: "KUBM7060A2024007",
      manufacturer: "קובוטה",
      model: "M7060",
      year: "2020",
      description: "טרקטור קומפקטי 70 כ״ס",
    },
    {
      id: 8,
      vehicleNumber: "33-444-55",
      chassisNumber: "HYUR160LC2024008",
      manufacturer: "יונדאי",
      model: "R160LC-9",
      year: "2021",
      description: "מחפר זחלים 16 טון",
    },
    {
      id: 9,
      vehicleNumber: "66-777-88",
      chassisNumber: "JD8320R2024009",
      manufacturer: "ג'ון דיר",
      model: "8320R",
      year: "2023",
      description: "טרקטור כבד 320 כ״ס",
    },
    {
      id: 10,
      vehicleNumber: "99-000-11",
      chassisNumber: "CAT336F2024010",
      manufacturer: "קטרפילר",
      model: "336F",
      year: "2019",
      description: "מחפר 36 טון",
    },
    {
      id: 11,
      vehicleNumber: "44-555-66",
      chassisNumber: "NHT7315B2024011",
      manufacturer: "ניו הולנד",
      model: "T7.315",
      year: "2022",
      description: "טרקטור 315 כ״ס עם GPS",
    },
    {
      id: 12,
      vehicleNumber: "77-888-99",
      chassisNumber: "CSECX210D2024012",
      manufacturer: "קייס",
      model: "CX210D",
      year: "2020",
      description: "מחפר 21 טון",
    },
  ];

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    onOpen();
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
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
            נתוני GOV - כלים ורכב
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            ניהול נתוני כלים ורכב כבד ממאגרי משרד התחבורה
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
            onClick={handleAddVehicle}
          >
            הוספת כלי
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
          {vehicles.length} כלים במערכת
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
              >
                שנת ייצור
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
                תיאור הכלי
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
            {vehicles.map((vehicle, index) => (
              <Tr
                key={vehicle.id}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {vehicle.vehicleNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} minW="150px">
                  <Text fontSize="sm" color={secondaryText}>
                    {vehicle.chassisNumber}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="120px">
                  <Tooltip label={vehicle.manufacturer} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {vehicle.manufacturer}
                    </Text>
                  </Tooltip>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {vehicle.model}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    {vehicle.year}
                  </Text>
                </Td>
                <Td borderColor={borderColor} py={3} maxW="250px">
                  <Tooltip label={vehicle.description} hasArrow>
                    <Text fontSize="sm" color={secondaryText} isTruncated>
                      {vehicle.description}
                    </Text>
                  </Tooltip>
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
                        צפייה בכלי
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Edit size={16} />}
                        _hover={{ bg: hoverBg }}
                        fontSize="sm"
                        onClick={() => handleEditVehicle(vehicle)}
                      >
                        עריכת כלי
                      </ChakraMenuItem>
                      <ChakraMenuItem
                        icon={<Trash2 size={16} />}
                        _hover={{ bg: "red.50" }}
                        color="red.500"
                        fontSize="sm"
                      >
                        מחיקת כלי
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
          מציג 1-12 מתוך 12 כלים
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
