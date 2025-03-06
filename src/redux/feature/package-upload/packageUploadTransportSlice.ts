import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransportType {
  includedWithBasePrice: boolean;
  title: string;
  detail: string;
  from: string;
  to: string;
  vehicleType: string;
  carryType: string;
  pricePerPax: number;
  days: number[];
}

const initialState: TransportType[] = [
  {
    includedWithBasePrice: false,
    title: "",
    detail: "",
    from: "",
    to: "",
    vehicleType: "",
    carryType: "",
    pricePerPax: 0,
    days: [],
  },
];

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    addTransport: (state) => {
      state.push({
        includedWithBasePrice: false,
        title: "",
        detail: "",
        from: "",
        to: "",
        vehicleType: "",
        carryType: "",
        pricePerPax: 0,
        days: [],
      });
    },
    updateTransportField: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TransportType;
        value: string | boolean | number;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as TransportType[typeof field]) = value;
    },
    toggleTransportDay: (
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) => {
      const { index, day } = action.payload;
      const transport = state[index];
      transport.days = transport.days.includes(day)
        ? transport.days.filter((d) => d !== day)
        : [...transport.days, day];
    },
  },
});

export const { addTransport, updateTransportField, toggleTransportDay } =
  transportSlice.actions;
export default transportSlice.reducer;
