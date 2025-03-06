import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HajjUploadDetails {
  packageTitle: string;
  description: string;
  basePrice: string;
  acceptPartialPayment: string;
  registrationPartialPayment: string;
}

const initialState: HajjUploadDetails = {
  packageTitle: "",
  description: "",
  basePrice: "",
  acceptPartialPayment: "",
  registrationPartialPayment: "",
};

const hajjUploadDetailsSlice = createSlice({
  name: "hajjUploadDetails",
  initialState,
  reducers: {
    updateBasicInfoField(
      state,
      action: PayloadAction<{ field: keyof HajjUploadDetails; value: string }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateBasicInfoField } = hajjUploadDetailsSlice.actions;
export default hajjUploadDetailsSlice.reducer;
