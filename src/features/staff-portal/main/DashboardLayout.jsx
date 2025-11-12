import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const bgMain = useColorModeValue("gray.50", "gray.900");
  const bgContent = useColorModeValue("white", "gray.800");

  return (
    <Flex
      h="100vh"
      dir="rtl"
      overflow="hidden"
      bg={bgMain}
      p={6}
      gap={5}
      fontFamily="'Varela Round', sans-serif"
    >
      {/* Sidebar */}
      <Box flexShrink={0}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Flex
        flex="1"
        direction="column"
        overflow="hidden"
        gap={4}
      >
        {/* Header */}
        <Box flexShrink={0}>
          <Header />
        </Box>

        {/* Scrollable Content with Outlet */}
        <Box
          flex="1"
          bg={bgContent}
          borderRadius="20px"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
          boxShadow="sm"
        >
          <Box
            h="100%"
            overflowY="auto"
            overflowX="hidden"
            css={{
              "&::-webkit-scrollbar": {
                width: "8px",
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
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
