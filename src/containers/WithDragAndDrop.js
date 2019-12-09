import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { sortColumn, moveTask, dragStart, dragEnd } from "../redux/actions";

function WithDragAndDrop({ secondDroppable, children, columns, sort }) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  sort = sort
    ? sort
    : ({ destination, source, draggableId }) => {
        if (!destination) {
          dispatch(dragEnd());
          return;
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          dispatch(dragEnd());
          return;
        }
        const column = columns[source.droppableId] || columns;
        const finishColumn = columns[destination.droppableId] || columns;

        if (column === finishColumn) {
          const newTaskIds = Array.from(column.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);
          dispatch(
            sortColumn({
              columnId: column.id,
              taskIds: newTaskIds
            })
          );
          return;
        }
        const sourceTaskIds = Array.from(column.taskIds);
        sourceTaskIds.splice(source.index, 1);
        const destinationTaskIds = Array.from(finishColumn.taskIds);
        destinationTaskIds.splice(destination.index, 0, draggableId);
        const newTasks = Array.from(tasks);
        const [newTask] = tasks.filter((t, i) => {
          if (t.id === draggableId) {
            newTasks.splice(i, 1);
            return true;
          }
        });
        newTask.date = finishColumn.date;
        newTasks.push(newTask);
        dispatch(
          moveTask({
            sourceTaskIds,
            tasks: newTasks,
            sourceColumnId: column.id,
            destinationTaskIds,
            destinationColumnId: finishColumn.id
          })
        );
      };
  const start = () => {
    dispatch(dragStart());
  };
  return (
    <DragDropContext onDragStart={start} onDragEnd={sort}>
      {children()}
    </DragDropContext>
  );
}

export default WithDragAndDrop;
