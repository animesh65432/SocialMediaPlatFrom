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
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(createRoom)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Create Room</h1>

        <div className="mb-4">
          <label
            htmlFor="Name"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Name
          </label>
          <input
            type="text"
            {...register("Name")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-red-500 text-sm">
            {errors.Name && errors.Name.message}
          </span>
        </div>

        <div className="mb-4">
          <label
            htmlFor="Topics"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Topics
          </label>
          <input
            type="text"
            {...register("Topics")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-red-500 text-sm">
            {errors.Topics && errors.Topics.message}
          </span>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition"
          type="submit"
        >
          Create Room
        </button>
      </form>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Rooms.map((room) => (
            <Link
              to={`/Rooms/${room.Id}`}
              key={room.Id}
              className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-lg text-gray-800">
                {room.Name}
              </div>
              <div className="text-gray-600 mt-1">{room.Topics}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Join;
