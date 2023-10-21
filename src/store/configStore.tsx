import { configureStore } from "@reduxjs/toolkit";
import { userLoginDataSlice } from "./reducer/userData/userData/userLoginDataSlice";

export default configureStore({
  reducer: {
    userLoginDataSlice: userLoginDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true, // 불변성 체크 활성화
      serializableCheck: false, // 직렬화 체크 비활성화
    }),
});
