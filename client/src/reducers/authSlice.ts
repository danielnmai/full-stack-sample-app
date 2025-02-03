import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginRequest } from "../schemas/auth";
import APIService from "../service/api";
import { queryClient } from "../service/queryClient";

export interface AuthState {
  loading: boolean;
  userId: number | null;
  userEmail: string | null;
  accessToken: string | undefined | null;
  error: string | unknown;
}

const initialState: AuthState = {
  loading: false,
  userId: null,
  userEmail: null,
  accessToken: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { rejectWithValue }) => {
    const API = new APIService();
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: ["login", payload],
        queryFn: () => API.login(payload),
      });

      API.setHeaderToken(data.accessToken);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data.message)
          return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
