import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { backendurl } from "../../utils";
import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

type socketslicestypes = {
  socket: Socket;
  peer: Peer | null;
  stream: MediaStream | null;
};
const SocketSlices = createSlice({
  name: "Soscket",
  initialState: {
    socket: io(backendurl),
    peer: null,
    stream: null,
  } as socketslicestypes,
  reducers: {
    createthepeer: (state) => {
      let id = uuidv4();
      state.peer = new Peer(id);
    },
    fetchUserFeed: (state, action: PayloadAction<MediaStream>) => {
      state.stream = action.payload;
    },
  },
});

export const { createthepeer, fetchUserFeed } = SocketSlices.actions;

export default SocketSlices.reducer;
