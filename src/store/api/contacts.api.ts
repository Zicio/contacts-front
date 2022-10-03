import { CustomError, IUser } from "../../models/models";
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
  endpoints: (build) => ({
    authorization: build.query<string, IUser>({
      query: (user: IUser) => ({
        url: "authorization",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLazyAuthorizationQuery } = contactsApi;
