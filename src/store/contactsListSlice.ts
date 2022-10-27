import { IContact } from "./../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contactsListSlice = createSlice({
  name: "contacts",
  initialState: [] as IContact[],
  reducers: {
    setContacts(state, action: PayloadAction<IContact[]>) {
      state = action.payload;
      return state;
    },
  },
});

export default contactsListSlice.reducer;
export const { setContacts } = contactsListSlice.actions;
