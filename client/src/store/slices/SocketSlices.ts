import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const SocketSlices = createSlice({
  name: "Soscket",
  initialState: {
    socket: io("http://localhost:3000"),
  },
  reducers: {},
});

export default SocketSlices.reducer;
