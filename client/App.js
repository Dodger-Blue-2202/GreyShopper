import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b7b7b7",
    },
    info: {
      main: "#2196f3",
    },
    background: {
      default: "#d0d0d0",
      paper: "#f3f3f3",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
