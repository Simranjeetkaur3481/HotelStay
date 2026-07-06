import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: endPoint.chat.sendMessage,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat"],
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
