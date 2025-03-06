import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BannerType {
  bannerTitle: string;
  bannerDescription: string;
  media: File | null;
  bannerFor: string;
  bannerPosition: string;
}

interface BannerState {
  banner: BannerType;
}

const initialState: BannerState = {
  banner: {
    bannerTitle: "",
    bannerDescription: "",
    media: null,
    bannerFor: "",
    bannerPosition: "",
  },
};

const addBannerSlice = createSlice({
  name: "addBanner",
  initialState,
  reducers: {
    updateBannerField(
      state,
      action: PayloadAction<{
        field: keyof BannerType;
        value: string | File | null;
      }>
    ) {
      const { field, value } = action.payload;
      if (field === "media" && (value === null || value instanceof File)) {
        state.banner[field] = value as File | null;
      } else if (
        field === "bannerTitle" ||
        field === "bannerDescription" ||
        field === "bannerFor" ||
        field === "bannerPosition"
      ) {
        state.banner[field] = value as string;
      }
    },
    removeBannerMedia(state) {
      state.banner.media = null;
    },
  },
});

export const { updateBannerField, removeBannerMedia } = addBannerSlice.actions;
export default addBannerSlice.reducer;
