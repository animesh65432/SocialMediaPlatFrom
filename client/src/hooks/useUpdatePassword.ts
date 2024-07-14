import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";

type Data = {
  Password: string;
  id: string;
};

interface USEUPDATEPASSWORDRETURN {
  loading: boolean;
  updatepassword: (data: Data) => Promise<boolean>;
  errorMessages: string;
}

const useUpdatePassword = (): USEUPDATEPASSWORDRETURN => {
  const [loading, setloading] = useState<boolean>(false);
  const [errorMessages, seterrorMessages] = useState<string>("");

  const updatepassword = async (data: Data): Promise<boolean> => {
    setloading(true);
    try {
      let reponse = await axios.post(`${backendurl}/forget/update/`, data);
      console.log(reponse);
      return true;
    } catch (error: any) {
      seterrorMessages(error?.response?.data?.messages);
      return false;
    } finally {
      setloading(false);
    }
  };

  return { loading, updatepassword, errorMessages };
};

export default useUpdatePassword;
