import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { addpeer } from "../../../store/slices/SocketSlices";
import UserFeedPlayer from "./UserFeedPlayer";
import { useUserMedia, useDeleteRoom } from "../../../hooks/customhooks";
import { useNavigate } from "react-router-dom";
import Participants from "./Participants";

const Roomid: React.FC = () => {
  const { roomid } = useParams();
  const token = useSelector((state: RootState) => state.user.idtoken);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const peer = useSelector((state: RootState) => state.socket.peer);
  const stream = useSelector((state: RootState) => state.socket.stream);
  const peers = useSelector((state: RootState) => state.socket.peers);
  const [participantswithnames, setparticipantswithnames] = useState<any[]>([]);
  const { fetchUserAudio } = useUserMedia();
  const { deleteroom } = useDeleteRoom();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        if (socket && peer && token) {
          socket.emit("joined_room", { roomid, peerid: peer.id, token });
          await fetchUserAudio();
        }
      } catch (error) {
        console.error("Error joining room:", error);
      }
    };

    socket.on("Get-participants", ({ participantswithnames }) => {
      console.log(participantswithnames);
      setparticipantswithnames(participantswithnames);
    });

    joinRoom();
  }, [socket, peer, token, roomid]);

  useEffect(() => {
    const setupSocketListeners = async () => {
      try {
        if (!peer || !stream || !socket) return;

        socket.on("user_joined", ({ peerid }: { peerid: string }) => {
          const call = peer.call(peerid, stream);
          call.on("stream", (userStream) => {
            dispatch(addpeer({ peerId: peerid, stream: userStream }));
          });
        });

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userStream) => {
            dispatch(addpeer({ peerId: call.peer, stream: userStream }));
          });
        });

        socket.emit("ready");
      } catch (error) {
        console.error("Error setting up socket listeners:", error);
      }
    };

    setupSocketListeners();
  }, [peer, stream, socket, dispatch, roomid]);

  const deleteRoom = async () => {
    try {
      if (roomid) {
        await deleteroom({ Id: roomid });
        navigate("/video");
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  if (!stream) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-gray-100 min-h-screen">
      <button
        onClick={deleteRoom}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300"
      >
        Delete Room
      </button>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Feed</h3>
        <UserFeedPlayer stream={stream} />
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Other Users' Feeds
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(peers).map((peerId) => (
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Participants
        </h3>
        <div className="flex flex-wrap gap-4">
          {participantswithnames.map((user, index) => (
            <Participants
              name={user.Name}
              key={index}
              Photourl={user.Photourl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roomid;
