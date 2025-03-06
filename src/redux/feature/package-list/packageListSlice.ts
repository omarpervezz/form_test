import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingCarState {
  currentPage: number;
}

const initialState: BookingCarState = {
  currentPage: 1,
};

const bookingCarSlice = createSlice({
  name: "bookingCar",
  initialState,
  reducers: {
    setCurrentPackagePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPackagePage } = bookingCarSlice.actions;

export default bookingCarSlice.reducer;
