import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TimerState } from "./type";

const initialState: TimerState = {
  time: 0,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    plusTime: (state) => {
      state.time += 1;
    },
    toggleTimer: (state, aciton: PayloadAction<boolean>) => {
      state.isRunning = aciton.payload;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.time = 0;
    },
  },
});

export const { resetTimer, toggleTimer, plusTime } = timerSlice.actions;
export default timerSlice.reducer;
