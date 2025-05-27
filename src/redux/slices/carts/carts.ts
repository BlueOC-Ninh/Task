import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, UpdateCartPayload } from "../../../api/cartsApi";

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
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<UpdateCartPayload>) => {
      const index = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.carts[index] = {
          ...state.carts[index],
          quantity: action.payload.quantity,
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
  updateQuantity,
} = cartsSlice.actions;
export default cartsSlice.reducer;
