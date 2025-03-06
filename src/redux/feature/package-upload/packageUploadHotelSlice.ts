import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HotelType {
  includedWithBaseFare: boolean;
  title: string;
  hotelName: string;
  hotelStar: number;
  roomType: string;
  roomCategory: string;
  pricePerNight: number;
  totalStays: number;
  pricePerPax: number;
  days: number[];
}

const initialState: HotelType[] = [
  {
    includedWithBaseFare: false,
    title: "",
    hotelName: "",
    hotelStar: 0,
    roomType: "",
    roomCategory: "",
    pricePerNight: 0,
    totalStays: 0,
    pricePerPax: 0,
    days: [],
  },
];

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state) => {
      state.push({
        includedWithBaseFare: false,
        title: "",
        hotelName: "",
        hotelStar: 0,
        roomType: "",
        roomCategory: "",
        pricePerNight: 0,
        totalStays: 0,
        pricePerPax: 0,
        days: [],
      });
    },
    updateHotelField: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof HotelType;
        value: string | boolean | number;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as HotelType[typeof field]) = value;
    },
    toggleHotelDay: (
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) => {
      const { index, day } = action.payload;
      const hotel = state[index];
      hotel.days = hotel.days.includes(day)
        ? hotel.days.filter((d) => d !== day)
        : [...hotel.days, day];
    },
  },
});

export const { addHotel, updateHotelField, toggleHotelDay } =
  hotelsSlice.actions;
export default hotelsSlice.reducer;
