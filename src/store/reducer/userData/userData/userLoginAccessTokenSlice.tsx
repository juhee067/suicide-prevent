import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

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

export let { setUserLoginAccessTokenSlice } = userLoginAccessTokenSlice.actions;
