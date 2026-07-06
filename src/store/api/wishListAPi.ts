import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const wishListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: (data) => ({
        url: endPoint.wishList.addToWishList,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotels", "wishList"],
    }),
    removeWishList: builder.mutation({
      query: (hotelId) => ({
        url: endPoint.wishList.removeFromWishList(hotelId),
        method: "DELETE",
      }),
      invalidatesTags: ["hotels", "wishList"],
    }),

    getWishList: builder.query<any, void>({
      query: () => ({
        url: endPoint.wishList.getWishList,
        credentials: "include",
      }),
      providesTags: ["hotels", "wishList"],
    }),
  }),
});

export const { useAddToWishListMutation, useRemoveWishListMutation, useGetWishListQuery } = wishListApi;
