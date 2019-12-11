import React from "react";
import Task from "../components/Task";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
function DisplayList({
  list,
  id,
  day,
  stateSelector = "tasks",
  ListItem = Task
}) {
  const isDragging = useSelector(state => state[stateSelector].dragging);
  const theme = useTheme();

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            padding: "15px 10px",
            position: "relative",
            border:
              isDragging &&
              `1px dotted ${
                theme.palette.type === "light"
                  ? "rgba(211,211,211,0.9)"
                  : "rgba(255, 255, 255, 0.12)"
              }`
          }}
          {...provided.droppableProps}
        >
          {list.length > 0
            ? list.map((t, i) => <ListItem key={t.id} index={i} task={t} />)
            : snapshot.isDraggingOver && (
                <CircularProgress
                  color="error"
                  style={{ width: 20, height: 20 }}
                ></CircularProgress>
              )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DisplayList;
