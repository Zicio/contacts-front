import { IUser } from "../../models/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contacts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/",
  }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    login: build.query<string, IUser>({
      query: (user: IUser) => ({
        url: "authorization",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLazyLoginQuery } = contactsApi;
