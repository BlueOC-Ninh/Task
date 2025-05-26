import { all, cancel, delay, fork, put, take } from "redux-saga/effects";
import { plusTime, resetTimer, toggleTimer } from "./timer";

function* watchTimerFlow(): Generator<any, void, any> {
  let task: any = null;

  while (true) {
    const action = yield take([toggleTimer.toString(), resetTimer.toString()]);

    if (action.type === toggleTimer.toString()) {
      const isRunning = action.payload;

      if (isRunning) {
        if (!task) {
          task = yield fork(watchPlustTimer);
        }
      } else {
        if (task) {
          yield cancel(task);
          task = null;
        }
      }
    }

    if (action.type === resetTimer.toString()) {
      if (task) {
        yield cancel(task);
        task = null;
      }
    }
  }
}

function* watchResetTimer() {
  yield put(resetTimer());
}

function* watchPlustTimer(): Generator<any, void, any> {
  while (true) {
    yield delay(1000);
    yield put(plusTime());
  }
}

export default function* timerSaga() {
  yield all([watchTimerFlow(), watchResetTimer()]);
}
