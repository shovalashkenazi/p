import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text, Flex, Divider, useColorModeValue } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Package,
  BookOpen,
  Wrench,
  Users,
  Building2,
  FileText,
  Warehouse,
  Truck,
  Shield,
  Briefcase,
  Settings,
  ChevronDown,
  Circle,
  Home,
} from "lucide-react";

import { Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const primaryColor = useColorModeValue("primary.100", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const activeBg = useColorModeValue("white", "gray.600");

  const menuItems = [
    {
      icon: Home,
      label: "דף הבית",
      path: "/dashboard/worker/main",
    },
    {
      icon: Package,
      label: "פריטים",
      path: "/dashboard/worker/products",
    },
    {
      icon: Briefcase,
      label: "הנהלת חשבונות",
      path: "/dashboard/worker/docs",
    },
    {
      icon: BookOpen,
      label: "קטלוג",
      path: "/dashboard/worker/catalog",
    },
    {
      icon: Wrench,
      label: "כלים",
      path: "/dashboard/worker/tools",
    },
    {
      icon: Users,
      label: "לקוחות",
      path: "/dashboard/worker/customers",
    },
    {
      icon: Shield,
      label: "מנויים",
      path: "/dashboard/worker/subscriptions",
    },
    {
      icon: FileText,
      label: "דוחות",
      path: "/dashboard/worker/reports",
    },
    {
      icon: Warehouse,
      label: "מחסנים ומלאי",
      path: "/dashboard/worker/warehouse",
    },
    {
      icon: Truck,
      label: "מעקב הזמנות",
      path: "/dashboard/worker/orders",
    },
  ];

  const MenuItem = React.memo(
    ({ icon: Icon, label, path }) => {
      const isActive = location.pathname === path;

      return (
        <NavLink to={path} style={{ textDecoration: "none", width: "100%" }}>
          <Flex
            w="full"
            align="center"
            cursor="pointer"
            borderRadius="xl"
            color={isActive ? textColor : secondaryTextColor}
            bg={isActive ? activeBg : "transparent"}
            _hover={{
              bg: isActive ? activeBg : hoverBg,
              transform: "translateX(-2px)",
            }}
            transition="all 0.2s ease-in-out"
            border="1px solid"
            borderColor={isActive ? borderColor : "transparent"}
            boxShadow={isActive ? "sm" : "none"}
          >
            {/* Active Indicator */}
            <Box
              w="4px"
              h="45px"
              bg={isActive ? primaryColor : "transparent"}
              borderRadius="0 4px 4px 0"
              transition="all 0.2s ease-in-out"
            />

            {/* Menu Content */}
            <HStack flex="1" px={4} py={3} justifyContent="space-between">
              <HStack spacing={3}>
                <Icon size={18} />
                <Text fontSize="sm" fontWeight={isActive ? "600" : "500"}>
                  {label}
                </Text>
              </HStack>
            </HStack>
          </Flex>
        </NavLink>
      );
    }
  );

  return (
    <Box
      w="280px"
      h="100%"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      overflowY="auto"
      overflowX="hidden"
      boxShadow="sm"
      css={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: borderColor,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: secondaryTextColor,
        },
      }}
      p={5}
    >
      {/* Logo */}
      <Flex mb={6} justify="center" align="center">
        <Image src={logo} alt="Logo" w="180px" objectFit="contain" />
      </Flex>

      <Divider mb={6} borderColor={borderColor} />

      {/* Menu Section */}
      <VStack align="stretch" spacing={2} mb={6}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
