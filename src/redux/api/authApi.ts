import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { AppPaths } from "../../variables/AppPaths";
import { LoginValues } from "../../components/LoginForm/LoginForm";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AppPaths.API_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<void, LoginValues>({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: { loginCredentials: data },
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            userApi.endpoints.getCurrentUser.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
