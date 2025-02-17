import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortType: {
    name: "популярности (возрастание)",
    sortProperty: "-rating",
  },
  currentPage: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCatedoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilterSlice = (state) => state.filterSlice;

export const {
  setCatedoryId,
  setSortType,
  setCurrentPage,
  setFilter,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
