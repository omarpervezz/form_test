import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GuideType {
  includedWithBasePrice: boolean;
  title: string;
  detail: string;
  guideType: string;
  guideAt: number[];
  gender: string;
  pricePerPax: number | null;
}

const initialState: GuideType[] = [
  {
    includedWithBasePrice: false,
    title: "",
    detail: "",
    guideType: "",
    guideAt: [],
    gender: "",
    pricePerPax: null,
  },
];

const packageUploadGuideSlice = createSlice({
  name: "packageUploadGuide",
  initialState,
  reducers: {
    addGuide: (state) => {
      state.push({
        includedWithBasePrice: false,
        title: "",
        detail: "",
        guideType: "",
        guideAt: [],
        gender: "",
        pricePerPax: null,
      });
    },
    updateGuideField: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof GuideType;
        value: string | boolean | number | number[] | null;
      }>
    ) => {
      const { index, field, value } = action.payload;
      (state[index][field] as GuideType[typeof field]) = value;
    },
    toggleGuideDay: (
      state,
      action: PayloadAction<{ index: number; day: number }>
    ) => {
      const { index, day } = action.payload;
      const guide = state[index];
      guide.guideAt = guide.guideAt.includes(day)
        ? guide.guideAt.filter((d) => d !== day)
        : [...guide.guideAt, day];
    },
  },
});

export const { addGuide, updateGuideField, toggleGuideDay } =
  packageUploadGuideSlice.actions;
export default packageUploadGuideSlice.reducer;
