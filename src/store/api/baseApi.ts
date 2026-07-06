import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["hotels", "rooms", "notifications", "amenities", "policies", "wishList", "Reviews", "Bookings","chat","Profile","hotelDetail"],
  endpoints: () => ({}),
});
