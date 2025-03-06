import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItineraryDay {
  title: string;
  activity: string;
}

interface PackageItineraryState {
  days: ItineraryDay[];
}

const initialState: PackageItineraryState = {
  days: [{ title: "", activity: "" }],
};

const packageUploadItinerarySlice = createSlice({
  name: "packageUploadItinerary",
  initialState,
  reducers: {
    setPackageItinerary: (state, action: PayloadAction<ItineraryDay[]>) => {
      state.days = action.payload;
    },
    addDay: (state) => {
      state.days.push({ title: "", activity: "" });
    },
    updateDay: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ItineraryDay;
        value: string;
      }>
    ) => {
      state.days[action.payload.index][action.payload.field] =
        action.payload.value;
    },
    resetPackageItinerary: () => initialState,
  },
});

export const { setPackageItinerary, addDay, updateDay, resetPackageItinerary } =
  packageUploadItinerarySlice.actions;
export default packageUploadItinerarySlice.reducer;
