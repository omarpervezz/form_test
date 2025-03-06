import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface ContactInfoState {
  contactInfo: ContactInfo[];
}

const initialState: ContactInfoState = {
  contactInfo: [{ name: "", email: "", phone: "" }],
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState,
  reducers: {
    updateContactInfoField(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ContactInfo;
        value: string;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.contactInfo[index][field] = value;
    },
    addContactInfo(state) {
      state.contactInfo.push({ name: "", email: "", phone: "" });
    },
    removeContactInfo(state, action: PayloadAction<number>) {
      state.contactInfo.splice(action.payload, 1);
    },
  },
});

export const { updateContactInfoField, addContactInfo, removeContactInfo } =
  contactInfoSlice.actions;
export default contactInfoSlice.reducer;
