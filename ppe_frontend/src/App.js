import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInScreen from "./Components/Auth/LoginScreen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import SignUpScreen from "./Components/Auth/SignupScreen";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#9A4749",
      main: "#9B282A",
      dark: "#5A1111",
    },
  },
  typography: {
    htmlFontSize: 17,
    fontFamily:
      "-apple-system,system-ui,BlinkMacSystemFont," +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontSize: 15,
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignInScreen} />
          <Route exact path="/signup" component={SignUpScreen} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
