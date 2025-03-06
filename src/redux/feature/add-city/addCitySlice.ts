import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityType {
  cityName: string;
  country: string;
}

interface CityState {
  city: CityType;
}

const initialState: CityState = {
  city: {
    cityName: "",
    country: "",
  },
};

const addCitySlice = createSlice({
  name: "addCity",
  initialState,
  reducers: {
    updateCityField(
      state,
      action: PayloadAction<{
        field: keyof CityType;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.city[field] = value;
    },
  },
});

export const { updateCityField } = addCitySlice.actions;
export default addCitySlice.reducer;
