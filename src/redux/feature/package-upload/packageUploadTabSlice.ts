import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
interface PackageUploadTabState {
  activeTab: number;
}

// Initial state
const initialState: PackageUploadTabState = {
  activeTab: 0,
};

const packageUploadTabSlice = createSlice({
  name: "packageUploadTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

// Export actions
export const { setActiveTab } = packageUploadTabSlice.actions;

// Export reducer
export default packageUploadTabSlice.reducer;

// Export state type for use in useSelector
export type { PackageUploadTabState };
