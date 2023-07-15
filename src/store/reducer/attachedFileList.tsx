import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: string[] = [];
export const attachedFileListSlice = createSlice({
  name: "attachedFileListSlice",
  initialState,
  reducers: {
    setAttachedFileList: (state: string[], action: PayloadAction<string[]>) => {
      state = action.payload;
      return state;
    },
    deleteAttachedFileArray: (state, action: PayloadAction<number>) => {
      const filteredFileList = [...state].filter((_, index) => index !== action.payload);
      return filteredFileList;
    },
  },
});

export let { setAttachedFileList, deleteAttachedFileArray } = attachedFileListSlice.actions;
