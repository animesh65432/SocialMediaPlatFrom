import axios from "axios";
import { backendurl } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState } from "../store";
import { gettheuser } from "@/store/slices/UserSlices"
type useUpdateFunciondata = {
  PhotoUrl?: string;
  Name?: string;
  Gender?: string;
};

interface useUpdateProfiletypes {
  updateprofile: (data: useUpdateFunciondata) => void;
  loading: boolean;
}

const useUpdateProfile = (): useUpdateProfiletypes => {
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.user.idtoken);
  let updateprofile = async (data: useUpdateFunciondata) => {
    setloading(true);
    try {
      console.log(data, "updateprofile")

      const response = await axios.put(`${backendurl}/profile/update`, data, {
        headers: {
          token
        }
      })

      const update = response?.data?.data?.updateData
      dispatch(gettheuser(update))
      return response
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setloading(false);
    }
  };

  return { updateprofile, loading };
};

export default useUpdateProfile;
