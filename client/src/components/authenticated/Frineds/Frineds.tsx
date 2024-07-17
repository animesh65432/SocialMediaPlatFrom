import React from "react";
import UnknownFriends from "./UnknownFriends";
import Friend from "./Friend";
const Frineds: React.FC = () => {
  return (
    <div>
      <Friend />
      <UnknownFriends />
    </div>
  );
};

export default Frineds;
