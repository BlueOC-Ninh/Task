import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todos/todos";
import timerReducer from "./slices/timer/timer";
import productsReducer from "./slices/products/products";
import cartsReducer from "./slices/carts/carts";
import { useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timer: timerReducer,
    products: productsReducer,
    carts: cartsReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
