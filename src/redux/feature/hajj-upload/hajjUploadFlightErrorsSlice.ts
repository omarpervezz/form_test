import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightErrors {
  includedWithBasePrice?: string;
  flightFrom?: string;
  flightTo?: string;
  flightType?: string;
  transitType?: string;
  airlinesName?: string;
  pricePerPax?: string;
  title?: string;
  carrierName?: string;
  days?: string;
}

interface FlightErrorState {
  flightErrors: FlightErrors[];
}

const initialState: FlightErrorState = {
  flightErrors: [{}],
};

const hajjUploadFlightErrorsSlice = createSlice({
  name: "hajjUploadFlightErrors",
  initialState,
  reducers: {
    setFlightError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof FlightErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.flightErrors[index]) {
        state.flightErrors[index] = {};
      }
      state.flightErrors[index][field] = error;
    },
    clearFlightError(
      state,
      action: PayloadAction<{ index: number; field: keyof FlightErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.flightErrors[index]) {
        delete state.flightErrors[index][field];
      }
    },
  },
});

export const { setFlightError, clearFlightError } =
  hajjUploadFlightErrorsSlice.actions;
export default hajjUploadFlightErrorsSlice.reducer;
