import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import {
  addfrinedforstate,
  deleteunknowfriends,
} from "../store/slices/FriendSlices";

type addfirendtypes = {
  id: number;
  Name: string;
  PhotoUrl: string;
};

interface useaddfirendreturntypes {
  loading: boolean;
  addfirned: (data: addfirendtypes) => Promise<boolean>;
}

const useaddfirend = (): useaddfirendreturntypes => {
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const addfirned = async (data: addfirendtypes) => {
    setloading(false);
    try {
      let response = await axios.post(
        `${backendurl}/friends/add/${data.id}`,
        data,
        { withCredentials: true }
      );
      console.log(response);
      dispatch(addfrinedforstate(data));
      dispatch(deleteunknowfriends({ Id: data.id }));
      return true;
    } catch (error) {
      return false;
    } finally {
      setloading(true);
    }
  };

  return { loading, addfirned };
};

export default useaddfirend;
