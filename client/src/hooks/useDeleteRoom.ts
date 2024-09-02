import axios from "axios";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { deleterooms } from "../store/slices/Room";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type deleteroomtypes = {
  Id: string;
};

interface useDeleteRoomtypes {
  deleteroom: (data: deleteroomtypes) => Promise<void>;
}

const useDeleteRoom = (): useDeleteRoomtypes => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.idtoken);

  const deleteroom = async (data: deleteroomtypes): Promise<void> => {
    try {
      await axios.delete(`${backendurl}/Room/delete/${data.Id}`, {
        headers: { token },
      });
      dispatch(deleterooms(data));
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteroom };
};

export default useDeleteRoom;
