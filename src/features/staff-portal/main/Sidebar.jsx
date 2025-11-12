import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text, Flex, Divider } from "@chakra-ui/react";
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
  const primaryColor = "primary.100";

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
    ({ icon: Icon, label, children, primaryColor }) => {
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
        <Box
          style={{
            contain: "layout style paint",
            transform: "translateZ(0)",
            willChange: isOpen ? "auto" : "auto",
          }}
        >
          <Flex
            w="full"
            align="center"
            cursor="pointer"
            borderRadius="xl"
            color={isActive ? "gray.800" : "gray.600"}
            _hover={{
              bg: isActive ? "white" : "gray.100",
            }}
            onClick={() => setIsOpen(!isOpen)}
            transition="all 0.2s ease-in-out"
          >
            {/* פס ירוק בצד שמאל (active indicator) */}
            <Box
              w="6px"
              h="45px"
              bg={isActive ? "primary.100" : "transparent"}
              borderRadius="150px 0 0 150px "
              transition="background-color 0.2s ease-in-out"
            />

            {/* תוכן התפריט */}
            <HStack flex="1" px={4} py={3} justifyContent="space-between">
              <HStack spacing={3}>
                <Icon size={18} />
                <Text fontSize="sm" fontWeight={isActive ? "600" : "400"}>
                  {label}
                </Text>
              </HStack>

              <Box
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease-out",
                }}
              >
                <ChevronDown size={16} />
              </Box>
            </HStack>
          </Flex>

          <Box
            overflow="hidden"
            style={{
              height: isOpen ? `${height}px` : "0px",
              transition: "height 0.2s ease-out",
              // GPU layer
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <VStack
              ref={contentRef}
              align="stretch"
              spacing={0}
              mt={1}
              pl={4}
              style={{
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.15s ease-in-out",
              }}
            >
              {children?.map((child, idx) => {
                const isChildActive = idx === 0 && label === "פריטים";
                return (
                  <Box key={idx}>
                    <HStack
                      px={4}
                      py={2}
                      cursor={child.disabled ? "not-allowed" : "pointer"}
                      opacity={child.disabled ? 0.5 : 1}
                      borderRadius="lg"
                      bg={isChildActive ? "primary.100" : "transparent"}
                      color={isChildActive ? primaryColor : "gray.600"}
                      _hover={
                        !child.disabled
                          ? {
                              bg: isChildActive ? "primary.100" : "gray.50",
                            }
                          : {}
                      }
                      transition="background-color 0.2s"
                      spacing={3}
                    >
                      <Circle
                        size={6}
                        fill={isChildActive ? primaryColor : "gray.400"}
                      />
                      <Text
                        fontSize="sm"
                        fontWeight={isChildActive ? "500" : "400"}
                      >
                        {child.label}
                      </Text>
                    </HStack>
                  </Box>
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
      w="220px"
      h="94vh"
      bg="#F7F7F7"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="25px"
      overflowY="auto"
      overflowX="hidden"
      css={{
        "&::-webkit-scrollbar": {
          width: "0px",
          background: "transparent",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollBehavior: "smooth",
        // בידוד מלא + GPU acceleration
        contain: "layout style paint",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
      p={4}
    >
      {/* Logo */}
      <Flex mb={4} gap={2}>
        <Image src={logo} alt="Logo" w="150px" />
      </Flex>

      <Divider mb={4} />

      {/* Menu Section */}
      <VStack p={1} align="stretch" mb={6}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} primaryColor={primaryColor} />
        ))}
      </VStack>

      <Divider my={4} />

      {/* Settings Section */}
      <VStack align="stretch" spacing={1}>
        <Text fontSize="xs" fontWeight="600" color="gray.500" mb={2} px={4}>
          הגדרות
        </Text>
        <MenuItem
          icon={Settings}
          label="הגדרות"
          children={settingsItems}
          primaryColor={primaryColor}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
