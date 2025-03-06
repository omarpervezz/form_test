import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingFlightState {
  currentPage: number;
  printData: Record<string, unknown>[]; // Generic object type
  showPrint: boolean;
}

const initialState: BookingFlightState = {
  currentPage: 1, // No sessionStorage, default to 1
  printData: [],
  showPrint: false,
};

const bookingCarSlice = createSlice({
  name: "bookingCar",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPrintData(state, action: PayloadAction<Record<string, unknown>[]>) {
      state.printData = action.payload;
    },
    setShowPrint(state, action: PayloadAction<boolean>) {
      state.showPrint = action.payload;
    },
  },
});

export const { setCurrentPage, setPrintData, setShowPrint } =
  bookingCarSlice.actions;

export default bookingCarSlice.reducer;
