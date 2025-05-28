import { all, fork } from "redux-saga/effects";
import todosSaga from "./slices/todos/saga";
import timerSaga from "./slices/timer/saga";

export default function* rootSaga() {
  yield all([fork(todosSaga), fork(timerSaga)]);
}
