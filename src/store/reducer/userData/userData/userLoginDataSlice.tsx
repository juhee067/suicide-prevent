import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface UserLoginDataState {
  uid: string;
  userEmail: string;
  nickName: string;
  authToken: any;
}

const initialState: UserLoginDataState = {
  uid: "",
  userEmail: "",
  nickName: "",
  authToken: "",
};

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    setUserLoginData: (state, action: PayloadAction<UserLoginDataState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUserLoginData } = userLoginDataSlice.actions;

export default userLoginDataSlice.reducer;
