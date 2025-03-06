// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface FlightType {
//   includedWithBaseFare: boolean;
//   title: string;
//   flightFrom: string;
//   flightTo: string;
//   flightType: string;
//   carrierName: string;
//   pricePerPax: number;
//   days: number[];
// }

// const initialState: FlightType[] = [
//   {
//     includedWithBaseFare: false,
//     title: "",
//     flightFrom: "",
//     flightTo: "",
//     flightType: "",
//     carrierName: "",
//     pricePerPax: 0,
//     days: [],
//   },
// ];

// const flightsSlice = createSlice({
//   name: "flights",
//   initialState,
//   reducers: {
//     addFlight: (state) => {
//       state.push({
//         includedWithBaseFare: false,
//         title: "",
//         flightFrom: "",
//         flightTo: "",
//         flightType: "",
//         carrierName: "",
//         pricePerPax: 0,
//         days: [],
//       });
//     },
//     updateFlightField: (
//       state,
//       action: PayloadAction<{
//         index: number;
//         field: keyof FlightType;
//         value: string | boolean | number;
//       }>
//     ) => {
//       const { index, field, value } = action.payload;
//       (state[index][field] as FlightType[typeof field]) = value;
//     },
//     toggleFlightDay: (
//       state,
//       action: PayloadAction<{ index: number; day: number }>
//     ) => {
//       const { index, day } = action.payload;
//       const flight = state[index];
//       flight.days = flight.days.includes(day)
//         ? flight.days.filter((d) => d !== day)
//         : [...flight.days, day];
//     },
//   },
// });

// export const { addFlight, updateFlightField, toggleFlightDay } =
//   flightsSlice.actions;
// export default flightsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FlightType {
  includedWithBaseFare: boolean;
  title: string;
  flightFrom: string;
  flightTo: string;
  flightType: string;
  carrierName: string;
  pricePerPax: number;
  days: number[];
}

const initialState: FlightType[] = [
  {
    includedWithBaseFare: false,
    title: "",
    flightFrom: "",
    flightTo: "",
    flightType: "",
    carrierName: "",
    pricePerPax: 0,
    days: [],
  },
];

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    addFlight: (state) => {
      state.push({
        includedWithBaseFare: false,
        title: "",
        flightFrom: "",
        flightTo: "",
        flightType: "",
        carrierName: "",
        pricePerPax: 0,
        days: [],
      });
    },
    updateFlightField: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof FlightType;
        value: string | boolean | number;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as FlightType[typeof field]) = value;
    },
    toggleFlightDay: (
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) => {
      const { index, day } = action.payload;
      const flight = state[index];
      flight.days = flight.days.includes(day)
        ? flight.days.filter((d) => d !== day)
        : [...flight.days, day];
    },
  },
});

export const { addFlight, updateFlightField, toggleFlightDay } =
  flightsSlice.actions;
export default flightsSlice.reducer;
