import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryType {
  countryName: string;
  currency: string;
  issd: string;
  language: string[];
}

interface CountryState {
  country: CountryType;
}

const initialState: CountryState = {
  country: {
    countryName: "",
    currency: "",
    issd: "",
    language: [],
  },
};

const addCountrySlice = createSlice({
  name: "addCountry",
  initialState,
  reducers: {
    updateCountryField(
      state,
      action: PayloadAction<{
        field: keyof CountryType;
        value: string | string[];
      }>
    ) {
      const { field, value } = action.payload;
      if (field === "language" && Array.isArray(value)) {
        (state.country[field] as string[]) = value;
      } else if (typeof value === "string") {
        (state.country[field] as string) = value;
      }
    },
  },
});

export const { updateCountryField } = addCountrySlice.actions;
export default addCountrySlice.reducer;
