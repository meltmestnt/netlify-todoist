import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import TaskInfoDialog from "./TaskInfoDialog";
function TaskInfo({ task, deleteTask }) {
  const [dialog, showDialog] = React.useState(false);
  return (
    <>
      <ErrorOutlineIcon
        style={{ cursor: "pointer" }}
        onClick={() => showDialog(true)}
      ></ErrorOutlineIcon>
      <TaskInfoDialog
        deleteTask={deleteTask}
        toggleDialog={showDialog}
        showDialog={dialog}
        task={task}
      ></TaskInfoDialog>
    </>
  );
}

export default TaskInfo;
