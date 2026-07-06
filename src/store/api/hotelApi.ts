import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: (params) => {
        return {
          url: endPoint.hotels.getHotels,
          credentials: "include",
          params,
        };
      },
      providesTags: ["hotels"],
    }),
    // getHotels: builder.query({
    //   query: (args) => {
    //     const { Search } = args || {};
    //     return {
    //       url: endPoint.hotels.getHotels,
    //       credentials: "include",
    //       params: Search ? { Search } : {},
    //     };
    //   },
    //   providesTags: (result) =>
    //     result?.data
    //       ? [...result.data.map(({ id }: { id: number }) => ({ type: "hotels" as const, id })), "hotels"]
    //       : ["hotels"],
    // }),

    getHotelById: builder.query({
      query: (id) => ({
        url: endPoint.hotels.getHotelById(id),
        credentials: "include",
      }),
      providesTags: (_result, _error, id) => [{ type: "hotels", id }, "hotelDetail"],
    }),

    getHotelDetail: builder.query({
      query: (id) => ({
        url: endPoint.hotels.getHotelDetail(id),
        credentials: "include",
      }),
      // providesTags: (_result, _error, id) => [{ type: "hotels", id }, "hotelDetail"],
      providesTags: ["hotels", "hotelDetail"],
    }),

    //get hotels rooms
    addHotel: builder.mutation({
      query: (data) => ({
        url: endPoint.hotels.addHotel,
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotels"],
    }),

    deleteHotel: builder.mutation({
      query: (id) => ({
        url: endPoint.hotels.deleteHotel(id),
        method: "DELETE",
      }),
      invalidatesTags: ["hotels", "rooms"],
    }),

    editHotels: builder.mutation({
      query: ({ id, data }) => ({
        url: endPoint.hotels.editHotel(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ["hotels", { type: "hotels", id }, "hotelDetail"],
    }),
    deleteHotelImage: builder.mutation({
      query: ({ hotelId, imageId }) => ({
        url: endPoint.hotels.deleteHotelImage(hotelId, imageId),
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["hotels"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useGetHotelDetailQuery,
  useAddHotelMutation,
  useDeleteHotelMutation,
  useEditHotelsMutation,
  useDeleteHotelImageMutation,
} = hotelApi;
