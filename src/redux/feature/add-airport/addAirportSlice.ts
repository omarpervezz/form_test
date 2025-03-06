/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AirportDetails {
  airportName: string;
  shortCode: string;
  country: string;
  city: string;
  airportType: string;
  description: string;
  mainImage: File | null;
  galleryImages: File[];
}

interface AddAirportState {
  details: AirportDetails;
}

const initialState: AddAirportState = {
  details: {
    airportName: "",
    shortCode: "",
    country: "",
    city: "",
    airportType: "",
    description: "",
    mainImage: null,
    galleryImages: [],
  },
};

const addAirportSlice = createSlice({
  name: "addAirport",
  initialState,
  reducers: {
    updateAirportField(
      state,
      action: PayloadAction<{ field: keyof AirportDetails; value: any }>
    ) {
      const { field, value } = action.payload;
      state.details[field] = value;
    },
    removeGalleryImage(state, action: PayloadAction<number>) {
      state.details.galleryImages.splice(action.payload, 1);
    },
  },
});

export const { updateAirportField, removeGalleryImage } =
  addAirportSlice.actions;
export default addAirportSlice.reducer;
