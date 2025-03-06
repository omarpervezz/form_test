import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HajjUploadHotelType {
  includedWithBasePrice: boolean;
  hotelName: string;
  hotelType: string;
  roomType: string;
  hotelStar: string;
  hotelDistance: string;
  pricePerNight: string;
  pricePerPax: number;
}

interface HajjUploadHotelsState {
  hotels: HajjUploadHotelType[];
}

const initialState: HajjUploadHotelsState = {
  hotels: [
    {
      includedWithBasePrice: false,
      hotelName: "",
      hotelType: "",
      roomType: "",
      hotelStar: "",
      hotelDistance: "",
      pricePerNight: "",
      pricePerPax: 0,
    },
  ],
};

const hajjUploadHotelsSlice = createSlice({
  name: "hajjUploadHotels",
  initialState,
  reducers: {
    updateHotelField(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof HajjUploadHotelType;
        value: string | boolean | number;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.hotels[index][field] = value;
    },
    addHotel(state) {
      state.hotels.push({
        includedWithBasePrice: false,
        hotelName: "",
        hotelType: "",
        roomType: "",
        hotelStar: "",
        hotelDistance: "",
        pricePerNight: "",
        pricePerPax: 0,
      });
    },
    removeHotel(state, action: PayloadAction<number>) {
      state.hotels.splice(action.payload, 1);
    },
  },
});

export const { updateHotelField, addHotel, removeHotel } =
  hajjUploadHotelsSlice.actions;
export default hajjUploadHotelsSlice.reducer;
