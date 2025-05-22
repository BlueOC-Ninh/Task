import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todos";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
