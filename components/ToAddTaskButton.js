import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles(theme => ({
  addText: {
    display: "flex",
    marginTop: 15,
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    "& svg": {
      color: theme.palette.primary.main,
      fontWeight: "100"
    },
    "&:hover": {
      color: theme.palette.primary.main,
      "& svg": {
        borderRadius: "50%",
        transition: "0.3s",
        background: theme.palette.primary.main,
        color: "lightgray"
      }
    }
  },
  addIcon: {
    "&:hover": {
      color: "gray",
      backgroundColor: theme.palette.primary.main
    }
  }
}));
function ToAddTaskButton(props) {
  const ownClasses = useStyles();

  const { toggleTabs } = props;
  return (
    <Typography
      component="span"
      variant="body1"
      className={ownClasses.addText}
      onClick={e => toggleTabs(true)}
    >
      <AddIcon className={ownClasses.addIcon}></AddIcon>
      <Typography
        variant="body1"
        component="p"
        style={{ margin: "0px 15px 0px 15px" }}
      >
        Добавить задачу
      </Typography>
    </Typography>
  );
}

export default ToAddTaskButton;
