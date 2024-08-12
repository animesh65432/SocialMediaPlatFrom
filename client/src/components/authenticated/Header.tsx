import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const naviagatetohome = () => {
    navigate("/");
  };

  const navigaetotheprofile = () => {
    navigate("/Profile");
  };

  const navigatetovideo = () => {
    navigate("/video");
  };

  return (
    <div className="bg-slate-900 text-slate-200">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center p-4">
        <div
          className="p-3 rounded-lg font-medium cursor-pointer transition-colors duration-300 hover:bg-slate-700 hover:text-slate-100 bg-slate-800"
          onClick={naviagatetohome}
        >
          Home
        </div>
        <div
          onClick={navigatetovideo}
          className="p-3 rounded-lg font-medium cursor-pointer transition-colors duration-300 hover:bg-blue-500 hover:text-slate-100 bg-slate-800 mt-4 sm:mt-0"
        >
          Learninzone
        </div>
        <div
          onClick={navigaetotheprofile}
          className="p-3 rounded-lg font-medium cursor-pointer transition-colors duration-300 hover:bg-blue-500 hover:text-slate-100 bg-slate-800 mt-4 sm:mt-0"
        >
          Profile
        </div>
      </div>
    </div>
  );
};

export default Header;
