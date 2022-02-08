import * as types from "./tasksActionTypes";

export const getTasksAction = (payload) => ({
  type: types.REQUEST_TASKS,
  payload: payload,
});

export const addTaskAction = (payload) => ({
  type: types.ADD_TASK_REQUEST,
  payload: payload,
});

export const editTaskAction = (payload) => ({
  type: types.UPDATE_TASK,
  payload: payload,
});

export const deleteTaskAction = (payload) => ({
  type: types.DELETE_TASK,
  payload: payload,
});
