import axios from "axios";
import { backendurl } from "../utils";
import { useDispatch } from "react-redux";
import { gettheuser } from "../store/slices/UserSlices";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface useGetTheProfileReturnTypes {
  GetProfile: () => void;
}

const useGetTheProfile = (): useGetTheProfileReturnTypes => {
  const dispacth = useDispatch();
  const token = useSelector((state: RootState) => state.user.idtoken);
  const GetProfile = async () => {
    try {
      let Response = await axios.get(`${backendurl}/profile/Get`, {
        headers: {
          token,
        },
      });
      console.log(Response?.data?.data?.data?.dataValues);
      dispacth(gettheuser(Response?.data?.data?.data?.dataValues));
    } catch (error) {
      console.log(error);
    }
  };

  return { GetProfile };
};

export default useGetTheProfile;
