import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <div className="bg-indigo-600 text-white flex flex-col sm:flex-row sm:space-x-4 p-4 sm:p-6 flex-reverse sm:flex-none">
        <div className="p-2 sm:p-3 hover:bg-indigo-700 rounded font-medium">
          Home
        </div>
        <div className="p-2 sm:p-3 hover:bg-indigo-700 rounded font-medium">
          Messages
        </div>
        <div className="p-2 sm:p-3 hover:bg-indigo-700 rounded font-medium">
          Friends
        </div>

        <div className="p-2 sm:p-3 hover:bg-indigo-700 rounded font-medium">
          Profile
        </div>
        <div className="p-2 sm:p-3 hover:bg-indigo-700 rounded font-medium">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Header;
