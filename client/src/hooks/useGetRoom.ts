import axios from "axios";
import { useDispatch } from "react-redux";
import { backendurl } from "../utils";
import { gettherooms } from "../store/slices/Room";

interface useGetRoomtypes {
  GetRooms: () => Promise<void>;
}

const useGetRoom = (): useGetRoomtypes => {
  const dispatch = useDispatch();

  const GetRooms = async (): Promise<void> => {
    try {
      const response = await axios.get(`${backendurl}/Room/Get`, {
        withCredentials: true,
      });

      const data = response.data?.Rooms;
      dispatch(gettherooms(data));
    } catch (error) {
      console.log(error);
    }
  };

  return { GetRooms };
};

export default useGetRoom;
