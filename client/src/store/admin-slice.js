import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
};

export const adminOrder = createAsyncThunk("/admin/adminOrder", async () => {
  const response = await axios.get("http://localhost:3050/api/admin/orders");

  return response?.data;
});

export const adminVerifyOrder = createAsyncThunk(
  "/admin/adminVerifyOrder",
  async (orderId) => {
    const response = await axios.put(
      `http://localhost:3050/api/admin/verify-order/${orderId}`
    );

    return response?.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminOrder.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(adminOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = null;
      })
      .addCase(adminVerifyOrder.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.orderList = action.payload;
      });
  },
});

export default adminSlice.reducer;
