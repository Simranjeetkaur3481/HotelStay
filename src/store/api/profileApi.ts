import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: endPoint.profile.getProfile,
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: endPoint.profile.updateProfile,
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Profile"],
    }),

    uploadAvatar: builder.mutation({
      async queryFn(file, { getState }) {
        try {
          const token = (getState() as unknown as { auth: { user: { token: string } } }).auth.user?.token;
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(`${API_BASE_URL}api${endPoint.profile.uploadAvatar}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
            credentials: "include",
          });

          const data = (await response.json()) as any;

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: data?.message ?? "Failed to upload avatar",
              },
            };
          }

          return { data };
        } catch {
          return { error: { status: "FETCH_ERROR", error: "Failed to upload avatar" } };
        }
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } = profileApi;
