import { useState } from "react";
import axios from "axios";
import { SinginTypes } from "../types";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { addthetoken } from "../store/slices/UserSlices";
interface USESINGINHOOKSRETURN {
  loading: boolean;
  logintheuser: (data: SinginTypes) => Promise<boolean>;
  errorMessages: string;
}

const useSinginhook = (): USESINGINHOOKSRETURN => {
  const [loading, setloading] = useState<boolean>(false);
  const [errorMessages, seterrorMessages] = useState<string>("");
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
    } catch (error: any) {
      seterrorMessages(error?.response?.data?.messages);
      return false;
    } finally {
      setloading(false);
    }
  };

  return { loading, logintheuser, errorMessages };
};

export default useSinginhook;
