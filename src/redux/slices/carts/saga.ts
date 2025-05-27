import {
  all,
  call,
  put,
  takeEvery,
  takeLeading,
  takeLatest,
} from "redux-saga/effects";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  getCarts,
  getCartsFailure,
  getCartsSuccess,
  incrementQuantity,
} from "./carts";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../../api/cartsApi";
import cartApi from "../../../api/cartsApi";

function* getCartsWorker() {
  try {
    const carts: CartItem[] = yield call(cartApi.getAll);
    yield put(getCartsSuccess(carts));
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

function* addToCartWorker(action: PayloadAction<CartItem>) {
  try {
    const existingItem: CartItem | undefined = yield call(
      cartApi.getByProductId,
      action.payload.productId
    );
    if (existingItem) {
      yield call(cartApi.incrementQuantity, existingItem.productId);
    } else {
      yield call(cartApi.add, action.payload);
    }
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

function* deleteFromCartWorker(action: PayloadAction<number>) {
  try {
    yield call(cartApi.remove, action.payload);
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

function* incrementWorker(action: PayloadAction<number>) {
  try {
    yield call(cartApi.incrementQuantity, action.payload);
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

function* decrementWorker(action: PayloadAction<number>) {
  try {
    const existingItem: CartItem = yield call(
      cartApi.getByProductId,
      action.payload
    );
    if (existingItem.quantity <= 1) {
      yield call(cartApi.remove, action.payload);
    } else {
      yield call(cartApi.decrementQuantity, action.payload);
    }
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

export default function* cartSaga() {
  yield all([
    takeEvery(getCarts.type, getCartsWorker),
    takeLeading(addToCart.type, addToCartWorker),
    takeLatest(deleteFromCart.type, deleteFromCartWorker),
    takeLatest(incrementQuantity.type, incrementWorker),
    takeLatest(decrementQuantity.type, decrementWorker),
  ]);
}
