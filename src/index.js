import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import rootReducer from "./store/reducers";
import "./assets/index.css";

const store = createStore(rootReducer);

const theme = createMuiTheme({
  typography: {
    fontFamily: "PTSans",
    fontSize: 12
  },
  palette: {
    primary: {
      main: "#DF0024"
    },
    secondary: {
      main: "#6A6C6F"
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
