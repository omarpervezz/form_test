import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogSettingsState {
  showDate: boolean;
  dateType: "" | "";
  showAuthor: boolean;
  selectedAuthor: string;
  showRecents: boolean;
  showCategories: boolean;
}

const initialState: BlogSettingsState = {
  showDate: false,
  dateType: "",
  showAuthor: false,
  selectedAuthor: "",
  showRecents: false,
  showCategories: false,
};

const blogSettingsSlice = createSlice({
  name: "blogSettings",
  initialState,
  reducers: {
    updateBlogSettingsField: (
      state,
      action: PayloadAction<{ field: keyof BlogSettingsState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateBlogSettingsField } = blogSettingsSlice.actions;

export default blogSettingsSlice.reducer;
