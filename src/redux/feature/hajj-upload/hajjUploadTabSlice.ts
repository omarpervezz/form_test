import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTab: number;
}

const initialState: TabState = {
  activeTab: 0,
};

const hajjUploadTabSlice = createSlice({
  name: "hajjUploadTab",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = hajjUploadTabSlice.actions;
export default hajjUploadTabSlice.reducer;
