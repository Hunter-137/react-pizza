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
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
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
      const findRemoveIndex = state.items.findIndex((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      state.items.splice(findRemoveIndex, 1);

      state.totalPrice = state.items.reduce((acc, obj) => {
        acc += obj.price * obj.count;
        return acc;
      }, 0);

      state.totalCount = state.items.reduce((acc, obj) => {
        acc += obj.count;
        return acc;
      }, 0);
    },

    plusOneItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      findItem.count += 1;

      state.totalPrice = state.items.reduce((acc, obj) => {
        acc += obj.price * obj.count;
        return acc;
      }, 0);

      state.totalCount = state.items.reduce((acc, obj) => {
        acc += obj.count;
        return acc;
      }, 0);
    },

    minusOneItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem.count > 1) {
        findItem.count -= 1;
      } else {
        const findRemoveIndex = state.items.findIndex((obj) => {
          return (
            obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
          );
        });

        state.items.splice(findRemoveIndex, 1);
      }

      state.totalPrice = state.items.reduce((acc, obj) => {
        acc += obj.price * obj.count;
        return acc;
      }, 0);

      state.totalCount = state.items.reduce((acc, obj) => {
        acc += obj.count;
        return acc;
      }, 0);
    },
  },
});

export const selectCartSlice = (state) => state.cartSlice;

export const { setItems, clearItems, removeItem, plusOneItem, minusOneItem } =
  cartSlice.actions;
export default cartSlice.reducer;
