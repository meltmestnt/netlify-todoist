import React from "react";
import ReactDOM from "react-dom";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import mainFirst from "./../img/mainfirst.jpg";
import mainSecond from "./../img/mainSecond.png";
import mainPhone from "./../img/mainPhone.png";
import mainFlowers from "./../img/mainFlowers.png";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { classes } from "istanbul-lib-coverage";
import SlideToProceed from "./../components/SlideToProceed";
import { ifAuthenticated } from "./../utils/localStorage";
const useStyles = makeStyles(theme => ({
  phoneImage: {
    position: "absolute",
    width: "460px",
    height: "auto",
    right: "50px",
    bottom: "-3%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      bottom: "-10%"
    }
  },
  typo: {
    textAlign: "center",
    margin: "5px 0px",
    padding: 10,
    color: "black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem !important"
    }
  }
}));
function MainPageContent(props) {
  const theme = useTheme();
  const classes = useStyles();

  return ReactDOM.createPortal(
    <div
      style={{
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 99999,
        background: "white",
        overflowY: "auto",
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto"
      }}
    >
      <Container
        direction="column"
        justify="flex-start"
        alignItems="center"
        maxWidth="lg"
        style={{ padding: "35px 0px" }}
      >
        <Typography className={classes.typo} variant="h3">
          Приведите все в порядок с Todoist
        </Typography>
        <SlideToProceed></SlideToProceed>

        <img
          style={{ margin: "10px 0px", width: "100%", height: "auto" }}
          src={mainFirst}
          alt=""
        />
        <div style={{ margin: "10px 0px", position: "relative" }}>
          <img
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: `translateX(-50%)`,
              width: "110%",
              height: "auto",
              zIndex: -1
            }}
            src={mainFlowers}
            alt=""
          />
          <img
            style={{ width: "100%", height: "auto" }}
            src={mainSecond}
            alt=""
          />
          <img className={classes.phoneImage} src={mainPhone} alt="" />
        </div>
      </Container>
    </div>,
    document.getElementById("portal-node")
  );
}

export default MainPageContent;
