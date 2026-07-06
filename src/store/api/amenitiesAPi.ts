import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const amenitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query({
      query: () => ({
        url: endPoint.hotels.getAmenities,
        credentials: "include",
      }),
      providesTags: ["amenities"],
    }),

    addAmenity: builder.mutation({
      query: (data) => ({
        url: endPoint.hotels.addAmenities,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["amenities"],
    }),

    addBulkAmenitiesInHotel: builder.mutation({
      query: ({ hotelId, data }) => ({
        url: endPoint.hotels.addBulkAmenitiesInHotel(hotelId),
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { hotelId }) => [
        "amenities",
        "hotels",
        { type: "hotels", id: hotelId },
        "hotelDetail",
      ],
    }),

    deleteHotelAmenity: builder.mutation({
      query: ({ hotelId, amenityId }) => ({
        url: endPoint.hotels.deleteHotelAmenity(hotelId, amenityId),
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (_result, _error, { hotelId }) => ["hotels", { type: "hotels", id: hotelId }, "hotelDetail"],
    }),

    deleteAmenities: builder.mutation({
      query: (id) => ({
        url: endPoint.hotels.deleteAmenities(id),
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["amenities"],
    }),

    updateAmenity: builder.mutation({
      query: ({ id, data }) => ({
        url: endPoint.hotels.updateAmenities(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["amenities"],
    }),
  }),
});

export const {useGetAmenitiesQuery,useAddAmenityMutation,useAddBulkAmenitiesInHotelMutation,useDeleteAmenitiesMutation,useUpdateAmenityMutation} = amenitiesApi;
