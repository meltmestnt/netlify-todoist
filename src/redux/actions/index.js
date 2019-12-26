import {
  CREATE_PROJECT,
  CREATE_FILTER,
  CREATE_MARK,
  CREATE_TASK,
  SORT_COLUMN,
  MOVE_TASK,
  DRAG_START,
  DRAG_END,
  SORT_MENU_COLUMN,
  DELETE_TASK,
  CHANGE_TASK
} from "../constants";

export const changeTask = (task, id, oldId) => {
  return {
    type: CHANGE_TASK,
    task: task,
    columnId: id,
    oldId: oldId
  };
};

export const deleteTask = ({ task, columnId, tagColumnId }) => {
  return {
    type: DELETE_TASK,
    task: task,
    columnId: columnId,
    tagColumnId: tagColumnId
  };
};

export const createProject = project => {
  return {
    type: CREATE_PROJECT,
    project: { ...project, taskIds: [], type: "project" }
  };
};

export const createFilter = filter => {
  return {
    type: CREATE_FILTER,
    filter
  };
};

export const createMark = mark => {
  return {
    type: CREATE_MARK,
    mark: { ...mark, taskIds: [], type: "mark" }
  };
};

export const sortMenuColumn = ({ columnId, elements }) => {
  return {
    type: SORT_MENU_COLUMN,
    columnId,
    elements
  };
};

export const createTask = (task, columnId, tagColumnId) => {
  return {
    type: CREATE_TASK,
    task,
    columnId,
    tagColumnId,
    comments: []
  };
};

export const sortColumn = ({ columnId, taskIds }) => {
  return {
    type: SORT_COLUMN,
    columnId,
    taskIds
  };
};

export const moveTask = ({
  sourceColumnId,
  sourceTaskIds,
  destinationColumnId,
  destinationTaskIds,
  tasks
}) => {
  return {
    type: MOVE_TASK,
    sourceColumnId,
    tasks,
    sourceTaskIds,
    destinationColumnId,
    destinationTaskIds
  };
};

export const dragStart = () => ({
  type: DRAG_START
});

export const dragEnd = () => ({
  type: DRAG_END
});
