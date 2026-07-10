import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: endPoint.bookings.createBooking,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),

    getBookings: builder.query({
      query: (args) => {
        const { Filter } = args || {};
        return {
          url: endPoint.bookings.getBookings,
          credentials: "include",
          params: Filter ? { Filter } : {},
        };
      },
      providesTags: ["Bookings"],
    }),
    getBookingById: builder.query({
      query: (id) => ({
        url: endPoint.bookings.bookingById(id),
        credentials: "include",
      }),
      providesTags: ["Bookings"],
    }),

    createPayment: builder.mutation({
      query: (data) => ({
        url: endPoint.payments.makePayment,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: endPoint.payments.verifyPayment,
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingsQuery, useCreatePaymentMutation, useVerifyPaymentMutation,useGetBookingByIdQuery } =
  paymentApi;
