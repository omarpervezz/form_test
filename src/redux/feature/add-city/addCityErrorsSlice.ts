import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityErrors {
  cityName?: string;
  country?: string;
}

interface CityErrorState {
  cityErrors: CityErrors;
}

const initialState: CityErrorState = {
  cityErrors: {},
};

const addCityErrorsSlice = createSlice({
  name: "addCityErrors",
  initialState,
  reducers: {
    setCityError(
      state,
      action: PayloadAction<{
        field: keyof CityErrors;
        error: string;
      }>
    ) {
      const { field, error } = action.payload;
      state.cityErrors[field] = error;
    },
    clearCityError(state, action: PayloadAction<{ field: keyof CityErrors }>) {
      const { field } = action.payload;
      delete state.cityErrors[field];
    },
  },
});

export const { setCityError, clearCityError } = addCityErrorsSlice.actions;
export default addCityErrorsSlice.reducer;
