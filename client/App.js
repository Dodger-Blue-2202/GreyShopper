import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./components/Newnav";
import Routes from "./Routes";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    info: {
      main: "#2196f3",
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
