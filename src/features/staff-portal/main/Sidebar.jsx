import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
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
  Database,
  Route,
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

  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isWarehousesOpen, setIsWarehousesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: "דף הבית",
      path: "/dashboard/worker/main",
    },
    {
      icon: BookOpen,
      label: "קטלוג",
      path: "/dashboard/worker/catalog",
    },
    {
      icon: Database,
      label: "נתוני כלים",
      path: "/dashboard/worker/gov",
    },
    {
      icon: Briefcase,
      label: "הנהלת חשבונות",
      path: "/dashboard/worker/docs",
    },
    {
      icon: Route,
      label: "מסלולי נהגים",
      path: "/dashboard/worker/drivers-routes",
    },
  ];

  // תפריט מנויים
  const subscriptionsSubMenu = [
    {
      icon: FileText,
      label: "כתבי שירות",
      path: "/dashboard/worker/subscriptions/service-contracts",
    },
    {
      icon: Shield,
      label: "קריאות שירות",
      path: "/dashboard/worker/subscriptions/service-calls",
    },
    {
      icon: Shield,
      label: "מנויים",
      path: "/dashboard/worker/subscriptions/list",
    },
  ];

  // תפריט חשבונות
  const accountsSubMenu = [
    {
      icon: Users,
      label: "לקוחות",
      path: "/dashboard/worker/accounts/customers",
    },
    {
      icon: Users,
      label: "עובדים",
      path: "/dashboard/worker/accounts/workers",
    },
    {
      icon: Users,
      label: "סוכנים",
      path: "/dashboard/worker/accounts/agents",
    },
    {
      icon: Users,
      label: "מתקינים",
      path: "/dashboard/worker/accounts/installers",
    },
    {
      icon: Users,
      label: "מחסנאים",
      path: "/dashboard/worker/accounts/storekeepers",
    },
    {
      icon: Users,
      label: "ספקים",
      path: "/dashboard/worker/accounts/suppliers",
    },
  ];

  // תפריט פריטים
  const productsSubMenu = [
    {
      icon: Package,
      label: "ניהול פריטים",
      path: "/dashboard/worker/products",
    },
    {
      icon: FileText,
      label: "קטגוריות פריטים",
      path: "/dashboard/worker/products/categories",
    },
  ];

  // תפריט מחסנים
  const warehousesSubMenu = [
    {
      icon: Warehouse,
      label: "פורטל מחסנים",
      path: "/dashboard/worker/warehouses/portal",
    },
    {
      icon: Warehouse,
      label: "ניהול מחסנים",
      path: "/dashboard/worker/warehouses/management",
    },
    {
      icon: FileText,
      label: "תעודת כניסה למלאי",
      path: "/dashboard/worker/warehouses/stock-in",
    },
    {
      icon: FileText,
      label: "תעודת יציאה מהמלאי",
      path: "/dashboard/worker/warehouses/stock-out",
    },
    {
      icon: FileText,
      label: "תעודת העברה בין מחסנים",
      path: "/dashboard/worker/warehouses/transfer",
    },
    {
      icon: FileText,
      label: "הזמנת רכש",
      path: "/dashboard/worker/warehouses/purchase-order",
    },
    {
      icon: FileText,
      label: "ספירת מלאי",
      path: "/dashboard/worker/warehouses/stock-count",
    },
  ];

  // תפריט הגדרות
  const settingsSubMenu = [
    {
      icon: Settings,
      label: "ניהול סטטוסים",
      path: "/dashboard/worker/settings/statuses",
    },
  ];

  const MenuItem = React.memo(({ icon: Icon, label, path }) => {
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
  });

  const CollapsibleMenuItem = React.memo(
    ({ icon: Icon, label, subItems, isOpen, onToggle }) => {
      const isAnySubItemActive = subItems.some(
        (item) => location.pathname === item.path
      );

      return (
        <Box w="full">
          {/* Parent Item */}
          <Flex
            w="full"
            align="center"
            cursor="pointer"
            borderRadius="xl"
            color={isAnySubItemActive ? textColor : secondaryTextColor}
            bg={isAnySubItemActive ? activeBg : "transparent"}
            _hover={{
              bg: isAnySubItemActive ? activeBg : hoverBg,
              transform: "translateX(-2px)",
            }}
            transition="all 0.2s ease-in-out"
            border="1px solid"
            borderColor={isAnySubItemActive ? borderColor : "transparent"}
            boxShadow={isAnySubItemActive ? "sm" : "none"}
            onClick={onToggle}
          >
            {/* Active Indicator */}
            <Box
              w="4px"
              h="45px"
              bg={isAnySubItemActive ? primaryColor : "transparent"}
              borderRadius="0 4px 4px 0"
              transition="all 0.2s ease-in-out"
            />

            {/* Menu Content */}
            <HStack flex="1" px={4} py={3} justifyContent="space-between">
              <HStack spacing={3}>
                <Icon size={18} />
                <Text
                  fontSize="sm"
                  fontWeight={isAnySubItemActive ? "600" : "500"}
                >
                  {label}
                </Text>
              </HStack>
              <ChevronDown
                size={16}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </HStack>
          </Flex>

          {/* Sub Items */}
          <Box
            maxH={isOpen ? "500px" : "0"}
            overflow="hidden"
            transition="max-height 0.3s ease-in-out"
          >
            <VStack align="stretch" spacing={1} mt={2} pr={4}>
              {subItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Flex
                    w="full"
                    align="center"
                    cursor="pointer"
                    borderRadius="lg"
                    color={
                      location.pathname === item.path
                        ? textColor
                        : secondaryTextColor
                    }
                    bg={
                      location.pathname === item.path ? activeBg : "transparent"
                    }
                    _hover={{
                      bg: location.pathname === item.path ? activeBg : hoverBg,
                    }}
                    transition="all 0.2s ease-in-out"
                    py={2}
                    px={4}
                  >
                    <HStack spacing={3}>
                      <Circle
                        size="6px"
                        bg={
                          location.pathname === item.path
                            ? primaryColor
                            : secondaryTextColor
                        }
                      />
                      <Text
                        fontSize="sm"
                        fontWeight={
                          location.pathname === item.path ? "600" : "500"
                        }
                      >
                        {item.label}
                      </Text>
                    </HStack>
                  </Flex>
                </NavLink>
              ))}
            </VStack>
          </Box>
        </Box>
      );
    }
  );

  return (
    <Box
      w="250px"
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
        <Image src={logo} alt="Logo" w="140px" />
      </Flex>

      <Divider mb={6} borderColor={borderColor} />

      {/* Menu Section */}
      <VStack align="stretch" spacing={2} mb={6}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}

        {/* Products Collapsible Menu */}
        <CollapsibleMenuItem
          icon={Package}
          label="פריטים"
          subItems={productsSubMenu}
          isOpen={isProductsOpen}
          onToggle={() => setIsProductsOpen(!isProductsOpen)}
        />

        {/* Accounts Collapsible Menu */}
        <CollapsibleMenuItem
          icon={Users}
          label="חשבונות"
          subItems={accountsSubMenu}
          isOpen={isAccountsOpen}
          onToggle={() => setIsAccountsOpen(!isAccountsOpen)}
        />

        {/* Subscriptions Collapsible Menu */}
        <CollapsibleMenuItem
          icon={Shield}
          label="מנויים"
          subItems={subscriptionsSubMenu}
          isOpen={isSubscriptionsOpen}
          onToggle={() => setIsSubscriptionsOpen(!isSubscriptionsOpen)}
        />

        {/* Warehouses Collapsible Menu */}
        <CollapsibleMenuItem
          icon={Warehouse}
          label="מחסנים ומלאי"
          subItems={warehousesSubMenu}
          isOpen={isWarehousesOpen}
          onToggle={() => setIsWarehousesOpen(!isWarehousesOpen)}
        />

        {/* Settings Collapsible Menu */}
        <CollapsibleMenuItem
          icon={Settings}
          label="הגדרות"
          subItems={settingsSubMenu}
          isOpen={isSettingsOpen}
          onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
