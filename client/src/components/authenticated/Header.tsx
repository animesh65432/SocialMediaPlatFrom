import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletethetoken } from "../../store/slices/UserSlices";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();

  const navigatetofriend = () => {
    console.log("click");
    navigate("/friends");
  };

  const navigatetomessages = () => {
    navigate("/messages");
  };

  const naviagatetohome = () => {
    navigate("/");
  };

  const onuserlogout = () => {
    disptach(deletethetoken());
    navigate("/");
  };
  return (
    <div>
      <div className="bg-blue-700 text-white flex flex-col sm:flex-row sm:space-x-4 p-4 sm:p-6 flex-reverse sm:flex-none">
        <div
          className="p-2 sm:p-3 bg-slate-200 rounded font-medium hover:bg-blue-400 text-black"
          onClick={naviagatetohome}
        >
          Home
        </div>
        <div
          className="p-2 sm:p-3  rounded font-medium  hover:bg-blue-400  bg-slate-200 text-black"
          onClick={navigatetomessages}
        >
          Messages
        </div>
        <div
          className="p-2 sm:p-3  rounded font-medium  hover:bg-blue-400  bg-slate-200 text-black"
          onClick={navigatetofriend}
        >
          Friends
        </div>

        <div className="p-2 sm:p-3 hover:bg-blue-400 rounded font-medium  bg-slate-200 text-black">
          Profile
        </div>
        <div
          className="p-2 sm:p-3 hover:bg-blue-400 rounded font-medium  bg-slate-200 text-black"
          onClick={onuserlogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Header;
