import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoomType = { Id: string; Name: string; Topics: string };

interface RoomState {
  Rooms: RoomType[];
}

const RoomSlice = createSlice({
  name: "Room",
  initialState: { Rooms: [] } as RoomState,
  reducers: {
    gettherooms: (state, action: PayloadAction<RoomType[]>) => {
      state.Rooms = action.payload;
    },
    deleterooms: (state, action: PayloadAction<{ Id: string }>) => {
      state.Rooms = state.Rooms.filter((room) => room.Id !== action.payload.Id);
    },
  },
});

export const { gettherooms, deleterooms } = RoomSlice.actions;
export default RoomSlice.reducer;
