import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import TaskInfo from "./TaskInfo";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "@material-ui/core/styles";
import ArrowTooltip from "./ArrowTooltip";
import TaskTitle from "./TaskTitle";
import { deleteTask } from "./../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    padding: 10,
    margin: "0px 0px",
    alignItems: "center"
  },
  dragIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(-100%, -50%)",
    opacity: 0.6,
    cursor: "pointer"
  },
  icon: {
    opacity: 0.6
  }
}));

function Task({ task, index }) {
  const classes = useStyles();

  const theme = useTheme();
  const dispatch = useDispatch();
  const columns = useSelector(state => Object.values(state.tasks.columns));
  const delTask = () => {
    columns.forEach(c => {
      if (c.taskIds.includes(task.id)) {
        dispatch(
          deleteTask({
            task: task,
            columnId: c.id,
            tagColumnId: null
          })
        );
      }
    });
    [...task.projects, ...task.marks].forEach(i =>
      dispatch(deleteTask({ task, columnId: null, tagColumnId: i.id }))
    );
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div
              className={classes.container}
              style={{
                background:
                  theme.palette.type === "light" ? "white" : "#282C34",
                border: snapshot.isDragging
                  ? theme.palette.type === "light"
                    ? "1px solid lightgrey"
                    : "none"
                  : "none",

                boxShadow: snapshot.isDragging
                  ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
                  : "none",
                borderRadius: snapshot.isDragging ? "4px" : "0px"
              }}
            >
              {!snapshot.isDragging && (
                <ArrowTooltip
                  title="Переместить задачу"
                  button={
                    <div
                      className={classes.dragIcon}
                      {...provided.dragHandleProps}
                    >
                      <DragIndicatorIcon />
                    </div>
                  }
                ></ArrowTooltip>
              )}

              <TaskTitle deleteTask={delTask} task={task}></TaskTitle>
              <div>
                <TaskInfo deleteTask={delTask} task={task}></TaskInfo>
              </div>
            </div>
          </div>
          <Divider></Divider>
        </>
      )}
    </Draggable>
  );
}

export default Task;
