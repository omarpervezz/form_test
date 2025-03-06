import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MealType {
  includedWithBasePrice: boolean;
  title: string;
  foodType: string;
  details: string;
  days: number[];
  pricePerPax: string | number;
}

const initialState: MealType[] = [
  {
    includedWithBasePrice: false,
    title: "",
    foodType: "",
    details: "",
    days: [],
    pricePerPax: "",
  },
];

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal: (state) => {
      state.push({
        includedWithBasePrice: false,
        title: "",
        foodType: "",
        details: "",
        days: [],
        pricePerPax: "",
      });
    },
    updateMealField: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof MealType;
        value: string | boolean | number;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as MealType[typeof field]) = value;
    },
    updateMealOption: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof MealType;
        value: string | boolean | number;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as MealType[typeof field]) = value;
    },
    toggleMealDay: (
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) => {
      const { index, day } = action.payload;
      const meal = state[index];
      meal.days = meal.days.includes(day)
        ? meal.days.filter((d) => d !== day)
        : [...meal.days, day];
    },
  },
});

export const { addMeal, updateMealField, updateMealOption, toggleMealDay } =
  mealsSlice.actions;
export default mealsSlice.reducer;
