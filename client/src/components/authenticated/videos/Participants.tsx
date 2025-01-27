import React from "react";
import { Avatar } from "@mui/material"

type props = {
  name: string;
  Photourl: string;
};

const Participants: React.FC<props> = ({ name, Photourl }) => {
  console.log(Photourl)
  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg w-full max-w-xs">
      <div >
        {
          Photourl ? <Avatar src={Photourl} alt="User Profile" /> : <>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-10 h-10 rounded-lg" /></>
        }
      </div>
      <div className="text-lg font-medium text-gray-700">{name}</div>
    </div>
  );
};

export default Participants;
