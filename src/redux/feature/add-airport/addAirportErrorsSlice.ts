import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AirportErrors {
  [key: string]: string;
}

interface AddAirportErrorsState {
  errors: AirportErrors;
}

const initialState: AddAirportErrorsState = {
  errors: {},
};

const addAirportErrorsSlice = createSlice({
  name: "addAirportErrors",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ field: string; error: string }>) {
      state.errors[action.payload.field] = action.payload.error;
    },
    clearError(state, action: PayloadAction<{ field: string }>) {
      delete state.errors[action.payload.field];
    },
    clearAllErrors(state) {
      state.errors = {};
    },
  },
});

export const { setError, clearError, clearAllErrors } =
  addAirportErrorsSlice.actions;
export default addAirportErrorsSlice.reducer;
