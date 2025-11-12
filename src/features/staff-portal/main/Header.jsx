import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  HStack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Search, Mail, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  const primaryColor = "#2D5F5D";
  /* עדכון ערכי גודל וצבע */
  const iconColor = "#000000ff";
  const avatarSize = "35px"; // שומר על פרופורציה טבעית לשורה
  const iconSize = 20; // מגדיל מעט את האייקונים לעומת 17

  return (
    <Box
      as="header"
      px={6}
      py={2}
      position="sticky"
      bg="#F7F7F7"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="25px"
      top="0"
      zIndex="10"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
    >
      <Flex justify="space-between" align="center">
        {/* Search Bar */}
        <InputGroup maxW="350px">
          <InputLeftElement pointerEvents="none" h="full">
            <Search size={17} color="black" />
          </InputLeftElement>
          <Input
            placeholder="חיפוש..."
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="20px"
            h="35px"
            _focus={{
              borderColor: primaryColor,
              boxShadow: `0 0 0 1px ${primaryColor}`,
              bg: "white",
            }}
            _placeholder={{ color: "gray.400" }}
          />
        </InputGroup>

        {/* Right Side */}
        <HStack spacing={3}>
          {/* Messages Button */}
          <IconButton
            icon={<Mail size={iconSize} color={iconColor} />}
            variant="ghost"
            borderRadius="full"
            aria-label="Messages"
            size="md"
            bg="white"
            _hover={{ bg: "gray.100" }}
          />

          {/* Notifications Button */}
          <IconButton
            icon={<Bell size={iconSize} color={iconColor} />}
            variant="ghost"
            borderRadius="full"
            aria-label="Notifications"
            bg="white"
            size="md"
            _hover={{ bg: "gray.100" }}
          />

          {/* User Profile */}
          <HStack
            spacing={3}
            cursor="pointer"
            px={3}
            py={2}
            borderRadius="xl"
            _hover={{ bg: "gray.50" }}
            transition="all 0.2s"
          >
            <Avatar boxSize={avatarSize} bg={iconColor} color="white" />
            <Box display={{ base: "none", md: "block" }}>
              <Text fontWeight="600" fontSize="sm" color="gray.700">
                שובל חיים אשכנזי
              </Text>
              <Text fontSize="xs" color="gray.500">
                shoval@tractorsglass.com
              </Text>
            </Box>
            <ChevronDown size={18} color={iconColor} />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
