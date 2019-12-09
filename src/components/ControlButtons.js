import React from "react";
import { Box, IconButton } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "./Settings";
import Notifications from "./Notifications";
const useStyles = makeStyles({
  container: {
    justifyContent: "flex-end",
    display: "flex"
  },
  popover: {
    padding: "15px 25px"
  }
});

function ControlButtons(props) {
  const classes = useStyles();
  const [settings, toggleSettings] = React.useState(null);
  const [notifications, toggleNotifications] = React.useState(null);

  const showSettings = ev => toggleSettings(ev.currentTarget);
  const closeSettings = () => toggleSettings(null);
  const showNotifications = ev => toggleNotifications(ev.currentTarget);
  const closeNotifications = () => toggleNotifications(null);
  return (
    <Box className={classes.container}>
      <IconButton color="inherit" onClick={showNotifications}>
        <NotificationsActiveIcon></NotificationsActiveIcon>
      </IconButton>
      <Notifications
        classes={classes}
        el={notifications}
        handleClose={closeNotifications}
      ></Notifications>
      <IconButton color="inherit" onClick={showSettings}>
        <SettingsIcon></SettingsIcon>
      </IconButton>
      <Settings
        classes={classes}
        el={settings}
        handleClose={closeSettings}
      ></Settings>
      <IconButton
        onClick={e => {
          props.changeTheme();
          props.togglePopup("Тема изменена!");
        }}
        color="inherit"
      >
        <LocalPizzaIcon></LocalPizzaIcon>
      </IconButton>
    </Box>
  );
}

export default ControlButtons;
