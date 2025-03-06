import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransportType } from "./packageUploadTransportSlice";

interface TransportErrorsState {
  errors: Record<number, Partial<Record<keyof TransportType, string>>>;
}

const initialState: TransportErrorsState = {
  errors: {},
};

const packageUploadTransportErrorsSlice = createSlice({
  name: "packageUploadTransportErrors",
  initialState,
  reducers: {
    setTransportError: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TransportType;
        error: string;
      }>
    ) => {
      const { index, field, error } = action.payload;
      if (!state.errors[index]) state.errors[index] = {};
      state.errors[index][field] = error;
    },
    clearTransportError: (
      state,
      action: PayloadAction<{ index: number; field: keyof TransportType }>
    ) => {
      const { index, field } = action.payload;
      if (state.errors[index]) {
        delete state.errors[index][field];
      }
    },
    clearAllTransportErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  setTransportError,
  clearTransportError,
  clearAllTransportErrors,
} = packageUploadTransportErrorsSlice.actions;
export default packageUploadTransportErrorsSlice.reducer;
