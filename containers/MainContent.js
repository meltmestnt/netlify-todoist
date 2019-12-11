import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import TodayContent from "./TodayContent";
import TomorrowContent from "./TomorrowContent";
import WeekContent from "./WeekContent";
import { useTheme } from "@material-ui/styles";
import WeekDayContent from "./WeekDayContent";
import TagContent from "./TagContent";
import RoutePreloader from "./RoutePreloader";
const useStyle = makeStyles(theme => {
  return {
    mainContent: {
      flexGrow: 1,
      display: "flex"
    },
    root: {
      paddingTop: "45px",
      paddingBottom: "45px",
      display: "flex",

      width: "100%",
      minHeight: "100%",
      height: "100%",
      background:
        theme.palette.type === "light" ? "rgba(255,255,255,0.3)" : "#282C34",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "50px",
        paddingBottom: "50px"
      }
    },
    content: {
      background: theme.palette.type === "light" ? "white" : "#282C34",
      flexGrow: 1,
      paddingTop: "45px",
      paddingBottom: "45px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "25px",
        paddingBottom: "25px"
      }
    },
    mainContainer: {
      display: "flex",
      flexGrow: 1,
      marginLeft: "334px",
      width: `calc(100% - 334px)`,
      position: "absolute",
      top: "0",

      minHeight: "100%",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0",
        width: "100%"
      }
    },
    container: {
      display: "flex",
      flexGrow: 1,
      padding: 0,
      position: "relative"
    }
  };
});
function MainContent(props) {
  const classes = useStyle();
  const theme = useTheme();
  return (
    <Router>
      <Route
        render={renderProps => (
          <RoutePreloader classes={classes} {...renderProps} {...props} />
        )}
      ></Route>
    </Router>
  );
}

export default MainContent;
