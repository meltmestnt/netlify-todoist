import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  circle: {
    width: 20,

    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: 20,
    background: "transparent",
    borderRadius: "50%",
    border: `1px solid ${theme.palette.type === "light" ? "black" : "#D3D3D3"}`,
    transition: "0.3s",
    marginRight: 15,
    cursor: "pointer",
    "&:hover": {
      background: "rgba(211,211,211,0.3)"
    },
    "& svg": {
      width: "50%",
      height: "50%"
    }
  }
}));
function TaskTitle(props) {
  const { deleteTask, task } = props;
  const [displayDone, toggleIcon] = React.useState(false);
  const classes = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        className={classes.circle}
        onMouseOver={e => toggleIcon(true)}
        onMouseLeave={e => toggleIcon(false)}
        onClick={deleteTask}
      >
        <DoneIcon
          style={{ transition: "0.3s", opacity: displayDone ? 1 : 0 }}
        />
      </span>
      <Typography variant="body1">{task.title}</Typography>
    </div>
  );
}

export default TaskTitle;
