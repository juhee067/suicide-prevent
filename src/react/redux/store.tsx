import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 사용할 스토리지(로컬 스토리지)
import { combineReducers } from "redux";
import { userLoginDataSlice } from "./auth/userLoginDataSlice";

// 리듀서 및 루트 리듀서 설정
const rootReducer = combineReducers({
  setUserLoginDataSlice: userLoginDataSlice.reducer,
});

// Redux Persist 구성
const persistConfig = {
  key: "root", // 저장 키
  storage, // 사용할 스토리지
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
export const store = createStore(persistedReducer);

// Redux Persist 스토어 설정
export const persistor = persistStore(store);
