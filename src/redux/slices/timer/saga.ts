import {
  all,
  cancel,
  delay,
  fork,
  put,
  select,
  take,
} from "redux-saga/effects";
import { plusTime, resetTimer, toggleTimer } from "./timer";
import { toast } from "react-toastify";

function* watchTimerFlow(): Generator<any, void, any> {
  let task: any = null;

  while (true) {
    const action = yield take([toggleTimer.type, resetTimer.type]);

    const isToggle = action.type === toggleTimer.type;
    const isReset = action.type === resetTimer.type;

    if (isToggle) {
      const isRunning = action.payload;

      if (isRunning && !task) {
        task = yield fork(watchPlustTimer);
      }

      if (!isRunning && task) {
        yield cancel(task);
        task = null;
      }
    }

    if (isReset && task) {
      yield cancel(task);
      task = null;
    }
  }
}

function* watchResetTimer() {
  yield put(resetTimer());
}

function* watchPlustTimer() {
  while (true) {
    yield delay(1000);
    yield put(plusTime());

    const currentTime: number = yield select((state) => state.timer.time);

    if (currentTime === 50) {
      toast.warning(
        "Time is about to end, you have 10 seconds left to save information."
      );
    } else if (currentTime === 60) {
      toast.error("Time is up!");
      yield put(resetTimer());
      return;
    }
  }
}

export default function* timerSaga() {
  yield all([watchTimerFlow(), watchResetTimer()]);
}
