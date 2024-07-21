import React from "react";
import { socialmediaicons } from "../../utils";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="flex bg-blue-700 text-white p-3 justify-center sm:justify-between">
        <div className="flex space-x-4 sm:space-x-7 items-center">
          {socialmediaicons.map((icon, index) => (
            <div key={index}>
              <img
                src={icon}
                className="h-10 w-10 rounded-md hover:opacity-75 transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
