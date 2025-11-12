// main.jsx או index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultTheme } from "./config/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider resetCSS theme={defaultTheme}>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
