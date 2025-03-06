import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressErrors {
  country?: string;
  city?: string;
  state?: string;
  addressLine1?: string;
  addressLine2?: string;
  postCode?: string;
}

interface AddressErrorState {
  addressErrors: AddressErrors[];
}

const initialState: AddressErrorState = {
  addressErrors: [{}],
};

const addressErrorSlice = createSlice({
  name: "addressErrors",
  initialState,
  reducers: {
    setAddressError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof AddressErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.addressErrors[index]) {
        state.addressErrors[index] = {};
      }
      state.addressErrors[index][field] = error;
    },
    clearAddressError(
      state,
      action: PayloadAction<{ index: number; field: keyof AddressErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.addressErrors[index]) {
        delete state.addressErrors[index][field];
      }
    },
  },
});

export const { setAddressError, clearAddressError } = addressErrorSlice.actions;
export default addressErrorSlice.reducer;
