import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RoomFrom from "../../../Schema/RoomFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomFromTypes } from "../../../types";
import { useGetRoom } from "../../../hooks/customhooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Join: React.FC = () => {
  const ws = useSelector((state: RootState) => state.socket.socket);
  const Rooms = useSelector((state: RootState) => state.Room.Rooms);
  const { GetRooms } = useGetRoom();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFromTypes>({
    resolver: zodResolver(RoomFrom),
  });

  const navigate = useNavigate();
  const createRoom = (data: RoomFromTypes) => {
    console.log(data);
    ws.emit("create-room", data);
    ws.on("room-created", ({ roomId }: { roomId: string }) => {
      navigate(`/Rooms/${roomId}`);
    });
  };

  const fetchRooms = async () => {
    await GetRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <form
        onSubmit={handleSubmit(createRoom)}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-6"
      >
        <label htmlFor="Name" className="block text-gray-700">
          Name
        </label>
        <input
          type="text"
          {...register("Name")}
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
        <span className="text-red-500">
          {errors.Name && errors.Name.message}
        </span>

        <label htmlFor="Topics" className="block text-gray-700 mt-4">
          Topics
        </label>
        <input
          type="text"
          {...register("Topics")}
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
        <span className="text-red-500">
          {errors.Topics && errors.Topics.message}
        </span>

        <button
          className="w-full bg-rose-900 text-white p-2 rounded mt-4 hover:bg-rose-700 transition"
          type="submit"
        >
          Create Room
        </button>
      </form>

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Rooms.map((room) => (
            <Link
              to={`/Rooms/${room.Id}`}
              key={room.Id}
              className="block p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <div className="font-semibold text-lg">{room.Name}</div>
              <div className="text-gray-600">{room.Topics}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Join;
