import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MealType {
  includedWithBasePrice: boolean;
  title: string;
  details: string;
  pricePerPax: string;
  days: number[];
}

interface MealsState {
  meals: MealType[];
}

const initialState: MealsState = {
  meals: [
    {
      includedWithBasePrice: false,
      title: "",
      details: "",
      pricePerPax: "",
      days: [],
    },
  ],
};

const hajjUploadMealsSlice = createSlice({
  name: "hajjUploadMeals",
  initialState,
  reducers: {
    updateMealField(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof MealType;
        value: string | number | boolean;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.meals[index][field] = value;
    },
    addMeal(state) {
      state.meals.push({
        includedWithBasePrice: false,
        title: "",
        details: "",
        pricePerPax: "",
        days: [],
      });
    },
    removeMeal(state, action: PayloadAction<number>) {
      state.meals.splice(action.payload, 1);
    },
    toggleMealDay(
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) {
      const { index, day } = action.payload;
      const meal = state.meals[index];
      if (meal.days.includes(day)) {
        meal.days = meal.days.filter((d) => d !== day);
      } else {
        meal.days.push(day);
      }
    },
  },
});

export const { updateMealField, addMeal, removeMeal, toggleMealDay } =
  hajjUploadMealsSlice.actions;
export default hajjUploadMealsSlice.reducer;
