import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import invoicesReducer from "../reducers/invoicesSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
