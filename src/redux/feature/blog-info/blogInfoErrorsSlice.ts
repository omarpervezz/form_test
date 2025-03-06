import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogInfoErrorsState {
  [key: string]: string;
}

const initialState: BlogInfoErrorsState = {};

const blogInfoErrorsSlice = createSlice({
  name: "blogInfoErrors",
  initialState,
  reducers: {
    setBlogInfoError: (
      state,
      action: PayloadAction<{ field: string; error: string }>
    ) => {
      state[action.payload.field] = action.payload.error;
    },
    clearBlogInfoError: (state, action: PayloadAction<{ field: string }>) => {
      delete state[action.payload.field];
    },
    setBlogInfoErrors: (state, action: PayloadAction<BlogInfoErrorsState>) => {
      return action.payload;
    },
  },
});

export const { setBlogInfoError, clearBlogInfoError, setBlogInfoErrors } =
  blogInfoErrorsSlice.actions;

export default blogInfoErrorsSlice.reducer;
