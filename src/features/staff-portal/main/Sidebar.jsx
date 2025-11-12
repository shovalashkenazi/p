import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text, Flex, Divider, useColorModeValue } from "@chakra-ui/react";
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
} from "lucide-react";

import { Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const primaryColor = useColorModeValue("primary.100", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const activeBg = useColorModeValue("white", "gray.600");

  const menuItems = [
    {
      icon: Package,
      label: "פריטים",
      children: [
        { label: "ניהול פריטים" },
        { label: "קטגוריה 1" },
        { label: "קטגוריה 2" },
        { label: "קטגוריה 3" },
      ],
    },
    {
      icon: BookOpen,
      label: "קטלוג",
      children: [{ label: "ראשי" }],
    },
    {
      icon: Wrench,
      label: "כלים",
      children: [
        { label: "כלים ממשלתיים" },
        { label: "כלים כבדים" },
        { label: "כלים תעשייתיים" },
      ],
    },
    {
      icon: Users,
      label: "לקוחות",
      children: [{ label: "ניהול לקוחות" }],
    },
    {
      icon: Building2,
      label: "ספקים",
      children: [
        { label: "ספקים" },
        { label: "בקשה להצעת מחיר מספק", disabled: true },
        { label: "הזמנה מספק", disabled: true },
        { label: "קליטת חשבונית מספק", disabled: true },
      ],
    },
    {
      icon: FileText,
      label: "מסמכים",
      children: [
        { label: "הצעת מחיר" },
        { label: "תעודת משלוח" },
        { label: "כרטיס עבודה" },
        { label: "חשבונית עסקה" },
        { label: "הזמנת מכירות" },
        { label: "חשבונית מס" },
        { label: "חשבונית מס-קבלה" },
        { label: "תעודת החזרה" },
        { label: "חשבונית זיכוי" },
        { label: "קבלה" },
      ],
    },
    {
      icon: Warehouse,
      label: "מחסנים ומלאי",
      children: [
        { label: "פורטל מחסנאים" },
        { label: "ניהול מחסנים" },
        { label: "תעודת כניסה למלאי" },
        { label: "תעודת יציאה מהמלאי" },
        { label: "תעודת העברה בין מחסנים" },
        { label: "הזמנת רכש" },
        { label: "ספירת מלאי" },
      ],
    },
    {
      icon: Truck,
      label: "מסלולי נהגים",
      children: [{ label: "ניהול מסלולי נהגים" }],
    },
    {
      icon: Shield,
      label: "ביטוח",
      children: [
        { label: "מכתבי שירות" },
        { label: "קריאות שירות" },
        { label: "מנויים" },
      ],
    },
    {
      icon: Briefcase,
      label: "תפעול",
      children: [
        { label: "עובדי משרד" },
        { label: "סוכני ביטוח" },
        { label: "חברות ביטוח" },
        { label: "מתקינים" },
        { label: "מחסנאים" },
      ],
    },
  ];

  const settingsItems = [
    { label: "הגדרות פיתוח" },
    { label: "הגדרות כניסת משתמשים" },
    { label: "הוספת סטטוסים כללית" },
    { label: "ניהול קטגוריות פריטים" },
  ];

  const MenuItem = React.memo(
    ({ icon: Icon, label, children }) => {
      const [isOpen, setIsOpen] = useState(false);
      const isActive = label === "פריטים";
      const contentRef = useRef(null);
      const [height, setHeight] = useState(0);

      useEffect(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        }
      }, [children]);

      return (
        <Box>
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
            onClick={() => setIsOpen(!isOpen)}
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

              <Box
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                transition="transform 0.2s ease-out"
              >
                <ChevronDown size={16} />
              </Box>
            </HStack>
          </Flex>

          <Box
            overflow="hidden"
            height={isOpen ? `${height}px` : "0px"}
            transition="height 0.25s ease-out"
          >
            <VStack
              ref={contentRef}
              align="stretch"
              spacing={1}
              mt={2}
              pl={4}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s ease-in-out"
            >
              {children?.map((child, idx) => {
                const isChildActive = idx === 0 && label === "פריטים";
                return (
                  <HStack
                    key={idx}
                    px={4}
                    py={2}
                    cursor={child.disabled ? "not-allowed" : "pointer"}
                    opacity={child.disabled ? 0.5 : 1}
                    borderRadius="lg"
                    bg={isChildActive ? primaryColor : "transparent"}
                    color={isChildActive ? "white" : secondaryTextColor}
                    _hover={
                      !child.disabled
                        ? {
                            bg: isChildActive ? primaryColor : hoverBg,
                            transform: "translateX(-2px)",
                          }
                        : {}
                    }
                    transition="all 0.2s"
                    spacing={3}
                  >
                    <Circle
                      size={6}
                      fill={isChildActive ? "white" : secondaryTextColor}
                    />
                    <Text
                      fontSize="sm"
                      fontWeight={isChildActive ? "600" : "400"}
                    >
                      {child.label}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </Box>
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

      <Divider my={6} borderColor={borderColor} />

      {/* Settings Section */}
      <VStack align="stretch" spacing={2}>
        <Text
          fontSize="xs"
          fontWeight="700"
          color={secondaryTextColor}
          mb={2}
          px={4}
          textTransform="uppercase"
          letterSpacing="wide"
        >
          הגדרות
        </Text>
        <MenuItem
          icon={Settings}
          label="הגדרות"
          children={settingsItems}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
