import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";

type data = {
  Id: number;
  message: string;
};

type useSentThemessagereturnTypes = [
  loading: boolean,
  sentthemessage: (data: data) => Promise<any>
];
const useSentThemessage = (): useSentThemessagereturnTypes => {
  const [loading, setloading] = useState<boolean>(false);

  const sentthemessage = async (data: data) => {
    console.log(data);
    setloading(false);
    try {
      let response = await axios.post(
        `${backendurl}/Messages/sent/${data.Id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(true);
    }
  };

  return [loading, sentthemessage];
};

export default useSentThemessage;
