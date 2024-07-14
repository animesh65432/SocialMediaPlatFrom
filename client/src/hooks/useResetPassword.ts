import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";

type Data = {
  Email: string;
};

interface USERESETPASSWORDRETURN {
  loading: boolean;
  resetpassword: (data: Data) => Promise<boolean>;
  errorMessages: string;
}

const useResetPassword = (): USERESETPASSWORDRETURN => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");

  const resetpassword = async (data: Data): Promise<boolean> => {
    setLoading(true);
    try {
      let response = await axios.post(`${backendurl}/forget/sent`, data);
      console.log(response);
      return true;
    } catch (error: any) {
      setErrorMessages(error?.response?.data?.messages);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetpassword, errorMessages };
};

export default useResetPassword;
