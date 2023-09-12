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
    setUserLoginAccessToken: (state, action: PayloadAction<any>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setUserLoginAccessToken } = userLoginAccessTokenSlice.actions;
export default userLoginAccessTokenSlice.reducer;
