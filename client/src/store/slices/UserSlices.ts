import { createSlice } from "@reduxjs/toolkit";

type userTypes = {
  Name: string;
  Gender?: string;
  PhotoUrl: string;
};

type OthersUsersTypes = {
  Id: number;
  Name: string;
  PhotoUrl: string;
  followers: number;
  Gender: string;
  Email: string
}

export type Userstates = {
  idtoken: string;
  user: userTypes;
  OthersUsers: OthersUsersTypes
};

const UserSlices = createSlice({
  name: "user",
  initialState: {
    idtoken: localStorage.getItem("token") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null,
    OthersUsers: {}
  } as Userstates,
  reducers: {
    addthetoken: (state, action) => {
      state.idtoken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    deletethetoken: (state) => {
      state.idtoken = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user")
    },
    gettheuser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    addOthersUser: (state, action) => {
      state.OthersUsers = action.payload
    }
  },
});

export const { addthetoken, deletethetoken, gettheuser, addOthersUser } = UserSlices.actions;

export default UserSlices.reducer;
