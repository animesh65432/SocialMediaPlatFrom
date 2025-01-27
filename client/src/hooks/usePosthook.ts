import { useState } from "react";
import axios from "axios";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { GetallTheposts } from "../store/slices/PostSlices";
import { useSelector } from "react-redux";
import { RootState } from "../store";
type CreateNewPostPayload = {
  img?: string;
  title: string;
  video?: string;
};

interface UsePostHookReturn {
  loading: boolean;
  createnewpost: (data: CreateNewPostPayload) => Promise<boolean>;
  errorMessages: string;
}

const usePosthook = (): UsePostHookReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.idtoken);

  const createnewpost = async (data: CreateNewPostPayload) => {
    setLoading(true);
    try {
      if (data.img) {
        let response = await axios.post(
          `${backendurl}/post/createpost`,
          data,
          {
            headers: {
              token,
            },
          }
        );
        console.log(response)
      } else if (data.video) {
        let response = await axios.post(
          `${backendurl}/post/createpost`,
          data,
          {
            headers: {
              token,
            },
          }
        );
        console.log(response, "response")
      }
      let response = await axios.get(`${backendurl}/post/GetThePost`, {
        headers: { token },
      });
      console.log(response, "all the posts")
      let posts = response?.data?.data?.data;
      dispatch(GetallTheposts(posts));
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
