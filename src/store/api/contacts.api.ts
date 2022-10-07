import { CustomError, IContact, IUser } from "../../models/models";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import StatusCode from "status-code-enum";

export const contactsApi = createApi({
  reducerPath: "contacts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    authorization: build.query<string, IUser>({
      query: (user) => ({
        url: "authorization",
        method: "POST",
        credentials: "include",
        body: user,
      }),
    }),
    // authorization: build.query<string, IUser>({
    //   query: (user) => ({
    //     url: "authorization",
    //     method: "POST",
    //     body: user,
    //   }),
    // }),
    getContacts: build.query<IContact[], void>({
      query: () => ({
        url: "contacts",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyAuthorizationQuery, useGetContactsQuery } = contactsApi;
