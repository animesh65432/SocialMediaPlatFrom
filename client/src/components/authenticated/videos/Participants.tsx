import React from "react";

type props = {
  name: string;
  Photourl: string;
};

const Participants: React.FC<props> = ({ name, Photourl }) => {
  return (
    <div>
      <div>
        <img src={Photourl} />
        {name}
      </div>
    </div>
  );
};

export default Participants;
