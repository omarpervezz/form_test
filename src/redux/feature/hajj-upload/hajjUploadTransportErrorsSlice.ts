import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransportErrors {
  includedWithBasePrice?: string;
  title?: string;
  detail?: string;
  from?: string;
  to?: string;
  vehicleType?: string;
  carryType?: string;
  pricePerPax?: string;
  days?: string;
}

interface TransportErrorState {
  transportErrors: TransportErrors[];
}

const initialState: TransportErrorState = {
  transportErrors: [{}],
};

const hajjUploadTransportErrorsSlice = createSlice({
  name: "hajjUploadTransportErrors",
  initialState,
  reducers: {
    setTransportError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TransportErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.transportErrors[index]) {
        state.transportErrors[index] = {};
      }
      state.transportErrors[index][field] = error;
    },
    clearTransportError(
      state,
      action: PayloadAction<{ index: number; field: keyof TransportErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.transportErrors[index]) {
        delete state.transportErrors[index][field];
      }
    },
  },
});

export const { setTransportError, clearTransportError } =
  hajjUploadTransportErrorsSlice.actions;
export default hajjUploadTransportErrorsSlice.reducer;
