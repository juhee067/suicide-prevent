import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  userEmail: "",
  authToken: "",
};

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    setUserLoginDataSlice: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export let { setUserLoginDataSlice } = userLoginDataSlice.actions;
