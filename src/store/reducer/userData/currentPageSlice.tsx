import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPageSlice: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { setCurrentPageSlice } = currentPageSlice.actions;
