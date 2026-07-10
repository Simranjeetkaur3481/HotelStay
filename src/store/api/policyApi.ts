import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const policyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolicies: builder.query({
      query: () => ({
        url: endPoint.hotels.getPolicies,
        credentials: "include",
      }),
      providesTags: ["policies"],
    }),

    addPolicy: builder.mutation({
      query: ({ hotelId, data }) => ({
        url: endPoint.hotels.addPolicies(hotelId),
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["policies"],
    }),

    updatePolicy: builder.mutation({
      query: ({ hotelId, policyId, data }) => ({
        url: endPoint.hotels.updatePolicies(hotelId, policyId),
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["policies"],
    }),

    deletePolicy: builder.mutation({
      query: ({ hotelId, policyId }) => ({
        url: endPoint.hotels.deletePolicy(hotelId, policyId),
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["policies"],
    }),
  }),
});

export const { useGetPoliciesQuery, useAddPolicyMutation, useUpdatePolicyMutation, useDeletePolicyMutation } =
  policyApi;
