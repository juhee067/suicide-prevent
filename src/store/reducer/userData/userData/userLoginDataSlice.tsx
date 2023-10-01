import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface UserLoginDataState {
  uid: string;
  userEmail: string;
  nickName: string;
  authToken: any;
  refreshToken: string;
}

const initialState: UserLoginDataState = {
  uid: "",
  userEmail: "",
  nickName: "",
  authToken: "",
  refreshToken: "",
};

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    setUserLoginDataSlice: (state, action: PayloadAction<UserLoginDataState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUserLoginDataSlice } = userLoginDataSlice.actions;
