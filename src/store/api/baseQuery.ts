import { API_ROOT } from "@/constants/api";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import type { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_ROOT}`,
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.user?.token;
    const token = 12;

    headers.set("Accept", "application/json");
    headers.set("ngrok-skip-browser-warning", "true");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
