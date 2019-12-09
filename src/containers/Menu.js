import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import Drawer from "@material-ui/core/Drawer";
import EventIcon from "@material-ui/icons/Event";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Divider from "@material-ui/core/Divider";
import ProjectsItem from "../components/ProjectsItem";
import MarksItem from "../components/MarksItem";
import FiltersItem from "../components/FiltersItem";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

import DisplayFavouriteTags from "../components/DisplayFavouriteTags";
import { useTasksCount } from "../utils/taskFilter";
import { getWeek, getTomorrow } from "../utils/date";
const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  MenuContainer: {
    paddingTop: "25px",
    position: "relative",
    height: "100%"
  },
  paperDrawer: {
    width: "280px",
    paddingTop: "65px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    backgroundColor: theme.palette.type === "light" ? "#eeeeee" : "#212121"
  },
  Menu: {
    padding: 10,
    position: "fixed",
    height: "100%",
    width: "333px",
    flexGrow: 1,
    background: theme.palette.type === "light" ? "transparent" : "#282C34",
    transform: `translateX(-100%)`,
    [theme.breakpoints.down("sm")]: {
      position: "static",
      marginLeft: "0%",
      width: "auto",
      transform: `translateX(0%)`
    }
  },
  typo: {
    fontWeight: "lighter",
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: "1rem"
  },
  itemIcon: { minWidth: "0", marginRight: 15 }
  /* selected: {
    background: `${fade(
      theme.palette.type === "light"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
      0.25
    )} !important`
  } */
}));

function Menu(props) {
  const classes = useStyles();
  const { menuOpen, handleMenuClose } = props;
  const todayTasks = useTasksCount(new Date()).length;
  const tomorrowTasks = useTasksCount(new Date(getTomorrow().getTime)).length;
  const weekTasks = useTasksCount(new Date(getWeek()[6].getTime), true).length;
  const close = () => handleMenuClose(false);
  const drawer = (
    <List className={classes.Menu}>
      {[
        {
          text: "Сегодня",
          icon: TodayIcon,
          to: "/сегодня",
          tasksCount: todayTasks
        },
        {
          text: "Завтра",
          icon: EventIcon,
          to: "/завтра",
          tasksCount: tomorrowTasks
        },
        {
          text: "Неделя",
          icon: DateRangeIcon,
          to: "/неделя",
          tasksCount: weekTasks
        }
      ].map((item, i) => (
        <ListItem
          style={{
            padding: "5px",
            margin: "5px 0px 0px 0px",
            maxWidth: "384px"
          }}
          button
          component={Link}
          onClick={close}
          to={item.to}
        >
          <ListItemIcon className={classes.itemIcon}>
            <Badge badgeContent={item.tasksCount || 0}>
              <item.icon color={"inherit"}></item.icon>
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" className={classes.typo}>
                {item.text}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      ))}
      <DisplayFavouriteTags
        close={close}
        classes={classes}
        handleMenuClose={handleMenuClose}
      />
      <Divider style={{ margin: "10px 0px 10px 0px" }}></Divider>
      <ProjectsItem classes={classes}></ProjectsItem>
      <MarksItem classes={classes}></MarksItem>
      <FiltersItem classes={classes}></FiltersItem>
    </List>
  );
  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 0,
          right: 0,

          paddingTop: 35,
          minHeight: "100%"
        }}
      >
        <Hidden smDown>{drawer}</Hidden>
      </div>

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={menuOpen}
          onClose={handleMenuClose}
          classes={{
            paper: classes.paperDrawer
          }}
          style={{
            zIndex: 900
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}

export default Menu;
