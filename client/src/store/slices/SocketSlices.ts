import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { backendurl } from "../../utils";
import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

type socketslicestypes = {
  socket: Socket;
  peer: Peer | null;
};
const SocketSlices = createSlice({
  name: "Soscket",
  initialState: {
    socket: io(backendurl),
    peer: null,
  } as socketslicestypes,
  reducers: {
    createthepeer: (state) => {
      let id = uuidv4();
      state.peer = new Peer(id);
    },
  },
});

export const { createthepeer } = SocketSlices.actions;

export default SocketSlices.reducer;
