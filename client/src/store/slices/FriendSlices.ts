import { createSlice } from "@reduxjs/toolkit";

type friendobjecttypes = {
  Name: string;
  PhotoUrl: string;
  Id: number;
};

type friendstypes = {
  unknowfriends: friendobjecttypes[];
  fiends: friendobjecttypes[];
};
const FriendSlices = createSlice({
  name: "friend",
  initialState: {
    unknowfriends: [],
    fiends: [],
  } as friendstypes,
  reducers: {
    getallunknowfriends: (state, action) => {
      state.unknowfriends = action.payload;
    },
    getfriendsforsate: (state, action) => {
      state.fiends = action.payload;
    },
    addfrinedforstate: (state, action) => {
      let freinds = state.fiends;
      freinds.push({ ...action.payload, Id: state.fiends.length + 1 });
      state.fiends = freinds;
    },
    deletefriend: (state, action) => {
      let updatedfriends = state.fiends.filter(
        (obj) => obj.Id !== action.payload.Id
      );
      state.fiends = updatedfriends;
    },
    deleteunknowfriends: (state, action) => {
      let UpdateUnknownFriends = state.unknowfriends.filter(
        (obj) => obj.Id !== action.payload.Id
      );
      state.unknowfriends = UpdateUnknownFriends;
    },
    addtheunknowfriends: (state, action) => {
      let unknowfriends = state.unknowfriends;
      unknowfriends.push({ ...action.payload, Id: action.payload.id });
      state.unknowfriends = unknowfriends;
    },
  },
});
export const {
  getallunknowfriends,
  getfriendsforsate,
  deletefriend,
  addfrinedforstate,
  deleteunknowfriends,
  addtheunknowfriends,
} = FriendSlices.actions;
export default FriendSlices.reducer;
