import React, { useEffect, useState } from "react";
import { useGetTheProfile } from "../../../hooks/customhooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UpdateProfile from "./UpdateProfile";

const Profile: React.FC = () => {
  const { GetProfile } = useGetTheProfile();
  const users = useSelector((state: RootState) => state.user.user);
  const [update, setupdate] = useState<boolean>(false);

  const ontoggole = () => {
    setupdate((prev) => !prev);
  };

  const fecthdata = () => {
    GetProfile();
  };
  useEffect(() => {
    fecthdata();
  }, []);
  return (
    <div className="h-dvh grid place-content-center">
      <div className="border-2 border-black rounded-lg h-96 flex justify-center ">
        <div>
          <img src={users.PhotoUrl} />
          <h2 className="font-bold text-center">{users.Name}</h2>
          <p>{users?.Gender}</p>
        </div>
        <button onClick={ontoggole}>update</button>
        {update && <UpdateProfile ontoggole={ontoggole} />}
      </div>
    </div>
  );
};

export default Profile;
