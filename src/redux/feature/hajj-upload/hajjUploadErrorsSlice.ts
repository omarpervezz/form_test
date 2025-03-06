import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorsState {
  errors: { [key: string]: string };
}

const initialState: ErrorsState = {
  errors: {},
};

const hajjUploadErrorsSlice = createSlice({
  name: "hajjUploadErrors",
  initialState,
  reducers: {
    setErrors(state, action: PayloadAction<{ [key: string]: string }>) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.errors = {};
    },
  },
});

export const { setErrors, clearErrors } = hajjUploadErrorsSlice.actions;
export default hajjUploadErrorsSlice.reducer;
