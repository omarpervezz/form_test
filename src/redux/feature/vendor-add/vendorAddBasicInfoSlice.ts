import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface vendorAddBasicInfoTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialState: vendorAddBasicInfoTypes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const vendorAddBasicInfoSlice = createSlice({
  name: "vendorAddState",
  initialState,
  reducers: {
    setBasicInfoDetails: (
      state,
      action: PayloadAction<Partial<vendorAddBasicInfoTypes>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetVendorAddBasicInfoDetails: () => initialState,
  },
});

export const { setBasicInfoDetails, resetVendorAddBasicInfoDetails } =
  vendorAddBasicInfoSlice.actions;

export default vendorAddBasicInfoSlice.reducer;
