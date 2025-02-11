import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem ? (findItem.count += 1) : state.items.push(action.payload);

      state.totalPrice = state.items.reduce((acc, obj) => {
        acc += obj.price * obj.count;
        return acc;
      }, 0);

      state.totalCount = state.items.reduce((acc, obj) => {
        acc += obj.count;
        return acc;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const { setItems, clearItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
