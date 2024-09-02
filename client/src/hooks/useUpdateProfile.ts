import axios from "axios";
import { backendurl } from "../utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../store";
type useUpdateFunciondata = {
  PhotoUrl: FileList;
  Name: string;
  Gender: string;
};

interface useUpdateProfiletypes {
  updateprofile: (data: useUpdateFunciondata) => void;
  upload: boolean;
  loading: boolean;
}

const useUpdateProfile = (): useUpdateProfiletypes => {
  const [upload, setupload] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.idtoken);
  let updateprofile = async (data: useUpdateFunciondata) => {
    let Response;
    setloading(true);
    try {
      let usersdata = { ...data, PhotoUrl: "" };
      console.log(usersdata);
      if (data.PhotoUrl.length > 0) {
        Response = await axios.put(`${backendurl}/profile/update`, usersdata, {
          withCredentials: true,
        });
      }
      await axios.put(Response?.data?.data?.url, data.PhotoUrl[0], {
        headers: {
          token,
        },
      });
      setupload(true);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { updateprofile, upload, loading };
};

export default useUpdateProfile;
