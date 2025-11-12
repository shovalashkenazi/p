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
  useColorModeValue,
} from "@chakra-ui/react";
import { Search, Mail, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const primaryColor = useColorModeValue("primary.100", "primary.300");

  return (
    <Box
      as="header"
      px={6}
      py={3}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center">
        {/* Search Bar */}
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none" h="full">
            <Search size={18} color={iconColor} />
          </InputLeftElement>
          <Input
            placeholder="חיפוש..."
            bg={useColorModeValue("gray.50", "gray.700")}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            h="40px"
            fontSize="sm"
            _focus={{
              borderColor: primaryColor,
              boxShadow: `0 0 0 1px var(--chakra-colors-primary-100)`,
              bg: useColorModeValue("white", "gray.600"),
            }}
            _placeholder={{ color: useColorModeValue("gray.400", "gray.500") }}
          />
        </InputGroup>

        {/* Right Side */}
        <HStack spacing={3}>
          {/* Messages Button */}
          <IconButton
            icon={<Mail size={20} />}
            variant="ghost"
            borderRadius="full"
            aria-label="הודעות"
            size="md"
            color={iconColor}
            _hover={{ bg: hoverBg, color: primaryColor }}
            transition="all 0.2s"
          />

          {/* Notifications Button */}
          <IconButton
            icon={<Bell size={20} />}
            variant="ghost"
            borderRadius="full"
            aria-label="התראות"
            color={iconColor}
            size="md"
            _hover={{ bg: hoverBg, color: primaryColor }}
            transition="all 0.2s"
          />

          {/* User Profile */}
          <HStack
            spacing={3}
            cursor="pointer"
            px={4}
            py={2}
            borderRadius="full"
            bg={useColorModeValue("gray.50", "gray.700")}
            _hover={{ bg: hoverBg, transform: "translateY(-1px)" }}
            transition="all 0.2s"
            border="1px solid"
            borderColor={borderColor}
          >
            <Avatar boxSize="35px" bg={primaryColor} color="white" />
            <Box display={{ base: "none", md: "block" }}>
              <Text fontWeight="600" fontSize="sm" color={textColor}>
                שובל חיים אשכנזי
              </Text>
              <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")}>
                shoval@tractorsglass.com
              </Text>
            </Box>
            <ChevronDown size={16} color={iconColor} />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
