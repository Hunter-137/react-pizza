import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности (возрастание)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCatedoryId(state, action) {
      state.categoryId = action.payload;
    },
    
  },
});

export const { setCatedoryId } = filterSlice.actions;
export default filterSlice.reducer;
