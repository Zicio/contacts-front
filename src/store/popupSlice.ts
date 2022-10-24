import { IPopupState } from "./../models/models";
import { createSlice, Slice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    active: false,
  } as IPopupState,
  reducers: {
    activate(state: IPopupState) {
      state.active = true;
    },
    deactivate(state: IPopupState) {
      state.active = false;
    },
  },
});

export default popupSlice.reducer;
export const { activate, deactivate } = popupSlice.actions;
