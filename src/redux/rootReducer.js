import { combineReducers } from "redux";

import tasks from "./tasks/tasksReducer";

export default combineReducers({
  tasks,
});
