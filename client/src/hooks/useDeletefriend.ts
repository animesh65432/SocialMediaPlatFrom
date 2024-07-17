import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import {
  deletefriend,
  addtheunknowfriends,
} from "../store/slices/FriendSlices";

type data = {
  id: number;
  Name: string;
  PhotoUrl: string;
};
interface useDeletefriendreturntype {
  deltelaoding: boolean;
  deletthefriend: (data: data) => void;
}

const useDeletefriend = (): useDeletefriendreturntype => {
  const dispatch = useDispatch();
  const [deltelaoding, setdeletloading] = useState<boolean>(false);

  const deletthefriend = async (data: data) => {
    setdeletloading(true);
    try {
      let response = await axios.delete(
        `${backendurl}/friends/delete/${data.id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      dispatch(deletefriend({ Id: data.id }));
      dispatch(addtheunknowfriends(data));
    } catch (error) {
      console.log(error);
    } finally {
      setdeletloading(false);
    }
  };

  return { deltelaoding, deletthefriend };
};

export default useDeletefriend;
