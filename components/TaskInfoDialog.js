import React from "react";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TaskBelongColumn from "./TaskBelongColumn";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TaskTitle from "./TaskTitle";
import DatePicker from "./DatePicker";
import ProjectsSuggest from "./ProjectsSuggest";
import MarksSuggest from "./MarksSuggest";
import PrioritySuggest from "./PrioritySuggest";
import { useTagControls } from "./../utils/taskFilter";
const useStyles = makeStyles(theme => ({
  icon: {
    cursor: "pointer",
    margin: "0px 5px"
  },
  button: {
    padding: 5,
    minWidth: "auto"
  },
  paper: {
    width: 600,
    padding: 25,
    height: "95%",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: "100% !important",
      margin: "0px !important",
      maxHeight: "100% !important",
      maxWidth: "100% !important"
    }
  },
  container: {
    justifyContent: "flex-end"
  }
}));

const Transition = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const windowSize = useMediaQuery(theme.breakpoints.up("sm"));
  return windowSize ? (
    <Slide direction="left" {...props} timeout={300} ref={ref}></Slide>
  ) : (
    <Grow {...props} timeout={500} ref={ref}></Grow>
  );
});
function TaskInfoDialog({ showDialog, toggleDialog, task, deleteTask }) {
  const classes = useStyles();
  console.log(task);
  const [date, setDate] = React.useState(task.date);
  const handleClose = () => {
    toggleDialog(false);
    setDate(task.date);
  };
  let {
    marks: [marks, setMarks],
    projects: [projects, setProjects],
    priority: [priority, setPriority]
  } = useTagControls(null, task);
  console.log("TASKINFODIALOG", marks, projects, priority);
  return (
    <Dialog
      classes={{ paper: classes.paper, container: classes.container }}
      open={showDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <TaskBelongColumn task={task} close={handleClose}></TaskBelongColumn>
      <div style={{ padding: 15 }}>
        <TaskTitle task={task} deleteTask={deleteTask} />
        <div style={{ margin: "20px 0px", width: "150px" }}>
          <DatePicker date={date} setDate={setDate} outlined></DatePicker>
        </div>
        <ProjectsSuggest
          setProjects={setProjects}
          projects={projects}
          classes={classes}
        ></ProjectsSuggest>

        <MarksSuggest
          setMarks={setMarks}
          marks={marks}
          classes={classes}
        ></MarksSuggest>
        <PrioritySuggest
          setPriority={setPriority}
          priority={priority}
          classes={classes}
        ></PrioritySuggest>
      </div>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          ок
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(TaskInfoDialog);
