import { all } from "redux-saga/effects";

import tasksSagas from "./tasks/tasksSagas";

export default function* () {
  yield all([tasksSagas()]);
}
