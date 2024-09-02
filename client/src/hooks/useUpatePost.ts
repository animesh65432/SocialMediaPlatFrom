import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type updatePostpayloadtypes = {
  id: number;
  img?: FileList;
  video?: FileList;
  title: string;
};

interface updatepostretruntypes {
  loading: boolean;
  updatethepost: (data: updatePostpayloadtypes) => {};
}

const useUpatePost = (): updatepostretruntypes => {
  const [loading, setloading] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.idtoken);

  const updatethepost = async (data: updatePostpayloadtypes) => {
    setloading(false);
    let response;
    let url;
    try {
      if (data.img) {
        response = await axios.put(
          `${backendurl}/post/update/${data.id}`,
          { ...data, img: "images" },
          {
            headers: { token },
          }
        );
        url = response?.data?.data?.url;

        console.log(data.img[0]);
        await axios.put(url, data.img[0]);
      } else if (data.video) {
        response = await axios.put(
          `${backendurl}/post/update/${data.id}`,
          { ...data, video: "video" },
          {
            headers: { token },
          }
        );

        url = response?.data?.data?.url;
        await axios.put(url, data.video[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, updatethepost };
};

export default useUpatePost;
