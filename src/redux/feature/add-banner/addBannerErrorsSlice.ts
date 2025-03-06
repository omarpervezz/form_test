import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BannerErrors {
  bannerTitle?: string;
  bannerDescription?: string;
  media?: string;
  bannerFor?: string;
  bannerPosition?: string;
}

interface BannerErrorState {
  bannerErrors: BannerErrors;
}

const initialState: BannerErrorState = {
  bannerErrors: {},
};

const addBannerErrorsSlice = createSlice({
  name: "addBannerErrors",
  initialState,
  reducers: {
    setBannerError(
      state,
      action: PayloadAction<{
        field: keyof BannerErrors;
        error: string;
      }>
    ) {
      const { field, error } = action.payload;
      state.bannerErrors[field] = error;
    },
    clearBannerError(
      state,
      action: PayloadAction<{ field: keyof BannerErrors }>
    ) {
      const { field } = action.payload;
      delete state.bannerErrors[field];
    },
  },
});

export const { setBannerError, clearBannerError } =
  addBannerErrorsSlice.actions;
export default addBannerErrorsSlice.reducer;
