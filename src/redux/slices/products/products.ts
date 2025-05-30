import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "../../../api/productsApi";

interface InitialStateType {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  _limit?: number;
  _page?: number;
  search?: string;
}

const initialState: InitialStateType = {
  products: [],
  status: "idle",
  error: null,
  _limit: 5,
  _page: 1,
  search: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.status = "loading";
    },
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
      state.status = "idle";
    },
    getProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    pagination: (sate, action: PayloadAction<{ _page: number }>) => {
      sate._page = action.payload._page;
    },
    addProduct: (state, action: PayloadAction<CreateProductPayload>) => {
      state.products.push(action.payload);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: number; product: UpdateProductPayload }>
    ) => {
      const index = state.products.findIndex(
        (product: Product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const {
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  addProduct,
  updateProduct,
  deleteProduct,
  filterByName,
} = productsSlice.actions;
export default productsSlice.reducer;
