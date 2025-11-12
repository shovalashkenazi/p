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
} from "@chakra-ui/react";
const DashboardMain = () => {
  const bgColor = useColorModeValue("#F7F7F7", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const primary = useColorModeValue("primary.100", "primary.300");

  return (
    <Box
      bg="#F7F7F7"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="25px"
      h="100vh"
      overflowY="auto"
      p={4} // מעט קטן יותר
      dir="rtl"
      sx={{
        "::-webkit-scrollbar": { width: "0px", height: "0px" },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* כותרת העמוד */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Heading size="lg" mb={1} color={primary}>
            זכוכית מרכז זגגות טרקטורים בע"מ
          </Heading>
          <Text fontSize="sm" color="gray.500">
            תכנן, סדר עדיפויות ובצע את המשימות שלך בקלות.
          </Text>
        </Box>
        <HStack spacing={2}>
          <Button
            bg={primary}
            color="white"
            borderRadius="full"
            px={4}
            py={1}
            fontSize="sm"
            _hover={{ bg: "primary.200" }}
          >
            + הוסף פרויקט
          </Button>
          <Button
            variant="outline"
            borderRadius="full"
            px={4}
            py={1}
            fontSize="sm"
            color={primary}
            borderColor={primary}
            _hover={{ bg: "primary.100", color: "white" }}
          >
            ייבוא נתונים
          </Button>
        </HStack>
      </Flex>

      {/* כרטיסי סטטיסטיקה */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={4}>
        {[
          { title: "סה״כ פרויקטים", value: 24 },
          { title: "פרויקטים שהסתיימו", value: 10 },
          { title: "פרויקטים פעילים", value: 12 },
          { title: "פרויקטים בהמתנה", value: 2 },
        ].map((stat, i) => (
          <GridItem key={i}>
            <Box
              bg={i === 0 ? primary : cardBg}
              color={i === 0 ? "white" : "black"}
              p={4}
              borderRadius="xl"
              h="full"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="start" mb={2}>
                <Text fontSize="md" fontWeight="bold">
                  {stat.title}
                </Text>
                <IconButton
                  icon={<Text>↗</Text>}
                  size="xs"
                  variant="ghost"
                  color={i === 0 ? "white" : "gray.600"}
                  borderRadius="full"
                  aria-label="צפה בפרטים"
                />
              </Flex>
              <Text fontSize="3xl" fontWeight="bold" mb={1}>
                {stat.value}
              </Text>
              <HStack spacing={1} fontSize="xs">
                <Text>📈</Text>
                <Text>עלייה מהחודש שעבר</Text>
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* החלק התחתון */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mb="60px"
        alignItems="stretch"
      >
        {/* ניתוח פרויקטים */}
        <GridItem colSpan={1} h="100%">
          <Box bg={cardBg} p={4} borderRadius="xl" boxShadow="sm" h="100%">
            <Text fontSize="md" fontWeight="600" mb={4}>
              ניתוח פרויקטים
            </Text>
            <Flex justify="space-around" align="end" h="140px">
              {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((day, index) => {
                const heights = [40, 70, 75, 90, 60, 50, 45];
                const isActive = index >= 1 && index <= 3;
                return (
                  <VStack key={day} spacing={1}>
                    <Box
                      w="28px"
                      h={`${heights[index]}%`}
                      bg={isActive ? primary : "gray.200"}
                      borderRadius="full"
                      position="relative"
                    >
                      {index === 2 && (
                        <Badge
                          position="absolute"
                          top="-14px"
                          left="50%"
                          transform="translateX(-50%)"
                          colorScheme="orange"
                          fontSize="8px"
                        >
                          +4%
                        </Badge>
                      )}
                    </Box>
                    <Text fontSize="xs" color="gray.500">
                      {day}
                    </Text>
                  </VStack>
                );
              })}
            </Flex>
          </Box>
        </GridItem>

        {/* תזכורות */}
        <GridItem h="100%">
          <Box bg={cardBg} p={4} borderRadius="xl" boxShadow="sm" h="100%">
            <Text fontSize="md" fontWeight="600" mb={3}>
              תזכורות
            </Text>
            <Flex direction="column" justify="space-between" h="100%">
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontWeight="600" mb={1}>
                    פגישה עם חברת Arc
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    שעה: 14:00 - 16:00
                  </Text>
                  <Button
                    bg={primary}
                    color="white"
                    size="sm"
                    borderRadius="full"
                    w="full"
                    _hover={{ bg: "primary.200" }}
                  >
                    🎥 התחל פגישה
                  </Button>
                </Box>
              </VStack>
            </Flex>
          </Box>
        </GridItem>

        {/* רשימת פרויקטים */}
        <GridItem h="100%">
          <Box bg={cardBg} p={4} borderRadius="xl" boxShadow="sm" h="100%">
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontSize="md" fontWeight="600">
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
          <Box bg={cardBg} p={4} borderRadius="xl" boxShadow="sm" h="100%">
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontSize="md" fontWeight="600">
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
          <Box bg={cardBg} p={4} borderRadius="xl" boxShadow="sm" h="100%">
            <Text fontSize="md" fontWeight="600" mb={3}>
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
            <HStack justify="center" spacing={4} fontSize="xs">
              <HStack>
                <Box w="2" h="2" borderRadius="full" bg={primary} />
                <Text>הושלם</Text>
              </HStack>
              <HStack>
                <Box w="2" h="2" borderRadius="full" bg="gray.600" />
                <Text>בתהליך</Text>
              </HStack>
              <HStack>
                <Box
                  w="2"
                  h="2"
                  borderRadius="full"
                  bg="gray.300"
                  backgroundImage="repeating-linear-gradient(45deg, transparent, transparent 2px, gray.400 2px, gray.400 4px)"
                />
                <Text>בהמתנה</Text>
              </HStack>
            </HStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardMain;
