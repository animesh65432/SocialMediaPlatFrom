import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
const Roomid: React.FC = () => {
  let { roomid } = useParams();
  const token = useSelector((state: RootState) => state.user.idtoken);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const peer = useSelector((state: RootState) => state.socket.peer);

  useEffect(() => {
    socket.emit("joined_room", { roomid, peerid: peer?.id, token });
  }, [roomid]);
  return <div>Roomid</div>;
};

export default Roomid;
