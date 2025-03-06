import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PackageUploadErrors {
  packageTitle?: string;
  basePrice?: string;
  discountPrice?: string;
  countries?: string;
  cities?: string;
  [key: string]: string | undefined;
  days?: string;
  nights?: string;
}

const initialState: PackageUploadErrors = {};

const packageUploadErrorsSlice = createSlice({
  name: "packageUploadErrors",
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<PackageUploadErrors>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setErrors } = packageUploadErrorsSlice.actions;
export default packageUploadErrorsSlice.reducer;
