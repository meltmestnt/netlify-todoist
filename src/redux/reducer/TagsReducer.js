import {
  CREATE_PROJECT,
  CREATE_MARK,
  CREATE_FILTER,
  SORT_MENU_COLUMN,
  CREATE_TASK,
  SORT_COLUMN,
  DELETE_TASK
} from "../constants";

const initialState = {
  projects: [],
  marks: [],
  filters: []
};

const changeTaskIds = (state, action) => {
  let tag = null;
  let el = null;
  let newArr = [];
  Object.keys(state).forEach(k => {
    state[k].forEach((t, i) => {
      if (t.id === action.tagColumnId) {
        tag = k;
        el = { ...t, taskIds: [...t.taskIds, action.task.id] };
        newArr = [...state[tag]];
        newArr[i] = el;
      }
    });
  });
  return { newArr, tag };
};

const deleteTaskFromTaskIds = (state, action) => {
  let tag = null;
  let el = null;
  let newArr = [];
  Object.keys(state).forEach(k => {
    state[k].forEach((t, i) => {
      if (t.id === action.tagColumnId) {
        tag = k;
        el = { ...t, taskIds: t.taskIds.filter(id => id !== action.task.id) };
        newArr = [...state[tag]];
        newArr[i] = el;
      }
    });
  });
  return { newArr, tag };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TASK:
      if (!action.tagColumnId) return { ...state };
      let { newArr, tag } = deleteTaskFromTaskIds(state, action);
      return {
        ...state,
        [tag]: newArr || state[tag]
      };
    case SORT_COLUMN: {
      let tag = null;
      let el = null;
      let newArr = [];
      Object.keys(state).forEach(k => {
        state[k].forEach((t, i) => {
          if (t.id === action.columnId) {
            tag = k;
            el = { ...t, taskIds: action.taskIds };
            newArr = [...state[tag]];
            newArr[i] = el;
          }
        });
      });
      return { ...state, [tag]: newArr || state[tag] };
    }
    case CREATE_TASK: {
      if (action.tagColumnId) {
        let { newArr, tag } = changeTaskIds(state, action);
        return {
          ...state,
          [tag]: newArr || state[tag]
        };
      } else {
        return {
          ...state
        };
      }
    }
    case SORT_MENU_COLUMN: {
      return {
        ...state,
        [action.columnId]: [...action.elements]
      };
    }
    case CREATE_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.project]
      };
      break;
    }
    case CREATE_MARK: {
      return {
        ...state,
        marks: [...state.marks, action.mark]
      };
      break;
    }
    case CREATE_FILTER: {
      return {
        ...state,
        filters: [...state.filters, action.filter]
      };
      break;
    }
    default:
      return state;
  }
};
