import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  filterByName,
  getProducts,
  getProductsFailure,
  getProductsSuccess,
} from "./products";
import productApi, { type Product } from "../../../api/productsApi";

function* handleFilterProducts() {
  try {
    yield delay(200);
    yield call(fetchProducts);
  } catch (error: Error | any) {
    yield put(getProductsFailure(error.message));
  }
}

function* fetchProducts() {
  try {
    yield put(getProducts);
    const searchKeyword: string = yield select(
      (state) => state.products.search
    );
    const data: Product[] = yield call(productApi.getAll, {
      search: searchKeyword,
    });

    yield put(getProductsSuccess(data));
  } catch (error: Error | any) {
    yield put(getProductsFailure(error.message));
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(getProducts.type, fetchProducts),
    takeLatest(filterByName.type, handleFilterProducts),
  ]);
}
