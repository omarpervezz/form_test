import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuideType } from "./packageUploadGuideSlice";

interface GuideErrorsState {
  errors: Record<number, Partial<Record<keyof GuideType, string>>>;
}

const initialState: GuideErrorsState = {
  errors: {},
};

const packageUploadGuideErrorsSlice = createSlice({
  name: "packageUploadGuideErrors",
  initialState,
  reducers: {
    setGuideError: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof GuideType;
        error: string;
      }>
    ) => {
      const { index, field, error } = action.payload;
      if (!state.errors[index]) state.errors[index] = {};
      state.errors[index][field] = error;
    },
    clearGuideError: (
      state,
      action: PayloadAction<{ index: number; field: keyof GuideType }>
    ) => {
      const { index, field } = action.payload;
      if (state.errors[index]) {
        delete state.errors[index][field];
      }
    },
    clearAllGuideErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setGuideError, clearGuideError, clearAllGuideErrors } =
  packageUploadGuideErrorsSlice.actions;
export default packageUploadGuideErrorsSlice.reducer;
