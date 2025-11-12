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
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const primary = useColorModeValue("primary.100", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={8}
      dir="rtl"
    >
      {/* כותרת העמוד */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" mb={2} color={textColor} fontWeight="bold">
            זכוכית מרכז זגגות טרקטורים בע"מ
          </Heading>
          <Text fontSize="md" color={secondaryText}>
            תכנן, סדר עדיפויות ובצע את המשימות שלך בקלות.
          </Text>
        </Box>
        <HStack spacing={3}>
          <Button
            bg={primary}
            color="white"
            borderRadius="full"
            px={6}
            py={3}
            fontSize="md"
            fontWeight="600"
            _hover={{ bg: "primary.200", transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(0)" }}
            transition="all 0.2s"
            boxShadow="md"
          >
            + הוסף פרויקט
          </Button>
          <Button
            variant="outline"
            borderRadius="full"
            px={6}
            py={3}
            fontSize="md"
            fontWeight="600"
            color={primary}
            borderColor={primary}
            borderWidth="2px"
            _hover={{ bg: primary, color: "white", transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(0)" }}
            transition="all 0.2s"
          >
            ייבוא נתונים
          </Button>
        </HStack>
      </Flex>

      {/* כרטיסי סטטיסטיקה */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        {[
          { title: "סה״כ פרויקטים", value: 24 },
          { title: "פרויקטים שהסתיימו", value: 10 },
          { title: "פרויקטים פעילים", value: 12 },
          { title: "פרויקטים בהמתנה", value: 2 },
        ].map((stat, i) => (
          <GridItem key={i}>
            <Box
              bg={i === 0 ? primary : cardBg}
              color={i === 0 ? "white" : textColor}
              p={6}
              borderRadius="2xl"
              h="full"
              boxShadow="md"
              border="1px solid"
              borderColor={i === 0 ? "transparent" : borderColor}
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
            >
              <Flex justify="space-between" align="start" mb={4}>
                <Text fontSize="sm" fontWeight="600" opacity={i === 0 ? 0.9 : 0.7}>
                  {stat.title}
                </Text>
                <IconButton
                  icon={<Text fontSize="lg">↗</Text>}
                  size="sm"
                  variant="ghost"
                  color={i === 0 ? "whiteAlpha.800" : secondaryText}
                  borderRadius="full"
                  aria-label="צפה בפרטים"
                  _hover={{
                    bg: i === 0 ? "whiteAlpha.300" : "gray.100",
                  }}
                />
              </Flex>
              <Text fontSize="4xl" fontWeight="bold" mb={3}>
                {stat.value}
              </Text>
              <HStack spacing={2} fontSize="sm" opacity={i === 0 ? 0.9 : 0.7}>
                <Text>📈</Text>
                <Text fontWeight="500">עלייה מהחודש שעבר</Text>
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* החלק התחתון */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        alignItems="stretch"
      >
        {/* ניתוח פרויקטים */}
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
          >
            <Text fontSize="lg" fontWeight="700" color={textColor} mb={6}>
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
                <Text color={secondaryText} fontWeight="500">הושלם</Text>
              </HStack>
              <HStack spacing={2}>
                <Box w="3" h="3" borderRadius="full" bg={secondaryText} />
                <Text color={secondaryText} fontWeight="500">בתהליך</Text>
              </HStack>
              <HStack spacing={2}>
                <Box
                  w="3"
                  h="3"
                  borderRadius="full"
                  bg="gray.300"
                />
                <Text color={secondaryText} fontWeight="500">בהמתנה</Text>
              </HStack>
            </HStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardMain;
