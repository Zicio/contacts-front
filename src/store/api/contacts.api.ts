import { CustomError, IContact, IUser } from "../../models/models";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contacts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  refetchOnReconnect: true,
  tagTypes: ["Contacts"],
  endpoints: (build) => ({
    authorization: build.mutation<string, IUser>({
      query: (user) => ({
        url: "authorization",
        method: "POST",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: ["Contacts"],
    }),
    getContacts: build.query<IContact[], void>({
      query: () => ({
        url: "contacts",
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) => ["Contacts"],
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: "logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    deleteContact: build.mutation<string, string>({
      query: (id) => ({
        url: "contact",
        method: "DELETE",
        credentials: "include",
        body: { id: id },
      }),
      invalidatesTags: ["Contacts"],
    }),
    createNewContact: build.mutation<string, IContact>({
      query: (contact) => ({
        url: "contact",
        method: "POST",
        credentials: "include",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useAuthorizationMutation,
  useGetContactsQuery,
  useLogoutMutation,
  useDeleteContactMutation,
  useCreateNewContactMutation,
} = contactsApi;
