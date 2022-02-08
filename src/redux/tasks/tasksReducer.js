import * as types from "./tasksActionTypes";

export const INIT_STATE = {
  data: [],
};

const tasksReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case types.REQUEST_TASKS_SUCCESS:
    case types.DELETE_TASK_SUCCESS:
    case types.UPDATE_TASK_SUCCESS:
      return { data: payload };
    case types.ADD_TASK_REQUEST_SUCCESS:
      return { data: [payload, ...state.data] };
    default:
      return state;
  }
};

export default tasksReducer;
