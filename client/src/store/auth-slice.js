import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

export const signup = createAsyncThunk("/auth/signup", async (formData) => {
  const response = await axios.post(
    "http://localhost:3050/api/auth/signup",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isAuthenticated = false);
        state.user = null;
        state.error = null;
      })
      .addCase(signup.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
