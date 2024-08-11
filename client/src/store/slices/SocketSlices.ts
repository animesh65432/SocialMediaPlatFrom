import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { backendurl } from "../../utils";
import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

type socketslicestypes = {
  socket: Socket;
  peer: Peer | null;
  stream: MediaStream | null;
  peers: Record<string, { stream: MediaStream }>;
};
const SocketSlices = createSlice({
  name: "Soscket",
  initialState: {
    socket: io(backendurl),
    peer: null,
    stream: null,
    peers: {},
  } as socketslicestypes,
  reducers: {
    createthepeer: (state) => {
      let id = uuidv4();
      state.peer = new Peer(id, {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });
    },
    fetchUserFeed: (state, action: PayloadAction<MediaStream>) => {
      state.stream = action.payload;
    },
    addpeer: (
      state,
      action: PayloadAction<{ peerId: string; stream: MediaStream }>
    ) => {
      console.log(action.payload);
      state.peers = {
        ...state.peers,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };
    },
    removetheusefeed: (state) => {
      state.stream = null;
    },
  },
});

export const { createthepeer, fetchUserFeed, addpeer, removetheusefeed } =
  SocketSlices.actions;

export default SocketSlices.reducer;
