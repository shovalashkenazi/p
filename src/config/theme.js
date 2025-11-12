import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const breakpoints = {
  xxs: "320px",
  xs: "400px",
  sm: "480px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  xxl: "1700px",
};

const fonts = {};

const lightTheme = {
  bodyBg: "#ffffff",
  bodyColor: "#000000",
  primary: { 100: "#F29A40", 200: "#F4983A", 300: "#F26E21" },
};

const darkTheme = {
  bodyBg: "#121212",
  bodyColor: "#ffffff",
  primary: { 100: "#F29A40", 200: "#F4983A", 300: "#F26E21" },
};

const direction = "rtl"; // או "ltr"

// יצירת theme
const defaultTheme = extendTheme({
  config,
  direction,
  styles: {
    global: (props) => ({
      body: {
        direction,
        textAlign: direction === "rtl" ? "right" : "left",
        bg: mode(lightTheme.bodyBg, darkTheme.bodyBg)(props),
        color: mode(lightTheme.bodyColor, darkTheme.bodyColor)(props),
      },
    }),
  },
  colors: {
    primary: lightTheme.primary,
  },
  fonts,
  breakpoints,
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
});

export { defaultTheme };
