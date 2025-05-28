import { call, put, takeEvery } from "redux-saga/effects";
import type { Todo } from "./types";
import { initTodos } from "./todos";
async function handleFetchTodos() {
  const todos = await fetch("http://localhost:5173/todo.json");
  return todos;
}

function* fetchTodos(): Generator<any, void, any> {
  const response: Response = yield call(handleFetchTodos);
  const data: Todo[] = yield call([response, response.json]);
  yield put(initTodos(data));
}

export default function* todosSaga() {
  yield takeEvery("todos/fetchTodos", fetchTodos);
}
