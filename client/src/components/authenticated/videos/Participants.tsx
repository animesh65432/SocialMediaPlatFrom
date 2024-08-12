import React from "react";

type props = {
  name: string;
  Photourl: string;
};

const Participants: React.FC<props> = ({ name, Photourl }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg w-full max-w-xs">
      <img
        src={Photourl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="text-lg font-medium text-gray-700">{name}</div>
    </div>
  );
};

export default Participants;
