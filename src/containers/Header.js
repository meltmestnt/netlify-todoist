import React from "react";
import { AppBar, Toolbar, IconButton, Container } from "@material-ui/core";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Search from "./../components/Search";
import ControlButtons from "./../components/ControlButtons";
import Popup from "./../components/Popup";
const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "75%"
    }
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    height: 35,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  header: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    zIndex: theme.zIndex.drawer + 1
  }
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [popup, togglePopup] = React.useState("");
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = (ev, reason) => {
    if (reason === "clickaway") return;
    togglePopup(false);
  };
  const handleOpen = text => {
    togglePopup(text);
  };

  const { changeTheme } = props;
  return (
    <div className="header">
      <Popup undo={changeTheme} handleClose={handleClose} popup={popup}></Popup>
      <AppBar position="fixed" color="inherit" className={classes.header}>
        <Toolbar p={3} className={classes.container}>
          <IconButton
            onClick={e => (matches ? props.openMenu() : null)}
            color="inherit"
          >
            {matches ? (
              <MenuIcon></MenuIcon>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M21 0H3a3 3 0 0 0-3 3v3.7L4 9c.4.2.8.2 1.1 0l8-4.6a.8.8 0 0 1 .8 0l1 .5c.2.2.1.6 0 .7L5.1 11c-.4.3-.7.3-1.2 0L0 8.8v2l4 2.4c.4.2.8.2 1.1 0l8-4.6a.8.8 0 0 1 .8 0l1 .5c.2.1.1.5 0 .6l-9.7 5.6c-.4.2-.7.3-1.2 0A857 857 0 0 1 0 13v2l4 2.3c.4.2.8.2 1.1 0l8-4.6a.8.8 0 0 1 .8 0l1 .5c.2.2.1.6 0 .7l-9.7 5.5c-.4.3-.7.3-1.2 0a857 857 0 0 1-4-2.3v4A3 3 0 0 0 3 24h18a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3"
                ></path>
              </svg>
            )}
          </IconButton>
          <Container className={classes.controls}>
            <Search classes={classes}></Search>
            <ControlButtons
              togglePopup={handleOpen}
              changeTheme={changeTheme}
            ></ControlButtons>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
