import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MealErrors {
  includedWithBasePrice?: string;
  title?: string;
  details?: string;
  pricePerPax?: string;
  days?: string;
}

interface MealErrorState {
  mealErrors: MealErrors[];
}

const initialState: MealErrorState = {
  mealErrors: [{}],
};

const hajjUploadMealErrorsSlice = createSlice({
  name: "hajjUploadMealErrors",
  initialState,
  reducers: {
    setMealError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof MealErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.mealErrors[index]) {
        state.mealErrors[index] = {};
      }
      state.mealErrors[index][field] = error;
    },
    clearMealError(
      state,
      action: PayloadAction<{ index: number; field: keyof MealErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.mealErrors[index]) {
        delete state.mealErrors[index][field];
      }
    },
  },
});

export const { setMealError, clearMealError } =
  hajjUploadMealErrorsSlice.actions;
export default hajjUploadMealErrorsSlice.reducer;
