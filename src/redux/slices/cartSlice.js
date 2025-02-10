import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items.push(action.payload);
    },
  },
});

export const { setItems } = cartSlice.actions;
export default cartSlice.reducer;
