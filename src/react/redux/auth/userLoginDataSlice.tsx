import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
// Redux 스토어의 루트 상태를 정의

// setUserLoginDataSlice 슬라이스의 상태를 정의
export interface UserLoginDataState {
  isAuthenticated: boolean;
  // 다른 상태 속성들
}

export interface RootState {
  setUserLoginDataSlice: UserLoginDataState;
  // 다른 슬라이스들
}

const initialState = false;

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    setUserLoginDataSlice: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export let { setUserLoginDataSlice } = userLoginDataSlice.actions;
