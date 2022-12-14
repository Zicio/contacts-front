import { contactsApi } from "./api/contacts.api";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import popupSlice from "./popupSlice";
import contactsListSlice from "./contactsListSlice";
import refreshJWTSlice from "./refreshJWTSlice";

export const store = configureStore({
  reducer: {
    popup: popupSlice,
    contacts: contactsListSlice,
    refreshJWT: refreshJWTSlice,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
