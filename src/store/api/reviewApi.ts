import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";
import { paymentApi } from "./paymentApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReviews: builder.query({
      query: () => ({
        url: endPoint.review.getMyReviews,
        credentials: "include",
      }),
      providesTags: ["Reviews"],
    }),

    getHotelReviews: builder.query({
      query: (hotelId) => ({
        url: endPoint.review.getHotelReviews(hotelId),
        credentials: "include",
      }),
      providesTags: ["Reviews"],
      // providesTags: (_result, _error, hotelId) => [{ type: "HotelReviews", id: hotelId }],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: endPoint.review.createReview,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(paymentApi.util.invalidateTags(["Bookings"]));
        } catch {
          // keep existing bookings cache on failure
        }
      },
    }),
  }),
});

export const { useGetMyReviewsQuery, useGetHotelReviewsQuery, useCreateReviewMutation } = reviewApi;
