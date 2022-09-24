import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppPaths } from "../../variables/AppPaths";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  small: string;
  email: string;
  github: string;
  telegram: string;
  info: string;
}

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: AppPaths.API_URL,
  }),
  tagTypes: ["Contact"],

  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      providesTags: ["Contact"],
      query: () => "contacts",
    }),

    createContact: builder.mutation<void, Omit<Contact, "id" | "photo" | "small">>({
      invalidatesTags: ["Contact"],
      query(contact) {
        return {
          url: "contacts",
          method: "POST",
          body: contact,
        };
      },
    }),

    updateContact: builder.mutation<void, Omit<Contact, "photo" | "small">>({
      invalidatesTags: ["Contact"],
      query(contact) {
        return {
          url: "contacts",
          method: "PUT",
          body: contact,
        };
      },
    }),

    removeContact: builder.mutation<void, number>({
      invalidatesTags: ["Contact"],
      query(id) {
        return {
          url: "contacts/" + id,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useRemoveContactMutation,
} = contactsAPI;
