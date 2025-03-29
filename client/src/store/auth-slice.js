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

export const login = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:3050/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
});

export const googleAuth = createAsyncThunk(
  "/auth/googleAuth",
  async ({ userName, email, avator }) => {
    const response = await axios.post(
      "http://localhost:3050/api/auth/googleAuth",
      { userName, email, avator },
      {
        withCredentials: true,
      }
    );
    return response?.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "/user/updateUserProfile",
  async ({ id, formData }) => {
    const result = await axios.post(
      `http://localhost:3050/api/user/update/${id}`,
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
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success);
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(login.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success);
        state.user = action.payload.success ? action.payload.user : null;
        console.log(state.user);
      })
      .addCase(googleAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success);
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      });
  },
});

export default authSlice.reducer;
