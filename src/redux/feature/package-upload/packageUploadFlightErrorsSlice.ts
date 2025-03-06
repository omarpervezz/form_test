// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FlightType } from "./packageUploadFlightSlice";

// interface FlightErrorsState {
//   errors: Record<number, Partial<Record<keyof FlightType, string>>>;
// }

// const initialState: FlightErrorsState = {
//   errors: {},
// };

// const packageUploadFlightErrorsSlice = createSlice({
//   name: "packageUploadFlightErrors",
//   initialState,
//   reducers: {
//     setFlightError: (
//       state,
//       action: PayloadAction<{
//         index: number;
//         field: keyof FlightType;
//         error: string;
//       }>
//     ) => {
//       const { index, field, error } = action.payload;
//       if (!state.errors[index]) state.errors[index] = {};
//       state.errors[index][field] = error;
//     },
//     clearFlightError: (
//       state,
//       action: PayloadAction<{ index: number; field: keyof FlightType }>
//     ) => {
//       const { index, field } = action.payload;
//       if (state.errors[index]) {
//         delete state.errors[index][field];
//       }
//     },
//     clearAllFlightErrors: (state) => {
//       state.errors = {};
//     },
//   },
// });

// export const { setFlightError, clearFlightError, clearAllFlightErrors } =
//   packageUploadFlightErrorsSlice.actions;
// export default packageUploadFlightErrorsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightType } from "./packageUploadFlightSlice";

interface FlightErrorsState {
  errors: Record<number, Partial<Record<keyof FlightType, string>>>;
}

const initialState: FlightErrorsState = {
  errors: {},
};

const packageUploadFlightErrorsSlice = createSlice({
  name: "packageUploadFlightErrors",
  initialState,
  reducers: {
    setFlightError: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof FlightType;
        error: string;
      }>
    ) => {
      const { index, field, error } = action.payload;
      if (!state.errors[index]) state.errors[index] = {};
      state.errors[index][field] = error;
    },
    clearFlightError: (
      state,
      action: PayloadAction<{ index: number; field: keyof FlightType }>
    ) => {
      const { index, field } = action.payload;
      if (state.errors[index]) {
        delete state.errors[index][field];
      }
    },
    clearAllFlightErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setFlightError, clearFlightError, clearAllFlightErrors } =
  packageUploadFlightErrorsSlice.actions;
export default packageUploadFlightErrorsSlice.reducer;
