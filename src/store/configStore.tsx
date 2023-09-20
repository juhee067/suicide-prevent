import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { userLoginAccessTokenSlice } from "./reducer/userData/userData/userLoginAccessTokenSlice";
import { userLoginDataSlice } from "./reducer/userData/userData/userLoginDataSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const reducers = combineReducers({
  userLoginDataSlice: userLoginDataSlice.reducer,
  userLoginAccessTokenSlice: userLoginAccessTokenSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage, // localStorage에 저장
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
