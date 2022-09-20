import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppPaths } from "../../variables/AppPaths";

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: AppPaths.API_URL,
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts",
    }),
  }),
});

export const { useGetContactsQuery } = contactsAPI;
