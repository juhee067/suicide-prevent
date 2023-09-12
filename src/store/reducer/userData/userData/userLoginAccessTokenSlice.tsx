import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserLoginAccessTokenState {
  authToken: any;
}

const initialState: UserLoginAccessTokenState = {
  authToken: "",
};

export const userLoginAccessTokenSlice = createSlice({
  name: "userLoginAccessToken",
  initialState,
  reducers: {
    setUserLoginAccessTokenSlice: (state, action: PayloadAction<any>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setUserLoginAccessTokenSlice } = userLoginAccessTokenSlice.actions;
