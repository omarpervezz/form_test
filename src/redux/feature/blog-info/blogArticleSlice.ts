/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogArticleState {
  articleTitle: string;
  keywords: string[];
  contents: string;
  featureImage: File | null;
}

const initialState: BlogArticleState = {
  articleTitle: "",
  keywords: [],
  contents: "",
  featureImage: null,
};

const blogArticleSlice = createSlice({
  name: "blogArticle",
  initialState,
  reducers: {
    updateBlogArticleField: (
      state,
      action: PayloadAction<{ field: keyof BlogArticleState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      state.keywords.push(action.payload);
    },
    removeKeyword: (state, action: PayloadAction<number>) => {
      state.keywords.splice(action.payload, 1);
    },
    removeFeatureImage: (state) => {
      state.featureImage = null;
    },
  },
});

export const {
  updateBlogArticleField,
  addKeyword,
  removeKeyword,
  removeFeatureImage,
} = blogArticleSlice.actions;

export default blogArticleSlice.reducer;
