import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import tagsReducer from "./reducer/TagsReducer";
import taskReducer from "./reducer/TaskReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  tags: tagsReducer,
  tasks: taskReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhance = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhance);
export default store;
