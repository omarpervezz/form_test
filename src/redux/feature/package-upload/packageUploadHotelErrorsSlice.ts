import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelType } from "./packageUploadHotelSlice";

interface HotelErrorsState {
  errors: Record<number, Partial<Record<keyof HotelType, string>>>;
}

const initialState: HotelErrorsState = {
  errors: {},
};

const packageUploadHotelErrorsSlice = createSlice({
  name: "packageUploadHotelErrors",
  initialState,
  reducers: {
    setHotelError: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof HotelType;
        error: string;
      }>
    ) => {
      const { index, field, error } = action.payload;
      if (!state.errors[index]) state.errors[index] = {};
      state.errors[index][field] = error;
    },
    clearHotelError: (
      state,
      action: PayloadAction<{ index: number; field: keyof HotelType }>
    ) => {
      const { index, field } = action.payload;
      if (state.errors[index]) {
        delete state.errors[index][field];
      }
    },
    clearAllHotelErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setHotelError, clearHotelError, clearAllHotelErrors } =
  packageUploadHotelErrorsSlice.actions;
export default packageUploadHotelErrorsSlice.reducer;
