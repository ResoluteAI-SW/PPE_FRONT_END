import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInScreen from "./Components/Auth/LoginScreen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import SignUpScreen from "./Components/Auth/SignupScreen";
import AdminDashboard from "./Components/AdminDashboard";
import firebase from "./FirebaseConfig";

// const mainTheme = createMuiTheme({
//   palette: {
//     primary: {
//       light: "#9A4749",
//       main: "#F72A1F",
//       dark: "#5A1111",
//     },
//     secondary: {
//       light: "#000000",
//       main: "#FFFFFF",
//       dark: "#000000",
//     },
//   },
//   typography: {
//     htmlFontSize: 17,
//     fontFamily: "Poppins, Raleway, Roboto, sans-serif",
//     fontSize: 15,
//   },
//   shape: {
//     borderRadius: 10,
//   },
// });

function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user info: ", user.toJSON());
      } else {
        console.log("null user");
      }
    });
    console.log("current user: ", firebase.auth().currentUser);
  }, []);

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignInScreen} />
          <Route exact path="/signup" component={SignUpScreen} />
          <Route exact path="/dashboard" component={AdminDashboard} />
        </Switch>
      </Router>
  );
}

export default App;
