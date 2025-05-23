import { createSlice } from "@reduxjs/toolkit";
import type { InitialState, Status } from "./types";
import { v4 as uuidv4 } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: InitialState = {
  todos: [],
  status: "all",
  search: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: uuidv4(),
          name: action.payload,
          isDone: false,
        },
      ];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    markTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload)
          return { ...item, isDone: !item.isDone };
        return item;
      });
    },
    markAllDone: (state) => {
      state.todos = state.todos.map((item) => ({ ...item, isDone: true }));
    },
    filterByStatus: (state, actiton: PayloadAction<Status>) => {
      state.status = actiton.payload;
    },
    filterByName: (state, actiton: PayloadAction<string>) => {
      state.search = actiton.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  filterByName,
  filterByStatus,
  markAllDone,
  markTodo,
} = todosSlice.actions;
export default todosSlice.reducer;
