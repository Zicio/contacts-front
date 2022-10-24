import { IContact, IPopupState } from "./../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    active: false,
  } as IPopupState,
  reducers: {
    activate(state: IPopupState, action?: PayloadAction<IContact | undefined>) {
      state.active = true;
      if (action) {
        state.data = action.payload;
      }
    },
    deactivate(state: IPopupState) {
      state.active = false;
    },
  },
});

export default popupSlice.reducer;
export const { activate, deactivate } = popupSlice.actions;
