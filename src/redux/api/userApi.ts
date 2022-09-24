import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, User } from "../reducers/userSlice";
import { AppPaths } from "../../variables/AppPaths";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AppPaths.API_URL,
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, null>({
      query: () => {
        return {
          url: "users/current",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: User } }) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});
