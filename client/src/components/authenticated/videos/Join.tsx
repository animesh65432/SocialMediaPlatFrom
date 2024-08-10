import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RoomFrom from "../../../Schema/RoomFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomFromTypes } from "../../../types";

const Join: React.FC = () => {
  const ws = useSelector((state: RootState) => state.socket.socket);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFromTypes>({
    resolver: zodResolver(RoomFrom),
  });
  const Navigate = useNavigate();
  const createRoom = (data: RoomFromTypes) => {
    console.log(data);
    ws.emit("create-room", data);
    ws.on("room-created", ({ roomId }: { roomId: string }) => {
      Navigate(`/Rooms/${roomId}`);
    });
  };
  return (
    <div className="grid place-content-center">
      <div>
        <form onSubmit={handleSubmit(createRoom)}>
          <label htmlFor="Name">Name</label>
          <input type="text" {...register("Name")}></input>
          <span>{errors.Name && errors.Name.message}</span>
          <label htmlFor="Topics">Topics</label>
          <input type="text" {...register("Topics")}></input>
          <span>{errors.Topics && errors.Topics.message}</span>
          <button className="bg-rose-900 hover:bg-slate-100" type="submit">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
