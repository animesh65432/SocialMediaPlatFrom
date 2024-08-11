import { createSlice } from "@reduxjs/toolkit";

const Color = createSlice({
  name: "color",
  initialState: {
    color: true,
  },
  reducers: {
    togole: (state) => {
      state.color = !state.color;
    },
  },
});

export const { togole } = Color.actions;

export default Color.reducer;
