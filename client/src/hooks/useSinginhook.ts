import { useState } from "react";
import axios from "axios";
import { SinginTypes } from "../types";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { addthetoken } from "../store/slices/UserSlices";
interface USESINGINHOOKSRETURN {
  loading: boolean;
  logintheuser: (data: SinginTypes) => Promise<boolean>;
}

const useSinginhook = (): USESINGINHOOKSRETURN => {
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const logintheuser = async (data: SinginTypes) => {
    setloading(true);
    try {
      let reponse = await axios.post(`${backendurl}/users/login`, data, {
        withCredentials: true,
      });

      let token = reponse?.data?.data?.token;
      dispatch(addthetoken(token));

      return true;
    } catch (error) {
      return false;
    } finally {
      setloading(false);
    }
  };

  return { loading, logintheuser };
};

export default useSinginhook;
