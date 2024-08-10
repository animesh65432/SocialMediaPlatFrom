import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchUserFeed } from "../../../store/slices/SocketSlices";
import UserFeedPlayer from "./UserFeedPlayer";
const Roomid: React.FC = () => {
  let { roomid } = useParams();
  const token = useSelector((state: RootState) => state.user.idtoken);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const peer = useSelector((state: RootState) => state.socket.peer);
  const stream = useSelector((state: RootState) => state.socket.stream);
  const dispatch = useDispatch();

  const fetchUseraudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    dispatch(fetchUserFeed(stream));
  };

  useEffect(() => {
    socket.emit("joined_room", { roomid, peerid: peer?.id, token });
    fetchUseraudio();
  }, [roomid]);

  if (!stream) {
    return;
  }
  return (
    <div>
      <UserFeedPlayer stream={stream} />
    </div>
  );
};

export default Roomid;
