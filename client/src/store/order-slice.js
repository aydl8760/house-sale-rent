import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  order: [],
};

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async ({ userId, paymentMethod }) => {
    const response = await axios.post(
      "http://localhost:3050/api/order/create-order",
      {
        userId,
        paymentMethod,
      }
    );

    return response?.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.order = [];
      });
  },
});

export default orderSlice.reducer;
