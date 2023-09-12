import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  uid: "",
  userEmail: "",
  nickName: "",
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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export let { setUserLoginDataSlice } = userLoginDataSlice.actions;
