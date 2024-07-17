import axios from "axios";
import { useState } from "react";
import { backendurl } from "../utils";

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
            withCredentials: true,
          }
        );
        url = response?.data?.data?.url;

        await axios.put(url, data.img[0]);
      } else if (data.video) {
        response = await axios.put(
          `${backendurl}/post/update/${data.id}`,
          { ...data, video: "video" },
          {
            withCredentials: true,
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
