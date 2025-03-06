import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicInfoErrors {
  packageTitle?: string;
  description?: string;
  basePrice?: string;
  acceptPartialPayment?: string;
  registrationPartialPayment?: string;
}

interface BasicInfoErrorState {
  basicInfoErrors: BasicInfoErrors;
}

const initialState: BasicInfoErrorState = {
  basicInfoErrors: {},
};

const hajjUploadBasicInfoErrorsSlice = createSlice({
  name: "hajjUploadBasicInfoErrors",
  initialState,
  reducers: {
    setBasicInfoError(
      state,
      action: PayloadAction<{ field: keyof BasicInfoErrors; error: string }>
    ) {
      const { field, error } = action.payload;
      state.basicInfoErrors[field] = error;
    },
    clearBasicInfoError(state, action: PayloadAction<keyof BasicInfoErrors>) {
      const field = action.payload;
      delete state.basicInfoErrors[field];
    },
  },
});

export const { setBasicInfoError, clearBasicInfoError } =
  hajjUploadBasicInfoErrorsSlice.actions;
export default hajjUploadBasicInfoErrorsSlice.reducer;
