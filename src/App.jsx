import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./styles/globals.css";
import "./styles/style.css";
import "./styles/slideshow.css";
import Landing from "./page/landing.jsx";
import AnimatedRoutes from "./routes/animated_routes.jsx";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(15, 87, 33, 1)",
      },
      secondary: {
        main: "#d32f2f",
      },
      background: {
        default: "#f5f5f5",
      },
    },
    typography: {
      fontFamily: "Raleway, Arial",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AnimatedRoutes />
    </ThemeProvider>
  );
};

export default App;
