import React from "react";
import { Avatar } from "@mui/material"

type props = {
  name: string;
  Photourl: string;
};

const Participants: React.FC<props> = ({ name, Photourl }) => {
  return (
    <>
      <div >
        {
          Photourl ? <Avatar src={Photourl} alt="User Profile" /> : <>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-10 h-10 rounded-lg" /></>
        }
      </div>
      <div className="">{name}</div>
    </ >
  );
};

export default Participants;
