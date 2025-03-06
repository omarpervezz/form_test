import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelErrors {
  includedWithBasePrice?: string;
  hotelName?: string;
  hotelType?: string;
  roomType?: string;
  hotelStar?: string;
  hotelDistance?: string;
  pricePerNight?: string;
  pricePerPax?: string;
}

interface HotelErrorState {
  hotelErrors: HotelErrors[];
}

const initialState: HotelErrorState = {
  hotelErrors: [{}],
};

const hajjUploadHotelErrorsSlice = createSlice({
  name: "hajjUploadHotelErrors",
  initialState,
  reducers: {
    setHotelError(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof HotelErrors;
        error: string;
      }>
    ) {
      const { index, field, error } = action.payload;
      if (!state.hotelErrors[index]) {
        state.hotelErrors[index] = {};
      }
      state.hotelErrors[index][field] = error;
    },
    clearHotelError(
      state,
      action: PayloadAction<{ index: number; field: keyof HotelErrors }>
    ) {
      const { index, field } = action.payload;
      if (state.hotelErrors[index]) {
        delete state.hotelErrors[index][field];
      }
    },
  },
});

export const { setHotelError, clearHotelError } =
  hajjUploadHotelErrorsSlice.actions;
export default hajjUploadHotelErrorsSlice.reducer;
