import React from "react";
import { socialmediaicons } from "../../utils";

const Footer: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <div className="flex space-x-4 sm:space-x-6 items-center">
          {socialmediaicons.map((icon, index) => (
            <div key={index} className="group">
              <img
                src={icon}
                alt={`Social media icon ${index}`}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 hover:opacity-80"
              />
            </div>
          ))}
        </div>
        <p className="text-sm mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
