import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Invoice } from "../schemas/invoice";
import APIService from "../service/api";
import { queryClient } from "../service/queryClient";
import { logoutUser } from "./authSlice";

export interface InvoiceState {
  invoices: Invoice[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | unknown;
}

const initialState: InvoiceState = {
  invoices: [],
  status: "idle",
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  "getInvoices",
  async (payload: number, { rejectWithValue }) => {
    const API = new APIService();
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: ["getInvoices", payload],
        queryFn: () => API.getInvoices(payload),
      });

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

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.invoices = action.payload;
    });

    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(logoutUser, () => {
      return initialState;
    });
  },
});

export default invoicesSlice.reducer;
