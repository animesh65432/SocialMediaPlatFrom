import { useState } from "react";
import axios from "axios";
import { backendurl } from "../utils";

type useGetTheMessageReturnTypes = [
  messageloading: boolean,
  GetTheMessages: () => Promise<boolean>
];

const useGetTheMessage = (): useGetTheMessageReturnTypes => {
  const [messageloading, setMessageLoading] = useState<boolean>(false);

  const GetTheMessages = async (): Promise<boolean> => {
    setMessageLoading(true);
    try {
      const response = await axios.get(`${backendurl}/Messages/Get`, {
        withCredentials: true,
      });
      console.log(response.data);
      return true;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return false;
    } finally {
      setMessageLoading(false);
    }
  };

  return [messageloading, GetTheMessages];
};

export default useGetTheMessage;
