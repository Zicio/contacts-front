import { IContact } from "./../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contactsListSlice = createSlice({
  name: "contacts",
  initialState: [] as IContact[],
  reducers: {
    addContacts(state, action: PayloadAction<IContact[]>) {
      state = action.payload;
    },
  },
});

export default contactsListSlice.reducer;
export const { addContacts } = contactsListSlice.actions;
