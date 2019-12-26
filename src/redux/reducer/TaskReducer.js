import {
  CREATE_TASK,
  SORT_COLUMN,
  MOVE_TASK,
  DRAG_START,
  DRAG_END,
  DELETE_TASK,
  CHANGE_TASK
} from "./../constants";
import { getWeek } from "./../../utils/date";

const week = getWeek();
const columns = {};
for (let i = 0; i < week.length; i++) {
  columns[week[i].weekDay] = {
    id: week[i].weekDay,
    date: new Date(week[i].getTime),
    taskIds: []
  };
}
columns["Все"] = {
  id: "Все",
  date: null,
  taskIds: []
};
const initialState = {
  tasks: [],
  dragging: false,
  columns
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(t => {
          if (t.id === action.task.id) {
            return {
              ...t,
              ...action.task
            };
          } else return t;
        }),
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: [...state.columns[action.columnId].taskIds, action.task.id]
          },
          [action.oldId]: {
            ...state.columns[action.oldId],
            taskIds: state.columns[action.oldId].taskIds.filter(
              id => id !== action.task.id
            )
          }
        }
      };
      break;
    }
    case DELETE_TASK:
      if (!action.columnId) return { ...state };
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.task.id),
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: state.columns[action.columnId].taskIds.filter(
              id => id !== action.task.id
            )
          }
        }
      };
    case CREATE_TASK:
      if (!action.columnId) {
        return { ...state };
      }
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: [...state.columns[action.columnId].taskIds, action.task.id]
          }
        }
      };
      break;
    case SORT_COLUMN:
      return {
        ...state,
        dragging: false,
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: [...action.taskIds]
          }
        }
      };
      break;
    case MOVE_TASK:
      return {
        ...state,
        tasks: [...action.tasks],
        dragging: false,
        columns: {
          ...state.columns,
          [action.sourceColumnId]: {
            ...state.columns[action.sourceColumnId],
            taskIds: [...action.sourceTaskIds]
          },
          [action.destinationColumnId]: {
            ...state.columns[action.destinationColumnId],
            taskIds: [...action.destinationTaskIds]
          }
        }
      };
      break;
    case DRAG_START:
      return {
        ...state,
        dragging: true
      };
      break;
    case DRAG_END: {
      return {
        ...state,
        dragging: false
      };
    }
    default:
      return state;
  }
};
