import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogArticleErrorsState {
  [key: string]: string;
}

const initialState: BlogArticleErrorsState = {};

const blogArticleErrorsSlice = createSlice({
  name: "blogArticleErrors",
  initialState,
  reducers: {
    setBlogArticleError: (
      state,
      action: PayloadAction<{ field: string; error: string }>
    ) => {
      state[action.payload.field] = action.payload.error;
    },
    clearBlogArticleError: (
      state,
      action: PayloadAction<{ field: string }>
    ) => {
      delete state[action.payload.field];
    },
    setBlogArticleErrors: (
      state,
      action: PayloadAction<BlogArticleErrorsState>
    ) => {
      return action.payload;
    },
  },
});

export const {
  setBlogArticleError,
  clearBlogArticleError,
  setBlogArticleErrors,
} = blogArticleErrorsSlice.actions;

export default blogArticleErrorsSlice.reducer;
