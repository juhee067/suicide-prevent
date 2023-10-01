import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = null;

export const userLoginAccessTokenSlice = createSlice({
  name: "userLoginAccessToken",
  initialState,
  reducers: {
    setUserLoginAccessTokenSlice: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    clearUserLoginAccessTokenSlice: (state) => {
      return null;
    },
  },
});

export const { setUserLoginAccessTokenSlice, clearUserLoginAccessTokenSlice } =
  userLoginAccessTokenSlice.actions;
