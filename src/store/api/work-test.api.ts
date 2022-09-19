import { IUser } from "./../../models/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workTestApi = createApi({
  reducerPath: "workTest/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/",
  }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    login: build.mutation<any, IUser>({
      query: (user: IUser) => ({
        url: "contacts",
      }),
    }),
  }),
});
