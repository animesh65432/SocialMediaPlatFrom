import { useState } from "react";
import axios from "axios";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { getallunknowfriends } from "../store/slices/FriendSlices";

interface useGetallfrinedhookReturnTypes {
  loading: boolean;
  gettheallunknownfriends: () => void;
}

const useGetallunknownfrinedhook = (): useGetallfrinedhookReturnTypes => {
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const gettheallunknownfriends = async () => {
    setloading(true);
    try {
      let response = await axios.get(`${backendurl}/friends/unknownfriends`, {
        withCredentials: true,
      });
      console.log(response);
      console.log(response?.data?.data?.friends);
      dispatch(getallunknowfriends(response?.data?.data?.friends));
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { loading, gettheallunknownfriends };
};

export default useGetallunknownfrinedhook;
