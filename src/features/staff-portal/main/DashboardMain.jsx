import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  IconButton,
  Badge,
  VStack,
  HStack,
  Heading,
  useColorModeValue,
  Avatar,
  Wrap,
  WrapItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  FileText,
  DollarSign,
  Wrench,
  Receipt,
  Users,
  Shield,
  BarChart3,
  Warehouse,
  Package,
  Monitor,
  Video,
  MessageSquare,
  Eye,
} from "lucide-react";

const DashboardMain = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const primary = useColorModeValue("primary.100", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  // תאריך של היום בעברית
  const getTodayDate = () => {
    const date = new Date();
    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const months = [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  // כפתורי ניווט מהיר
  const quickNavButtons = [
    { label: "תעודות משלוח", icon: FileText, shortcut: "F1" },
    { label: "הצעות מחיר", icon: DollarSign, shortcut: "F2" },
    { label: "כרטיסי עבודה", icon: Wrench, shortcut: "F3" },
    { label: "חשבוניות", icon: Receipt, shortcut: "F4" },
    { label: "ניהול לקוחות", icon: Users, shortcut: "F5" },
    { label: "ניהול מנויים", icon: Shield, shortcut: "F6" },
    { label: 'דו"חות', icon: BarChart3, shortcut: "F7" },
    { label: "מחסנים ומלאי", icon: Warehouse, shortcut: "F8" },
    { label: "מעקב הזמנות", icon: Package, shortcut: "F9" },
  ];

  // נתוני דמה למסמכים אחרונים
  const recentDocuments = [
    {
      id: "DOC-001",
      date: "13/11/2024",
      type: "תעודת משלוח",
      customer: "חברת ABC",
      category: "זכוכית",
      status: "הושלם",
    },
    {
      id: "DOC-002",
      date: "12/11/2024",
      type: "הצעת מחיר",
      customer: "גרייס שיווק",
      category: "חלונות",
      status: "בתהליך",
    },
    {
      id: "DOC-003",
      date: "12/11/2024",
      type: "כרטיס עבודה",
      customer: "מפעלי ברזל",
      category: "תיקונים",
      status: "ממתין",
    },
    {
      id: "DOC-004",
      date: "11/11/2024",
      type: "חשבונית",
      customer: "טרקטור שירותים",
      category: "שירות",
      status: "הושלם",
    },
    {
      id: "DOC-005",
      date: "11/11/2024",
      type: "תעודת משלוח",
      customer: "חברת XYZ",
      category: "זכוכית",
      status: "הושלם",
    },
    {
      id: "DOC-006",
      date: "10/11/2024",
      type: "הצעת מחיר",
      customer: "בניין ופיתוח",
      category: "חלונות",
      status: "בתהליך",
    },
    {
      id: "DOC-007",
      date: "10/11/2024",
      type: "כרטיס עבודה",
      customer: "מוסך דוד",
      category: "תיקונים",
      status: "הושלם",
    },
    {
      id: "DOC-008",
      date: "09/11/2024",
      type: "חשבונית",
      customer: "שילה תעשיות",
      category: "שירות",
      status: "ממתין",
    },
    {
      id: "DOC-009",
      date: "09/11/2024",
      type: "תעודת משלוח",
      customer: "מכון טכנולוגי",
      category: "זכוכית",
      status: "הושלם",
    },
    {
      id: "DOC-010",
      date: "08/11/2024",
      type: "הצעת מחיר",
      customer: "רכב ותחבורה",
      category: "חלונות",
      status: "בתהליך",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "הושלם":
        return "green";
      case "בתהליך":
        return "orange";
      case "ממתין":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Box p={8} dir="rtl">
      {/* כותרת העמוד */}
      <Box mb={4}>
        <Heading size="xl" mb={2} color={textColor} fontWeight="bold">
          זכוכית מרכז זגגות טרקטורים בע"מ
        </Heading>
        <Flex align="center" gap={3} mb={6}>
          <Text fontSize="md" color={secondaryText}>
            תכנן, סדר עדיפויות ובצע את המשימות שלך בקלות.
          </Text>
          <Box w="1px" h="16px" bg={borderColor} />
          <HStack spacing={2}>
            <Box w="8px" h="8px" borderRadius="full" bg={primary} />
            <Text fontSize="sm" color={secondaryText} fontWeight="600">
              {getTodayDate()}
            </Text>
          </HStack>
        </Flex>

        {/* שורת ניווט מהיר */}
        <Flex gap={4} p={2} max dir="rtl">
          {quickNavButtons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <Button
                key={index}
                leftIcon={<Icon size={16} />}
                bg={cardBg}
                color={textColor}
                borderRadius="xl"
                px={4}
                h="48px"
                fontSize="sm"
                fontWeight="600"
                border="1px solid"
                borderColor={borderColor}
                _hover={{
                  bg: primary,
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  borderColor: primary,
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
                boxShadow="sm"
                position="relative"
                flexShrink={0}
                whiteSpace="nowrap"
              >
                {btn.label}
                <Badge
                  position="absolute"
                  top="-8px"
                  left="-8px"
                  colorScheme="orange"
                  fontSize="9px"
                  fontWeight="700"
                  borderRadius="md"
                  px={1.5}
                  py={0.5}
                >
                  {btn.shortcut}
                </Badge>
              </Button>
            );
          })}
        </Flex>
      </Box>

      {/* כרטיסי סטטיסטיקה */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        {[
          { title: "תקבולים", value: 5000 },
          { title: "הכנסות", value: 8000 },
          { title: "הוצאות", value: 1200 },
          { title: "תשלומים", value: 3000 },
        ].map((stat, i) => (
          <GridItem key={i}>
            <Box
              bg={i === 0 ? primary : cardBg}
              color={i === 0 ? "white" : textColor}
              p={3}
              borderRadius="xl"
              h="full"
              boxShadow="sm"
              border="1px solid"
              borderColor={i === 0 ? "transparent" : borderColor}
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
            >
              <Flex justify="space-between" align="center" mb={1}>
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  opacity={i === 0 ? 0.9 : 0.7}
                >
                  {stat.title}
                </Text>
                <IconButton
                  icon={<Text fontSize="sm">↗</Text>}
                  size="xs"
                  variant="ghost"
                  color={i === 0 ? "whiteAlpha.800" : secondaryText}
                  borderRadius="full"
                  aria-label="צפה בפרטים"
                  _hover={{
                    bg: i === 0 ? "whiteAlpha.300" : "gray.100",
                  }}
                />
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" mb={1}>
                {stat.value} ₪
              </Text>
              <HStack spacing={1} fontSize="10px" opacity={i === 0 ? 0.9 : 0.7}>
                <Text>📈</Text>
                <Text fontWeight="500">עלייה מהחודש שעבר</Text>
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* החלק התחתון */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems="stretch">
        {/* 10 מסמכים אחרונים */}
        <GridItem colSpan={1} h="100%">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            h="100%"
            transition="all 0.3s"
            _hover={{ boxShadow: "lg" }}
            display="flex"
            flexDirection="column"
          >
            <Text fontSize="lg" fontWeight="700" color={textColor} mb={4}>
              10 מסמכים אחרונים
            </Text>
            <Box
              flex="1"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "6px",
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
              <Table variant="simple" size="sm">
                <Thead position="sticky" top={0} bg={cardBg} zIndex={1}>
                  <Tr>
                    <Th
                      textAlign="right"
                      fontSize="10px"
                      fontWeight="700"
                      color={textColor}
                      textTransform="none"
                      borderColor={borderColor}
                      py={2}
                      px={2}
                    >
                      תאריך
                    </Th>
                    {/* לקוח */}
                    <Th
                      textAlign="right"
                      fontSize="10px"
                      fontWeight="700"
                      color={textColor}
                      textTransform="none"
                      borderColor={borderColor}
                      py={2}
                      px={2}
                    >
                      לקוח
                    </Th>

                    <Th
                      textAlign="right"
                      fontSize="10px"
                      fontWeight="700"
                      color={textColor}
                      textTransform="none"
                      borderColor={borderColor}
                      py={2}
                      px={2}
                    >
                      סטטוס
                    </Th>
                    <Th
                      textAlign="right"
                      fontSize="10px"
                      fontWeight="700"
                      color={textColor}
                      textTransform="none"
                      borderColor={borderColor}
                      py={2}
                      px={2}
                    >
                      סוג מסמך
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentDocuments.map((doc, index) => (
                    <Tr
                      key={doc.id}
                      bg={
                        index % 2 === 0
                          ? cardBg
                          : useColorModeValue("gray.50", "gray.900")
                      }
                      _hover={{ bg: hoverBg }}
                      transition="background 0.2s"
                    >
                      <Td
                        borderColor={borderColor}
                        py={2}
                        px={2}
                        fontSize="11px"
                      >
                        {doc.date}
                      </Td>

                      <Td
                        borderColor={borderColor}
                        py={2}
                        px={2}
                        fontSize="11px"
                        fontWeight="600"
                      >
                        {doc.customer}
                      </Td>

                      <Td borderColor={borderColor} py={2} px={2}>
                        <Badge
                          colorScheme={getStatusColor(doc.status)}
                          borderRadius="full"
                          px={2}
                          py={0.5}
                          fontSize="9px"
                          fontWeight="600"
                        >
                          {doc.status}
                        </Badge>
                      </Td>
                      <Td
                        borderColor={borderColor}
                        py={2}
                        px={2}
                        fontSize="11px"
                        fontWeight="600"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxW="120px"
                      >
                        {doc.type}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </GridItem>

        {/* תמיכה מרחוק */}
        <GridItem h="100%">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            h="100%"
            transition="all 0.3s"
            _hover={{ boxShadow: "lg" }}
          >
            <Text fontSize="lg" fontWeight="700" color={textColor} mb={6}>
              תמיכה מרחוק
            </Text>
            <VStack align="stretch" spacing={3}>
              <Button
                as="a"
                href="https://anydesk.com/"
                target="_blank"
                rel="noopener noreferrer"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                h="60px"
                px={4}
                justifyContent="flex-start"
                _hover={{
                  bg: primary,
                  color: "white",
                  borderColor: primary,
                  transform: "translateX(-4px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                <HStack spacing={3} w="full">
                  <Box
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={2}
                    borderRadius="lg"
                  >
                    <Monitor size={20} />
                  </Box>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" fontWeight="700">
                      AnyDesk
                    </Text>
                    <Text fontSize="xs" color={secondaryText}>
                      התחבר לתמיכה מרחוק
                    </Text>
                  </VStack>
                  <Box fontSize="lg">→</Box>
                </HStack>
              </Button>

              <Button
                as="a"
                href="https://zoom.us/"
                target="_blank"
                rel="noopener noreferrer"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                h="60px"
                px={4}
                justifyContent="flex-start"
                _hover={{
                  bg: primary,
                  color: "white",
                  borderColor: primary,
                  transform: "translateX(-4px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                <HStack spacing={3} w="full">
                  <Box
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={2}
                    borderRadius="lg"
                  >
                    <Video size={20} />
                  </Box>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" fontWeight="700">
                      Zoom
                    </Text>
                    <Text fontSize="xs" color={secondaryText}>
                      התחבר לתמיכה מרחוק
                    </Text>
                  </VStack>
                  <Box fontSize="lg">→</Box>
                </HStack>
              </Button>

              <Button
                as="a"
                href="https://teams.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                h="60px"
                px={4}
                justifyContent="flex-start"
                _hover={{
                  bg: primary,
                  color: "white",
                  borderColor: primary,
                  transform: "translateX(-4px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                <HStack spacing={3} w="full">
                  <Box
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={2}
                    borderRadius="lg"
                  >
                    <MessageSquare size={20} />
                  </Box>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" fontWeight="700">
                      Teams
                    </Text>
                    <Text fontSize="xs" color={secondaryText}>
                      התחבר לתמיכה מרחוק
                    </Text>
                  </VStack>
                  <Box fontSize="lg">→</Box>
                </HStack>
              </Button>

              <Button
                as="a"
                href="https://www.teamviewer.com/"
                target="_blank"
                rel="noopener noreferrer"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                h="60px"
                px={4}
                justifyContent="flex-start"
                _hover={{
                  bg: primary,
                  color: "white",
                  borderColor: primary,
                  transform: "translateX(-4px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                <HStack spacing={3} w="full">
                  <Box
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={2}
                    borderRadius="lg"
                  >
                    <Eye size={20} />
                  </Box>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" fontWeight="700">
                      TeamViewer
                    </Text>
                    <Text fontSize="xs" color={secondaryText}>
                      התחבר לתמיכה מרחוק
                    </Text>
                  </VStack>
                  <Box fontSize="lg">→</Box>
                </HStack>
              </Button>
            </VStack>
          </Box>
        </GridItem>

        {/* רשימת פרויקטים */}
        <GridItem h="100%">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            h="100%"
            transition="all 0.3s"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="700" color={textColor}>
                פרויקטים
              </Text>
              <Button
                size="xs"
                variant="outline"
                borderRadius="full"
                borderColor={primary}
                color={primary}
                _hover={{ bg: "primary.100", color: "white" }}
              >
                + חדש
              </Button>
            </Flex>
            <VStack align="stretch" spacing={2}>
              {[
                { title: "פיתוח API", date: "26 נובמבר 2024", icon: "⚡" },
                { title: "תהליך קליטה", date: "28 נובמבר 2024", icon: "🎯" },
                {
                  title: "בניית לוח ניהול",
                  date: "30 נובמבר 2024",
                  icon: "✨",
                },
              ].map((project, index) => (
                <HStack key={index} spacing={2}>
                  <Box fontSize="lg">{project.icon}</Box>
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="bold">
                      {project.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      יעד: {project.date}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </Box>
        </GridItem>

        {/* שיתוף פעולה צוותי */}
        <GridItem colSpan={2} h="100%">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            h="100%"
            transition="all 0.3s"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="700" color={textColor}>
                שיתוף פעולה צוותי
              </Text>
              <Button
                size="xs"
                variant="outline"
                borderRadius="full"
                borderColor={primary}
                color={primary}
                _hover={{ bg: "primary.100", color: "white" }}
              >
                + הוסף חבר צוות
              </Button>
            </Flex>
            <VStack align="stretch" spacing={3}>
              {[
                { name: "אלכסנדרה דף", task: "GitHub", status: "הושלם" },
                {
                  name: "אדווין אדניקה",
                  task: "אימות משתמשים",
                  status: "בתהליך",
                },
              ].map((member, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Avatar
                      name={member.name}
                      size="xs"
                      bg={primary}
                      color="white"
                    />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">
                        {member.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        עובד על {member.task}
                      </Text>
                    </Box>
                  </HStack>
                  <Badge
                    colorScheme="orange"
                    borderRadius="full"
                    px={2}
                    fontSize="10px"
                  >
                    {member.status}
                  </Badge>
                </Flex>
              ))}
            </VStack>
          </Box>
        </GridItem>

        {/* התקדמות פרויקטים */}
        <GridItem h="100%">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            h="100%"
            transition="all 0.3s"
            _hover={{ boxShadow: "lg" }}
          >
            <Text fontSize="lg" fontWeight="700" color={textColor} mb={6}>
              התקדמות פרויקטים
            </Text>
            <Flex justify="center" align="center" position="relative" mb={2}>
              <Box position="relative" w="150px" h="150px">
                <svg width="150" height="150" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="14"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={primary}
                    strokeWidth="14"
                    strokeDasharray="502"
                    strokeDashoffset="125"
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  textAlign="center"
                >
                  <Text fontSize="2xl" fontWeight="bold" color={primary}>
                    41%
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    הסתיימו
                  </Text>
                </Box>
              </Box>
            </Flex>
            <HStack justify="center" spacing={6} fontSize="sm">
              <HStack spacing={2}>
                <Box w="3" h="3" borderRadius="full" bg={primary} />
                <Text color={secondaryText} fontWeight="500">
                  הושלם
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Box w="3" h="3" borderRadius="full" bg={secondaryText} />
                <Text color={secondaryText} fontWeight="500">
                  בתהליך
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Box w="3" h="3" borderRadius="full" bg="gray.300" />
                <Text color={secondaryText} fontWeight="500">
                  בהמתנה
                </Text>
              </HStack>
            </HStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardMain;
