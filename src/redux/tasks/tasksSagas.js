import { all, call, put, takeLatest, select } from "redux-saga/effects";

import * as types from "./tasksActionTypes";
import * as tasksApi from "../../api/tasks";

function* getTasksSaga({ payload }) {
  const { filter, onSuccess, onFail } = payload;
  try {
    const response = yield call(tasksApi.getTasksApi, { params: { filter } });

    yield put({ type: types.REQUEST_TASKS_SUCCESS, payload: response });
    yield onSuccess && onSuccess();
  } catch (err) {
    yield onFail && onFail();
    console.error(err);
  }
}

function* addTaskSaga({ payload }) {
  try {
    const response = yield call(tasksApi.addTaskApi, { body: { content: payload } });

    yield put({ type: types.ADD_TASK_REQUEST_SUCCESS, payload: response });
  } catch (err) {
    console.error(err);
  }
}

function* editTaskSaga({ payload }) {
  try {
    const response = yield call(tasksApi.editTaskApi, { body: payload });
    const tasks = yield select((state) => state.tasks.data);

    yield put({
      type: types.UPDATE_TASK_SUCCESS,
      payload: tasks.map((el) => {
        if (el.id === response.id) {
          return { ...el, ...response };
        }
        return el;
      }),
    });
  } catch (err) {
    console.error(err);
  }
}

function* deleteTaskSaga({ payload }) {
  try {
    const response = yield call(tasksApi.deleteTaskApi, { body: payload });
    const tasks = yield select((state) => state.tasks.data);

    yield put({
      type: types.DELETE_TASK_SUCCESS,
      payload: tasks.filter((el) => el.id !== response.id),
    });
  } catch (err) {
    console.error(err);
  }
}

export default function* () {
  yield all([yield takeLatest(types.REQUEST_TASKS, getTasksSaga)]);
  yield all([yield takeLatest(types.ADD_TASK_REQUEST, addTaskSaga)]);
  yield all([yield takeLatest(types.UPDATE_TASK, editTaskSaga)]);
  yield all([yield takeLatest(types.DELETE_TASK, deleteTaskSaga)]);
}
