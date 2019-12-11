import React from "react";
import { Draggable } from "react-beautiful-dnd";

function DraggableContainer({ id, children, index, ...rest }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          {children(provided, snapshot, rest)}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableContainer;
