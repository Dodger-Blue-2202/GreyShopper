import React from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import { StyledEngineProvider } from "@mui/material/styles";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Router>
  </Provider>
);
