import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const naviagatetohome = () => {
    navigate("/");
  };

  const navigaetotheprofile = () => {
    navigate("/Profile ");
  };

  return (
    <div>
      <div className="bg-blue-700 text-white flex flex-col sm:flex-row sm:justify-around p-4 sm:p-6 flex-reverse sm:flex-none">
        <div
          className="p-2 sm:p-3 bg-slate-200 rounded font-medium hover:bg-blue-400 text-black"
          onClick={naviagatetohome}
        >
          Home
        </div>

        <div
          onClick={navigaetotheprofile}
          className="p-2 sm:p-3 hover:bg-blue-400 rounded font-medium  bg-slate-200 text-black"
        >
          Profile
        </div>
      </div>
    </div>
  );
};

export default Header;
