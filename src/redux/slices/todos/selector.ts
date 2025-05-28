import { createSelector } from "reselect";
import type { Todo } from "./types";
import type { RootState } from "../../store";

const selectTodos = (state: RootState) => state.todos.todos;
const selectSearch = (state: RootState) => state.todos.search;
const selectStatus = (state: RootState) => state.todos.status;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectSearch, selectStatus],
  (todos, search, status) => {
    if (status === "all") {
      return todos?.filter((item: Todo) => item?.name.includes(search));
    }
    const convertStatus = status === "done" ? true : false;
    return todos?.filter(
      (item: Todo) =>
        item?.name.includes(search) && item?.isDone === convertStatus
    );
  }
);
