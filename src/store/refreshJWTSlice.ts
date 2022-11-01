import { createSlice } from "@reduxjs/toolkit";

const refreshJWTSlice = createSlice({
  name: "refreshJWT",
  initialState: true,
  reducers: {
    abort(state) {
      state = false;
    },
  },
});

export default refreshJWTSlice.reducer;
export const { abort } = refreshJWTSlice.actions;
