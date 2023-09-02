import { configureStore } from "@reduxjs/toolkit";

import { userLoginAccessTokenSlice } from "./reducer/userData/userData/userLoginAccessTokenSlice";
import { userLoginDataSlice } from "./reducer/userData/userData/userLoginDataSlice";

export default configureStore({
  reducer: {
    userLoginDataSlice: userLoginDataSlice.reducer,
    userLoginAccessTokenSlice: userLoginAccessTokenSlice.reducer,
  },
});
