import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HajjUploadFlightType {
  includedWithBasePrice: boolean;
  flightFrom: string;
  flightTo: string;
  flightType: string;
  transitType: string;
  airlinesName: string;
  pricePerPax: number;
  title: string;
  carrierName: string;
  days: number[];
}

interface HajjUploadFlightsState {
  flights: HajjUploadFlightType[];
}

const initialState: HajjUploadFlightsState = {
  flights: [
    {
      includedWithBasePrice: false,
      flightFrom: "",
      flightTo: "",
      flightType: "",
      transitType: "",
      airlinesName: "",
      pricePerPax: 0,
      title: "",
      carrierName: "",
      days: [],
    },
  ],
};

const hajjUploadFlightsSlice = createSlice({
  name: "hajjUploadFlights",
  initialState,
  reducers: {
    updateFlightField(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof HajjUploadFlightType;
        value: string | boolean | number;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.flights[index][field] = value;
    },
    addFlight(state) {
      state.flights.push({
        includedWithBasePrice: false,
        flightFrom: "",
        flightTo: "",
        flightType: "",
        transitType: "",
        airlinesName: "",
        pricePerPax: 0,
        title: "",
        carrierName: "",
        days: [],
      });
    },
    removeFlight(state, action: PayloadAction<number>) {
      state.flights.splice(action.payload, 1);
    },
    toggleFlightDay(
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) {
      const { index, day } = action.payload;
      const flight = state.flights[index];
      if (flight.days.includes(day)) {
        flight.days = flight.days.filter((d) => d !== day);
      } else {
        flight.days.push(day);
      }
    },
  },
});

export const { updateFlightField, addFlight, removeFlight, toggleFlightDay } =
  hajjUploadFlightsSlice.actions;
export default hajjUploadFlightsSlice.reducer;
