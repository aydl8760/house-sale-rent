import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  list: [],
};

export const createList = createAsyncThunk(
  "/listing/createList",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3050/api/listing/create",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return result?.data;
  }
);

export const getListsByUserId = createAsyncThunk(
  "/user/getListsByUserId",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3050/api/user/userLists/${id}`,
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );

    return response.data;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.list = action.payload.createdList;
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
      })
      .addCase(getListsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListsByUserId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getListsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
      });
  },
});

export default listSlice.reducer;
