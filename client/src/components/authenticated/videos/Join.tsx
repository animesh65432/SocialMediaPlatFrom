import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
const Join: React.FC = () => {
  const ws = useSelector((state: RootState) => state.socket.socket);
  const Navigate = useNavigate();
  const createRoom = () => {
    ws.emit("create-room");
    ws.on("room-created", (data: { roomId: string }) => {
      console.log(data);
      Navigate(`/Rooms/${data.roomId}`);
    });
  };
  return (
    <div className="grid place-content-center">
      <button onClick={createRoom} className="bg-rose-900 hover:bg-slate-100">
        Create Room
      </button>
    </div>
  );
};

export default Join;
