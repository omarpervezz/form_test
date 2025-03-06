import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  country: string;
  city: string;
  state: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
}

interface AddressState {
  addresses: Address[];
}

const initialState: AddressState = {
  addresses: [
    {
      country: "",
      city: "",
      state: "",
      addressLine1: "",
      addressLine2: "",
      postCode: "",
    },
  ],
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    updateAddress(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof Address;
        value: string;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.addresses[index][field] = value;
    },
    addAddress(state) {
      state.addresses.push({
        country: "",
        city: "",
        state: "",
        addressLine1: "",
        addressLine2: "",
        postCode: "",
      });
    },
    removeAddress(state, action: PayloadAction<number>) {
      state.addresses.splice(action.payload, 1);
    },
  },
});

export const { updateAddress, addAddress, removeAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
