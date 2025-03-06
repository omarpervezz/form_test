import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransportType {
  includedWithBasePrice: boolean;
  title: string;
  detail: string;
  from: string;
  to: string;
  vehicleType: string;
  carryType: string;
  pricePerPax: string;
  days: number[];
}

interface TransportsState {
  transports: TransportType[];
}

const initialState: TransportsState = {
  transports: [
    {
      includedWithBasePrice: false,
      title: "",
      detail: "",
      from: "",
      to: "",
      vehicleType: "",
      carryType: "",
      pricePerPax: "",
      days: [],
    },
  ],
};

const hajjUploadTransportsSlice = createSlice({
  name: "hajjUploadTransports",
  initialState,
  reducers: {
    updateTransportField(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TransportType;
        value: string | boolean | number;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.transports[index][field] = value;
    },
    addTransport(state) {
      state.transports.push({
        includedWithBasePrice: false,
        title: "",
        detail: "",
        from: "",
        to: "",
        vehicleType: "",
        carryType: "",
        pricePerPax: "",
        days: [],
      });
    },
    removeTransport(state, action: PayloadAction<number>) {
      state.transports.splice(action.payload, 1);
    },
    toggleTransportDay(
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) {
      const { index, day } = action.payload;
      const transport = state.transports[index];
      if (transport.days.includes(day)) {
        transport.days = transport.days.filter((d) => d !== day);
      } else {
        transport.days.push(day);
      }
    },
  },
});

export const {
  updateTransportField,
  addTransport,
  removeTransport,
  toggleTransportDay,
} = hajjUploadTransportsSlice.actions;
export default hajjUploadTransportsSlice.reducer;
