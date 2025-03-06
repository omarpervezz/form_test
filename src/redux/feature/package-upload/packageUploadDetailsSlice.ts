import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PackageDetailsState {
  packageTitle: string;
  days: number;
  nights: number;
  countries: string[];
  cities: string[];
  basePrice: string | number;
  discountPrice: string | number;
}

const initialState: PackageDetailsState = {
  packageTitle: "",
  days: 0,
  nights: 0,
  countries: [],
  cities: [],
  basePrice: "",
  discountPrice: "",
};

const packageUploadDetailsSlice = createSlice({
  name: "packageUploadDetails",
  initialState,
  reducers: {
    setPackageUploadDetails: (
      state,
      action: PayloadAction<Partial<PackageDetailsState>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetPackageUploadDetails: () => initialState,
  },
});

export const { setPackageUploadDetails, resetPackageUploadDetails } =
  packageUploadDetailsSlice.actions;
export default packageUploadDetailsSlice.reducer;
