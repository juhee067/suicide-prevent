import { configureStore } from "@reduxjs/toolkit";
import { attachedFileListSlice } from "./reducer/attachedFileList";

export default configureStore({
  reducer: {
    attachedFileListSlice: attachedFileListSlice.reducer,
  },
});
