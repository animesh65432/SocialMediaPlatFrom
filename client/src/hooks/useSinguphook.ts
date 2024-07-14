import { useState } from "react";
import { SignupTypes } from "../types";
import axios from "axios";
import { backendurl } from "../utils";

interface UseSigninHookReturn {
  loading: boolean;
  createtheuser: (data: SignupTypes) => Promise<boolean>;
  errorMessages: string;
}

const useSinguphook = (): UseSigninHookReturn => {
  const [loading, setloading] = useState<boolean>(false);
  const [errorMessages, seterrorMessages] = useState<string>("");

  const createtheuser = async (data: SignupTypes) => {
    setloading(true);
    try {
      let response = await axios.post(`${backendurl}/users/create`, data);
      console.log(response);
      return true;
    } catch (error: any) {
      console.log(error);
      seterrorMessages(error?.response?.data?.messages);
      return false;
    } finally {
      setloading(false);
    }
  };

  return { loading, createtheuser, errorMessages };
};

export default useSinguphook;
