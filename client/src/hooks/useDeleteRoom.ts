import axios from "axios";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { deleterooms } from "../store/slices/Room";

type deleteroomtypes = {
  Id: string;
};

interface useDeleteRoomtypes {
  deleteroom: (data: deleteroomtypes) => Promise<void>;
}

const useDeleteRoom = (): useDeleteRoomtypes => {
  const dispatch = useDispatch();

  const deleteroom = async (data: deleteroomtypes): Promise<void> => {
    try {
      await axios.delete(`${backendurl}/Room/delete/${data.Id}`);
      dispatch(deleterooms(data));
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteroom };
};

export default useDeleteRoom;
