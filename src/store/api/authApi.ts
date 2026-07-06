import { baseApi } from "./baseApi";
import { endPoint } from "./endPoints/endPoints";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //login
    login: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.login,
        method: "POST",
        body: data,
      }),
    }),
    //register
    register: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.register,
        method: "POST",
        body: data,
      }),
    }),

    //email verification
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.emailVerify,
        method: "POST",
        body: data,
      }),
    }),

    //forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.forgotPassword,
        method: "POST",
        body: data,
      }),
    }),

    //reset Password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.resetPassword,
        method: "PATCH",
        body: data,
      }),
    }),

    //otp verification
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: endPoint.auth.verifyOtp,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = authApi;
