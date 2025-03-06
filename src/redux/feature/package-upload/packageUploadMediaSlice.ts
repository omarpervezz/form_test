import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaState {
  mainImage: File | null;
  galleryImages: File[];
}

const initialState: MediaState = {
  mainImage: null,
  galleryImages: [],
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    updateMediaField: (
      state,
      action: PayloadAction<{ field: keyof MediaState; value: File | File[] }>
    ) => {
      const { field, value } = action.payload;
      if (field === "galleryImages" && Array.isArray(value)) {
        state.galleryImages = value;
      } else if (field === "mainImage" && value instanceof File) {
        state.mainImage = value;
      }
    },
    removeMedia: (state, action: PayloadAction<{ index: number }>) => {
      state.galleryImages.splice(action.payload.index, 1);
    },
    resetMedia: () => initialState,
  },
});

export const { updateMediaField, removeMedia, resetMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
