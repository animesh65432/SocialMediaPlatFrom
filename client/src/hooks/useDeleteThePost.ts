import { useState } from "react";
import { backendurl } from "../utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { delethepostfromreducer } from "../store/slices/PostSlices";

type userdeletepayloadtypes = {
  id: number;
};

interface deleteReturnTypes {
  loading: boolean;
  deletethepost: (data: userdeletepayloadtypes) => {};
}

const useDeleteThePost = (): deleteReturnTypes => {
  const [loading, seloading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const deletethepost = async (data: userdeletepayloadtypes) => {
    seloading(true);
    try {
      await axios.delete(`${backendurl}/post/deletepost/${data.id}`, {
        withCredentials: true,
      });
      dispatch(delethepostfromreducer({ id: data.id }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      seloading(false);
    }
  };

  return { loading, deletethepost };
};

export default useDeleteThePost;
