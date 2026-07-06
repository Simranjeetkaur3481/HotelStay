import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";

export const rootReducres = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
