import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chislo: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.chislo += 1;
    },
    decrement: (state) => {
      state.chislo -= 1;
    },
    incrementByAmount: (state, action) => {
      state.chislo += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
