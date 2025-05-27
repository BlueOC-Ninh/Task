import { all, fork } from "redux-saga/effects";
import todosSaga from "./slices/todos/saga";
import timerSaga from "./slices/timer/saga";
import productsSaga from "./slices/products/saga";
import cartSaga from "./slices/carts/saga";

export default function* rootSaga() {
  yield all([
    fork(todosSaga),
    fork(timerSaga),
    fork(productsSaga),
    fork(cartSaga),
  ]);
}
