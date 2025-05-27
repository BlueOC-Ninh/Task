import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../../api/cartsApi";

interface InitialState {
  carts: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  _limit?: number;
  _page?: number;
}

const InitialState: InitialState = {
  carts: [],
  status: "idle",
  error: null,
  _limit: 5,
  _page: 1,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState: InitialState,
  reducers: {
    getCarts: (state) => {
      state.status = "loading";
    },
    getCartsSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.status = "succeeded";
      state.carts = action.payload;
      state.status = "idle";
    },
    getCartsFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.carts.push(action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter(
        (item) => item.productId !== action.payload
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.carts.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.carts[index] = {
          ...state.carts[index],
          quantity: state.carts[index].quantity + 1,
        };
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.carts.findIndex(
        (item) => item.productId === action.payload
      );

      if (index !== -1) {
        state.carts[index] = {
          ...state.carts[index],
          quantity: state.carts[index].quantity - 1,
        };
      }
    },
  },
});

export const {
  getCarts,
  getCartsSuccess,
  getCartsFailure,
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartsSlice.actions;
export default cartsSlice.reducer;
