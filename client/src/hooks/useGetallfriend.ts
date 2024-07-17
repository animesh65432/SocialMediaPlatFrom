import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { getfriendsforsate } from "../store/slices/FriendSlices";

interface useGetallfriendtreturntypes {
  getfriendsloading: boolean;
  getfriends: () => {};
}

const useGetallfriend = (): useGetallfriendtreturntypes => {
  const [getfriendsloading, setgetfriendsloading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getfriends = async () => {
    setgetfriendsloading(true);
    try {
      let response = await axios.get(`${backendurl}/friends/Getfriends`, {
        withCredentials: true,
      });
      console.log(response?.data?.data?.friends);
      dispatch(getfriendsforsate(response?.data?.data?.friends));
    } catch (error) {
      console.log(error);
    } finally {
      setgetfriendsloading(false);
    }
  };

  return { getfriends, getfriendsloading };
};

export default useGetallfriend;
