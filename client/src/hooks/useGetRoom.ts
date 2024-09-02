import axios from "axios";
import { useDispatch } from "react-redux";
import { backendurl } from "../utils";
import { gettherooms } from "../store/slices/Room";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface useGetRoomtypes {
  GetRooms: () => Promise<void>;
}

const useGetRoom = (): useGetRoomtypes => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.idtoken);

  const GetRooms = async (): Promise<void> => {
    try {
      const response = await axios.get(`${backendurl}/Room/Get`, {
        headers: { token },
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
