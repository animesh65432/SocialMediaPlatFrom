import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidV4();
    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log("user created the room");
  };

  socket.on("create-room", createRoom);
};
