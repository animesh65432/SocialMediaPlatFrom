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
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src={users.PhotoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{users.Name}</h2>
          <p className="text-gray-600">{users?.Gender}</p>
          <button
            onClick={ontoggole}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
        {update && <UpdateProfile ontoggole={ontoggole} />}
      </div>
    </div>
  );
};

export default Profile;
