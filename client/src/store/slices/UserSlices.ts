import { createSlice } from "@reduxjs/toolkit";

type userTypes = {
  Name: string;
  Gender?: string;
  PhotoUrl: string;
};

type Userstates = {
  idtoken: string;
  user: userTypes;
};

const UserSlices = createSlice({
  name: "user",
  initialState: {
    idtoken: localStorage.getItem("token") || "",
    user: {},
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
    gettheuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addthetoken, deletethetoken, gettheuser } = UserSlices.actions;

export default UserSlices.reducer;
