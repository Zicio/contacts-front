import { createSlice } from "@reduxjs/toolkit";

const refreshJWTSlice = createSlice({
  name: "refreshJWT",
  initialState: true,
  reducers: {
    deactivateRefresh(state) {
      state = false;
      return state;
    },
    activateRefresh(state) {
      state = true;
      return state;
    },
  },
});

export default refreshJWTSlice.reducer;
export const { activateRefresh, deactivateRefresh } = refreshJWTSlice.actions;
