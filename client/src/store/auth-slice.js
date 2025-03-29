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

export const deleteUserAccount = createAsyncThunk(
  "/user/deleteUserAccount",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3050/api/user/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:3050/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

/* export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get("http://localhost:3050/api/auth/checkAuth", {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
    withCredentials: true,
  });

  return response.data;
}); */

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
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isAuthenticated = false);
        state.user = null;
      })
      .addCase(deleteUserAccount.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.log(state.user);
      });
  },
});

export default authSlice.reducer;
