import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import DisplayList from "./DisplayList";
import { sortMenuColumn } from "./../redux/actions";
import Tag from "./../components/Tag";
function MenuDragAndDrop({ list, id, children }) {
  const dispatch = useDispatch();
  const start = ({ source, destination, draggableId }) => {
    const listCopy = Array.from(list);

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const [item] = listCopy.filter(e => e.id === draggableId);
    listCopy.splice(source.index, 1);
    listCopy.splice(destination.index, 0, item);
    dispatch(
      sortMenuColumn({
        columnId: id,
        elements: listCopy
      })
    );
  };
  return <DragDropContext onDragEnd={start}>{children()}</DragDropContext>;
}

export default MenuDragAndDrop;
