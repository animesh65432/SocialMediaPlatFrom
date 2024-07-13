import { createSlice } from "@reduxjs/toolkit";

type Userstates = {
  idtoken: string;
};

const UserSlices = createSlice({
  name: "user",
  initialState: {
    idtoken: localStorage.getItem("token") || "",
  } as Userstates,
  reducers: {
    addthetoken: (state, action) => {
      state.idtoken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    deletethetoken: (state) => {
      state.idtoken = "";
      localStorage.removeItem("token");
    },
  },
});

export const { addthetoken, deletethetoken } = UserSlices.actions;

export default UserSlices.reducer;
