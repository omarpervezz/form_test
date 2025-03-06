import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactInfoErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface ContactInfoErrorState {
  contactInfoErrors: ContactInfoErrors[];
}

const initialState: ContactInfoErrorState = {
  contactInfoErrors: [{}],
};

const contactInfoErrorSlice = createSlice({
  name: "contactInfoErrors",
  initialState,
  reducers: {
    setContactInfoError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ContactInfoErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.contactInfoErrors[index]) {
        state.contactInfoErrors[index] = {};
      }
      state.contactInfoErrors[index][field] = error;
    },
    clearContactInfoError(
      state,
      action: PayloadAction<{ index: number; field: keyof ContactInfoErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.contactInfoErrors[index]) {
        delete state.contactInfoErrors[index][field];
      }
    },
  },
});

export const { setContactInfoError, clearContactInfoError } =
  contactInfoErrorSlice.actions;
export default contactInfoErrorSlice.reducer;
