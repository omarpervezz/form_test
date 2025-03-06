import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryErrors {
  countryName?: string;
  currency?: string;
  issd?: string;
  language?: string;
}

interface CountryErrorState {
  countryErrors: CountryErrors;
}

const initialState: CountryErrorState = {
  countryErrors: {},
};

const addCountryErrorsSlice = createSlice({
  name: "addCountryErrors",
  initialState,
  reducers: {
    setCountryError(
      state,
      action: PayloadAction<{
        field: keyof CountryErrors;
        error: string;
      }>
    ) {
      const { field, error } = action.payload;
      state.countryErrors[field] = error;
    },
    clearCountryError(
      state,
      action: PayloadAction<{ field: keyof CountryErrors }>
    ) {
      const { field } = action.payload;
      delete state.countryErrors[field];
    },
  },
});

export const { setCountryError, clearCountryError } =
  addCountryErrorsSlice.actions;
export default addCountryErrorsSlice.reducer;
