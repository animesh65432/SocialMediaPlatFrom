import { useState } from "react";
import axios from "axios";
import { backendurl } from "../utils";

type CreateNewPostPayload = {
  img?: FileList;
  title: string;
  video?: FileList;
};

interface UsePostHookReturn {
  loading: boolean;
  createnewpost: (data: CreateNewPostPayload) => Promise<boolean>;
  errorMessages: string;
}

const usePosthook = (): UsePostHookReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");

  const createnewpost = async (data: CreateNewPostPayload) => {
    setLoading(true);
    try {
      if (data.img) {
        let response = await axios.post(
          `${backendurl}/post/createpost`,
          { ...data, img: "images" },
          {
            withCredentials: true,
          }
        );
        console.log(data.img[0]);
        await axios.put(response?.data?.data?.url, data?.img[0]);
      } else if (data.video) {
        let response = await axios.post(
          `${backendurl}/post/createpost`,
          { ...data, video: "video" },
          {
            withCredentials: true,
          }
        );
        await axios.put(response?.data?.data?.url, data?.video[0]);
      }
      return true;
    } catch (error: any) {
      setErrorMessages(error?.response?.data?.messages || "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createnewpost, errorMessages };
};

export default usePosthook;
