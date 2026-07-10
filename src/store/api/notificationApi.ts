import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: endPoint.notifications.getNotifications,
        credentials: "include",
      }),
      providesTags: ["notifications"],
    }),

    readNotification: builder.mutation({
      query: (id) => ({
        url: endPoint.notifications.readNotification(id),
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    readAllNotification: builder.mutation({
      query: () => ({
        url: endPoint.notifications.readAllNotifications,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    getNotificationCount: builder.query<any, void>({
      query: () => ({
        url: endPoint.notifications.getNotificationCount,
        credentials: "include",
      }),
      providesTags: ["notifications"],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: endPoint.notifications.deleteNotification(id),
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useGetNotificationCountQuery,
  useReadNotificationMutation,
  useReadAllNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
