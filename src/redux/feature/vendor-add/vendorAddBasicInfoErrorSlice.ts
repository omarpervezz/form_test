import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendorAddBasicInfoError {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const initialState: VendorAddBasicInfoError = {};

const vendorAddBasicInfoErrorSlice = createSlice({
  name: "vendorAddBasicInfoErrorSlice",
  initialState,
  reducers: {
    setVendorAddErrors: (
      state,
      action: PayloadAction<VendorAddBasicInfoError>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setVendorAddErrors } = vendorAddBasicInfoErrorSlice.actions;
export default vendorAddBasicInfoErrorSlice.reducer;
