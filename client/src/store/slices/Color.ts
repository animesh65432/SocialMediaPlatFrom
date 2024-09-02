import { createSlice } from "@reduxjs/toolkit";
export interface ColorSlices {
  color: boolean;
}

const Color = createSlice({
  name: "color",
  initialState: {
    color: true,
  } as ColorSlices,
  reducers: {
    togole: (state) => {
      state.color = !state.color;
    },
  },
});

export const { togole } = Color.actions;

export default Color.reducer;
