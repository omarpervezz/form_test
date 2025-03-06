import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogSettingsErrorsState {
  [key: string]: string;
}

const initialState: BlogSettingsErrorsState = {};

const blogSettingsErrorsSlice = createSlice({
  name: "blogSettingsErrors",
  initialState,
  reducers: {
    setBlogSettingsError: (
      state,
      action: PayloadAction<{ field: string; error: string }>
    ) => {
      state[action.payload.field] = action.payload.error;
    },
    clearBlogSettingsError: (
      state,
      action: PayloadAction<{ field: string }>
    ) => {
      delete state[action.payload.field];
    },
    setBlogSettingsErrors: (
      state,
      action: PayloadAction<BlogSettingsErrorsState>
    ) => {
      return action.payload;
    },
  },
});

export const {
  setBlogSettingsError,
  clearBlogSettingsError,
  setBlogSettingsErrors,
} = blogSettingsErrorsSlice.actions;

export default blogSettingsErrorsSlice.reducer;
