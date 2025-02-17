import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchPizza = createAsyncThunk("pizza/fetchPizzas", async (params) => {
  try {
    const { sort, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6790ae6caf8442fd73773b6f.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sort}&${order}&${category}${search}`
    );
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

const initialState = {
  items: [],
  status: "loading", // loading | success | failed
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.status = "failed";
        state.items = [];
        state.error = action.error || "Произошла неизвестная ошибка";
      });
  },
});

export const selectPizzaSlice = (state) => state.pizzaSlice;
export { fetchPizza };
export default pizzaSlice.reducer;
