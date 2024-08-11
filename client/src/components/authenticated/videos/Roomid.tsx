import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { addpeer } from "../../../store/slices/SocketSlices";
import UserFeedPlayer from "./UserFeedPlayer";
import { useUserMedia } from "../../../hooks/customhooks";

const Roomid: React.FC = () => {
  const { roomid } = useParams();
  const token = useSelector((state: RootState) => state.user.idtoken);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const peer = useSelector((state: RootState) => state.socket.peer);
  const stream = useSelector((state: RootState) => state.socket.stream);
  const peers = useSelector((state: RootState) => state.socket.peers);
  const { fetchUserAudio } = useUserMedia();
  const dispatch = useDispatch();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        if (socket && peer && token) {
          console.log("Emitting joined_room with data:", {
            roomid,
            peerid: peer.id,
            token,
          });
          socket.emit("joined_room", { roomid, peerid: peer.id, token });
          await fetchUserAudio();
        }
      } catch (error) {
        console.error("Error joining room:", error);
      }
    };

    joinRoom();
  }, [socket, peer, token, roomid]);

  useEffect(() => {
    const setupSocketListeners = async () => {
      try {
        if (!peer || !stream || !socket) return;

        socket.on("user_joined", ({ peerid }: { peerid: string }) => {
          console.log(peerid);
          const call = peer.call(peerid, stream);
          call.on("stream", (userStream) => {
            console.log(`Received stream from peerid: ${peerid}`);
            dispatch(addpeer({ peerId: peerid, stream: userStream }));
          });
        });

        peer.on("call", (call) => {
          console.log(`Received 'call' event from peer: ${call.peer}`);
          call.answer(stream);
          call.on("stream", (userStream) => {
            console.log(`Received stream from peer: ${call.peer}`);
            dispatch(addpeer({ peerId: call.peer, stream: userStream }));
          });
        });

        console.log("Emitting 'ready' event");
        socket.emit("ready");
      } catch (error) {
        console.error("Error setting up socket listeners:", error);
      }
    };

    setupSocketListeners();
  }, [peer, stream, socket, dispatch, roomid]);

  if (!stream) {
    return <div>Loading...</div>;
  }

  console.log(peers);

  return (
    <div>
      <div>
        <h3>Your Feed</h3>
        <UserFeedPlayer stream={stream} />
      </div>
      <div>
        <h3>Other Users' Feeds</h3>
        {Object.keys(peers).map((peerId) => (
          <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
        ))}
      </div>
    </div>
  );
};

export default Roomid;
