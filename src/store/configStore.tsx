import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setUserLoginAccessToken } from "./reducer/userData/userData/userLoginAccessTokenSlice";
import { setUserLoginData } from "./reducer/userData/userData/userLoginDataSlice";

const reducers = combineReducers({
  userLoginData: setUserLoginData,
  userLoginAccessToken: setUserLoginAccessToken,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
