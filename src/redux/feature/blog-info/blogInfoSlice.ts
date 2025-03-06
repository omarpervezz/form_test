/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogInfoState {
  blogTitle: string;
  category: string;
  subCategory: string;
  metaTitle: string;
  shortDescription: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  thumbnailImage: File | null;
  imageAlt: string;
}

const initialState: BlogInfoState = {
  blogTitle: "",
  category: "",
  subCategory: "",
  metaTitle: "",
  shortDescription: "",
  metaDescription: "",
  primaryKeyword: "",
  secondaryKeywords: [],
  thumbnailImage: null,
  imageAlt: "",
};

const blogInfoSlice = createSlice({
  name: "blogInfo",
  initialState,
  reducers: {
    updateBlogInfoField: (
      state,
      action: PayloadAction<{ field: keyof BlogInfoState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    addSecondaryKeyword: (state, action: PayloadAction<string>) => {
      state.secondaryKeywords.push(action.payload);
    },
    removeSecondaryKeyword: (state, action: PayloadAction<number>) => {
      state.secondaryKeywords.splice(action.payload, 1);
    },
    removeThumbnailImage: (state) => {
      state.thumbnailImage = null;
    },
  },
});

export const {
  updateBlogInfoField,
  addSecondaryKeyword,
  removeSecondaryKeyword,
  removeThumbnailImage,
} = blogInfoSlice.actions;

export default blogInfoSlice.reducer;
