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
  HStack,
  Flex,
  Heading,
  Input,
  Select,
  useColorModeValue,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

const CatalogIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const primary = useColorModeValue("primary.100", "primary.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const stripedBg = useColorModeValue("gray.50", "gray.900");
  const activeBg = useColorModeValue("blue.50", "blue.900");

  // Filters state
  const [vehicleNumberSearch, setVehicleNumberSearch] = useState("");
  const [chassisNumberSearch, setChassisNumberSearch] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubModel, setSelectedSubModel] = useState("");

  // Selection state for drill-down
  const [activeManufacturer, setActiveManufacturer] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [activeSubModel, setActiveSubModel] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Sample hierarchical data
  const catalogData = {
    manufacturers: [
      {
        id: 1,
        name: "קטרפילר",
        models: [
          {
            id: 1,
            name: "320D",
            years: [
              {
                year: "2020",
                subModels: ["320D Standard", "320D Long Reach"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית קדמית", "זכוכית צד ימין"] },
                  { id: 2, name: "מנועים", items: ["מנוע דיזל C6.6", "פילטר שמן"] },
                ],
              },
              {
                year: "2021",
                subModels: ["320D GC"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית קדמית משודרגת"] },
                ],
              },
            ],
          },
          {
            id: 2,
            name: "336F",
            years: [
              {
                year: "2019",
                subModels: ["336F Standard"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית פנורמית"] },
                  { id: 2, name: "הידראוליקה", items: ["משאבת הידראולית"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "ג'ון דיר",
        models: [
          {
            id: 3,
            name: "6430",
            years: [
              {
                year: "2019",
                subModels: ["6430 Premium"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית תא נהג"] },
                  { id: 2, name: "חשמל", items: ["מצבר 12V"] },
                ],
              },
            ],
          },
          {
            id: 4,
            name: "8320R",
            years: [
              {
                year: "2023",
                subModels: ["8320R AutoTrac"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית אחורית"] },
                  { id: 2, name: "אלקטרוניקה", items: ["מערכת GPS"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "קומטסו",
        models: [
          {
            id: 5,
            name: "PC290LC",
            years: [
              {
                year: "2021",
                subModels: ["PC290LC-11"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית פנורמית מחוסמת"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "וולבו",
        models: [
          {
            id: 6,
            name: "EC220E",
            years: [
              {
                year: "2018",
                subModels: ["EC220E Standard"],
                categories: [
                  { id: 1, name: "זכוכיות", items: ["זכוכית דלת תא נהג"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Get filtered models based on selected manufacturer
  const availableModels = useMemo(() => {
    if (!selectedManufacturer) return [];
    const manufacturer = catalogData.manufacturers.find(
      (m) => m.name === selectedManufacturer
    );
    return manufacturer ? manufacturer.models : [];
  }, [selectedManufacturer]);

  // Get filtered years based on selected model
  const availableYears = useMemo(() => {
    if (!selectedManufacturer || !selectedModel) return [];
    const manufacturer = catalogData.manufacturers.find(
      (m) => m.name === selectedManufacturer
    );
    const model = manufacturer?.models.find((m) => m.name === selectedModel);
    return model ? model.years.map((y) => y.year) : [];
  }, [selectedManufacturer, selectedModel]);

  // Get filtered sub-models
  const availableSubModels = useMemo(() => {
    if (!selectedManufacturer || !selectedModel || !selectedYear) return [];
    const manufacturer = catalogData.manufacturers.find(
      (m) => m.name === selectedManufacturer
    );
    const model = manufacturer?.models.find((m) => m.name === selectedModel);
    const yearData = model?.years.find((y) => y.year === selectedYear);
    return yearData ? yearData.subModels : [];
  }, [selectedManufacturer, selectedModel, selectedYear]);

  // Handle manufacturer click in table
  const handleManufacturerClick = (manufacturer) => {
    setActiveManufacturer(manufacturer);
    setActiveModel(null);
    setActiveYear(null);
    setActiveSubModel(null);
    setActiveCategory(null);
  };

  // Handle model click
  const handleModelClick = (model) => {
    setActiveModel(model);
    setActiveYear(null);
    setActiveSubModel(null);
    setActiveCategory(null);
  };

  // Handle year click
  const handleYearClick = (year) => {
    setActiveYear(year);
    setActiveSubModel(null);
    setActiveCategory(null);
  };

  // Handle sub-model click
  const handleSubModelClick = (subModel) => {
    setActiveSubModel(subModel);
    setActiveCategory(null);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Get data to display in table based on selections
  const getTableData = () => {
    // If showing items (deepest level)
    if (activeCategory) {
      return {
        type: "items",
        data: activeCategory.items.map((item, idx) => ({ id: idx, name: item })),
      };
    }

    // If sub-model selected, show categories
    if (activeSubModel) {
      const manufacturer = catalogData.manufacturers.find(
        (m) => m.id === activeManufacturer.id
      );
      const model = manufacturer?.models.find((m) => m.id === activeModel.id);
      const yearData = model?.years.find((y) => y.year === activeYear);
      return {
        type: "categories",
        data: yearData?.categories || [],
      };
    }

    // If year selected, show sub-models
    if (activeYear) {
      const manufacturer = catalogData.manufacturers.find(
        (m) => m.id === activeManufacturer.id
      );
      const model = manufacturer?.models.find((m) => m.id === activeModel.id);
      const yearData = model?.years.find((y) => y.year === activeYear);
      return {
        type: "subModels",
        data: yearData?.subModels.map((sm, idx) => ({ id: idx, name: sm })) || [],
      };
    }

    // If model selected, show years
    if (activeModel) {
      const manufacturer = catalogData.manufacturers.find(
        (m) => m.id === activeManufacturer.id
      );
      const model = manufacturer?.models.find((m) => m.id === activeModel.id);
      return {
        type: "years",
        data: model?.years || [],
      };
    }

    // If manufacturer selected, show models and categories
    if (activeManufacturer) {
      const manufacturer = catalogData.manufacturers.find(
        (m) => m.id === activeManufacturer.id
      );
      return {
        type: "models",
        data: manufacturer?.models || [],
      };
    }

    // Default: show all manufacturers
    return {
      type: "manufacturers",
      data: catalogData.manufacturers,
    };
  };

  const tableData = getTableData();

  const resetFilters = () => {
    setVehicleNumberSearch("");
    setChassisNumberSearch("");
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedSubModel("");
    setActiveManufacturer(null);
    setActiveModel(null);
    setActiveYear(null);
    setActiveSubModel(null);
    setActiveCategory(null);
  };

  return (
    <Box p={8} dir="rtl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor}>
            קטלוג מוצרים
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            חיפוש ודפדוף בקטלוג המוצרים לפי יצרן, דגם ושנה
          </Text>
        </Box>
      </Flex>

      {/* Filter Bar */}
      <Box
        bg={bgColor}
        p={6}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="md"
        mb={6}
      >
        <HStack spacing={4} mb={4} flexWrap="wrap">
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
          >
            הקמת יצרן חדש
          </Button>

          <Input
            placeholder="חיפוש לפי מספר רכב"
            value={vehicleNumberSearch}
            onChange={(e) => setVehicleNumberSearch(e.target.value)}
            borderRadius="lg"
            w="200px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
          />

          <Input
            placeholder="חיפוש לפי מספר שלדה"
            value={chassisNumberSearch}
            onChange={(e) => setChassisNumberSearch(e.target.value)}
            borderRadius="lg"
            w="200px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
          />
        </HStack>

        <HStack spacing={4} flexWrap="wrap">
          <Select
            placeholder="בחר יצרן"
            value={selectedManufacturer}
            onChange={(e) => {
              setSelectedManufacturer(e.target.value);
              setSelectedModel("");
              setSelectedYear("");
              setSelectedSubModel("");
            }}
            borderRadius="lg"
            w="200px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
          >
            {catalogData.manufacturers.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="בחר דגם"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setSelectedYear("");
              setSelectedSubModel("");
            }}
            borderRadius="lg"
            w="200px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
            isDisabled={!selectedManufacturer}
          >
            {availableModels.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="בחר שנה"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSubModel("");
            }}
            borderRadius="lg"
            w="150px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
            isDisabled={!selectedModel}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>

          <Select
            placeholder="בחר תת דגם"
            value={selectedSubModel}
            onChange={(e) => setSelectedSubModel(e.target.value)}
            borderRadius="lg"
            w="200px"
            h="45px"
            bg={bgColor}
            borderColor={borderColor}
            isDisabled={!selectedYear}
          >
            {availableSubModels.map((sm, idx) => (
              <option key={idx} value={sm}>
                {sm}
              </option>
            ))}
          </Select>

          <Button
            variant="outline"
            borderRadius="lg"
            h="45px"
            borderColor={borderColor}
            onClick={resetFilters}
            _hover={{ bg: hoverBg }}
          >
            נקה סינונים
          </Button>
        </HStack>
      </Box>

      <Divider my={6} borderColor={borderColor} />

      {/* Breadcrumb */}
      {(activeManufacturer || activeModel || activeYear || activeSubModel || activeCategory) && (
        <HStack spacing={2} mb={4} flexWrap="wrap">
          <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
            נתיב:
          </Badge>
          {activeManufacturer && (
            <>
              <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                {activeManufacturer.name}
              </Badge>
              {activeModel && (
                <>
                  <Text color={secondaryText}>/</Text>
                  <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                    {activeModel.name}
                  </Badge>
                </>
              )}
              {activeYear && (
                <>
                  <Text color={secondaryText}>/</Text>
                  <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                    {activeYear}
                  </Badge>
                </>
              )}
              {activeSubModel && (
                <>
                  <Text color={secondaryText}>/</Text>
                  <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                    {activeSubModel}
                  </Badge>
                </>
              )}
              {activeCategory && (
                <>
                  <Text color={secondaryText}>/</Text>
                  <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                    {activeCategory.name}
                  </Badge>
                </>
              )}
            </>
          )}
        </HStack>
      )}

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
                {tableData.type === "manufacturers" && "יצרן"}
                {tableData.type === "models" && "דגם"}
                {tableData.type === "years" && "שנה"}
                {tableData.type === "subModels" && "תת דגם"}
                {tableData.type === "categories" && "קטגוריה"}
                {tableData.type === "items" && "שם הפריט"}
              </Th>
              {tableData.type === "models" && (
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
                  קטגוריות זמינות
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data.map((item, index) => (
              <Tr
                key={item.id || index}
                bg={index % 2 === 0 ? bgColor : stripedBg}
                _hover={{ bg: hoverBg, cursor: "pointer" }}
                transition="background 0.2s"
                onClick={() => {
                  if (tableData.type === "manufacturers") handleManufacturerClick(item);
                  if (tableData.type === "models") handleModelClick(item);
                  if (tableData.type === "years") handleYearClick(item.year);
                  if (tableData.type === "subModels") handleSubModelClick(item.name);
                  if (tableData.type === "categories") handleCategoryClick(item);
                }}
              >
                <Td borderColor={borderColor} py={3}>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    {tableData.type === "years" ? item.year : item.name}
                  </Text>
                </Td>
                {tableData.type === "models" && (
                  <Td borderColor={borderColor} py={3}>
                    <HStack spacing={2} flexWrap="wrap">
                      {item.years.map((yearData) =>
                        yearData.categories.map((cat) => (
                          <Badge
                            key={cat.id}
                            colorScheme="purple"
                            fontSize="xs"
                            px={2}
                            py={1}
                            borderRadius="full"
                          >
                            {cat.name}
                          </Badge>
                        ))
                      )}
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Footer Info */}
      <Flex justify="space-between" align="center" mt={6} px={2}>
        <Text fontSize="sm" color={secondaryText}>
          מציג {tableData.data.length} רשומות
        </Text>
      </Flex>
    </Box>
  );
};

export default CatalogIndex;
