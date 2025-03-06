import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealType } from "./packageUploadMealsSlice";

interface MealErrorsState {
  errors: Record<number, Partial<Record<keyof MealType, string>>>;
}

const initialState: MealErrorsState = {
  errors: {},
};

const packageUploadMealsErrorsSlice = createSlice({
  name: "packageUploadMealsErrors",
  initialState,
  reducers: {
    setMealError: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof MealType;
        error: string;
      }>
    ) => {
      const { index, field, error } = action.payload;
      if (!state.errors[index]) state.errors[index] = {};
      state.errors[index][field] = error;
    },
    clearMealError: (
      state,
      action: PayloadAction<{ index: number; field: keyof MealType }>
    ) => {
      const { index, field } = action.payload;
      if (state.errors[index]) {
        delete state.errors[index][field];
      }
    },
    clearAllMealErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setMealError, clearMealError, clearAllMealErrors } =
  packageUploadMealsErrorsSlice.actions;
export default packageUploadMealsErrorsSlice.reducer;
