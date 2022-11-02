import { createSlice } from "@reduxjs/toolkit";
import { refreshJWTSliceState } from "../models/models";

const interval: number = 2400000; // Интервал отправки запроса на обновления токенов доступа (чуть меньше времени жизни accessToken)

const refreshJWTSlice = createSlice({
  name: "refreshJWT",
  initialState: interval as refreshJWTSliceState,
  reducers: {
    deactivateRefresh(state) {
      state = null;
      return state;
    },
    activateRefresh(state) {
      state = interval;
      return state;
    },
  },
});

export default refreshJWTSlice.reducer;
export const { activateRefresh, deactivateRefresh } = refreshJWTSlice.actions;
