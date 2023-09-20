import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const userLoginAccessTokenSlice = createSlice({
  name: "userLoginAccessToken",
  initialState,
  reducers: {
    setUserLoginAccessTokenSlice: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { setUserLoginAccessTokenSlice } = userLoginAccessTokenSlice.actions;
