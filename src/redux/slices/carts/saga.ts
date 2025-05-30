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
  deleteFromCart,
  getCarts,
  getCartsFailure,
  getCartsSuccess,
  updateQuantity,
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
  yield call(cartApi.add, action.payload);
  // yield put(getCarts());
  // try {
  //   const existingItem: CartItem | undefined = yield call(
  //     cartApi.findByProductId,
  //     action.payload.productId
  //   );

  //   if (existingItem) {
  //     const newQuantity = existingItem.quantity + 1;
  //     yield call(cartApi.updateQuantity, {
  //       id: existingItem.id,
  //       quantity: newQuantity,
  //     });
  //     yield put(updateQuantity({ id: existingItem.id, quantity: newQuantity }));
  //   } else {
  //     yield call(cartApi.add, action.payload);
  //     yield put(addToCart(action.payload));
  //   }
  // } catch (error: any) {
  //   yield put(getCartsFailure(error.message));
  // }
}

function* deleteFromCartWorker(action: PayloadAction<string>) {
  try {
    yield call(cartApi.remove, action.payload);
    yield put(deleteFromCart(action.payload));
  } catch (error: any) {
    yield put(getCartsFailure(error.message));
  }
}

function* incrementWorker(action: PayloadAction<string>) {
  const item: CartItem = yield call(cartApi.getById, action.payload);
  yield call(cartApi.updateQuantity, {
    id: item.id,
    quantity: item.quantity + 1,
  });
  yield put(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
}

function* decrementWorker(action: PayloadAction<string>) {
  const item: CartItem = yield call(cartApi.getById, action.payload);
  if (item.quantity <= 1) {
    yield call(cartApi.remove, action.payload);
    yield put(deleteFromCart(item.id));
  } else {
    yield call(cartApi.updateQuantity, {
      id: item.id,
      quantity: item.quantity - 1,
    });
  }
  yield put(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
}

export default function* cartSaga() {
  yield all([
    takeEvery(getCarts.type, getCartsWorker),
    takeLeading(addToCart.type, addToCartWorker),
    takeLatest(deleteFromCart.type, deleteFromCartWorker),
    takeEvery("carts/incrementQuantity", incrementWorker),
    takeEvery("carts/decrementQuantity", decrementWorker),
  ]);
}
