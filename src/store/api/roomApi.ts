import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRooms: builder.query<any, void>({
      query: () => ({
        url: endPoint.hotels.getHotelRooms,
        credentials: "include",
      }),
      providesTags: ["rooms"],
    }),

    getAvailableHotelRooms: builder.query({
      query: ({ destination, hotelId, checkInDate, checkOutDate, guests }) => ({
        url: endPoint.hotels.getAvailableRooms,
        credentials: "include",
        params: {
          ...(hotelId != null ? { HotelId: hotelId } : {}),
          ...(destination ? { Destination: destination } : {}),
          CheckInDate: checkInDate,
          CheckOutDate: checkOutDate,
          ...(guests != null ? { Guests: guests } : {}),
        },
      }),
      providesTags: ["rooms"],
    }),

    getRoomsByHotelId: builder.query<any, number>({
      query: (hotelId) => ({
        url: endPoint.hotels.getRoomsByHotelId(hotelId),
        credentials: "include",
      }),
      providesTags: ["rooms"],
    }),

    getRoomDetail: builder.query({
      query: (id) => ({
        url: endPoint.hotels.getRoomDetail(id),
        credentials: "include",
      }),
      providesTags: (_result, _error, id) => [{ type: "rooms", id }],
    }),

    addHotelRooms: builder.mutation({
      query: (data) => ({
        url: endPoint.hotels.addHotelRoom,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rooms"],
    }),

    updateHotelRooms: builder.mutation({
      query: ({ id, data }) => ({
        url: endPoint.hotels.updateHotelRoom(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["rooms"],
    }),

    deleteHotelRoom: builder.mutation({
      query: (id) => ({
        url: endPoint.hotels.deleteHotelRoom(id),
        method: "DELETE",
      }),
      invalidatesTags: ["rooms"],
    }),

  

    deleteRoomImage: builder.mutation({
      query: ({ roomId, imageId }) => ({
        url: endPoint.hotels.deleteRoomImage(roomId, imageId),
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {useGetHotelRoomsQuery,useGetAvailableHotelRoomsQuery,useGetRoomsByHotelIdQuery,useGetRoomDetailQuery,useAddHotelRoomsMutation,useUpdateHotelRoomsMutation,useDeleteHotelRoomMutation,useDeleteRoomImageMutation} = roomApi;
