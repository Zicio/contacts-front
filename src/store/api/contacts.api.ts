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
    authorization: build.query<StatusCode, IUser>({
      query: (user) => ({
        url: "authorization",
        method: "POST",
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
    getContacts: build.query<IContact[], string | undefined>({
      query: (token) => ({
        url: "contacts",
        method: "GET",
        headers: { authorization: token ? token : "" },
      }),
    }),
  }),
});

export const { useLazyAuthorizationQuery, useGetContactsQuery } = contactsApi;
