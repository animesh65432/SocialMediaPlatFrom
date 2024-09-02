import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { GetallTheposts } from "../store/slices/PostSlices";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface GetallThepostshooksreturn {
  loading: boolean;
  getposts: () => Promise<boolean>;
}
const useGetThepost = (): GetallThepostshooksreturn => {
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.idtoken);

  const getposts = async () => {
    setloading(true);
    try {
      let response = await axios.get(`${backendurl}/post/GetThePost`, {
        headers: { token },
      });

      console.log(response?.data?.data?.data);
      dispatch(GetallTheposts(response?.data?.data?.data));
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setloading(false);
    }
  };

  return { loading, getposts };
};

export default useGetThepost;
