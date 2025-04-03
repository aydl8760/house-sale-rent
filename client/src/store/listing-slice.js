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

export const getListById = createAsyncThunk(
  "/listing/getListById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3050/api/listing/get-List/${id}`
    );
    return response.data;
  }
);

export const updateCreatedList = createAsyncThunk(
  "/list/updateCreatedList",
  async ({ formData, id }) => {
    const result = await axios.put(
      `http://localhost:3050/api/listing/update/${id}`,
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
      })
      .addCase(getListById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListById.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.list = action;
        state.error = false;
      })
      .addCase(getListById.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = true;
      })
      .addCase(updateCreatedList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCreatedList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(updateCreatedList.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
      });
  },
});

export default listSlice.reducer;
