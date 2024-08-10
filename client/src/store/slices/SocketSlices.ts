import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { backendurl } from "../../utils";

const SocketSlices = createSlice({
  name: "Soscket",
  initialState: {
    socket: io(backendurl),
  },
  reducers: {},
});

export default SocketSlices.reducer;
