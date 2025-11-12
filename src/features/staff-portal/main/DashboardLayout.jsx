import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Flex
      h="100vh"
      dir="rtl"
      overflow="hidden"
      p={5}
      gap={4} // רווח אופקי בין Sidebar לתוכן
      fontFamily="'Varela Round', sans-serif"
    >
      {/* Sidebar */}
      <Box overflow="hidden">
        <Sidebar />
      </Box>

      {/* Main Area */}
      <Flex
        flex="1"
        direction="column"
        borderRadius="15px"
        bg={useColorModeValue("white", "gray.900")}
        overflow="hidden"
      >
        {/* Header */}
        <Box flexShrink={0} mb={3}>
          <Header />
        </Box>

        {/* Scrollable Content */}
        <Box>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
