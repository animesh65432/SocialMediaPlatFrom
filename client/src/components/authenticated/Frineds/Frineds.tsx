import React from "react";
import UnknownFriends from "./UnknownFriends";
import Friend from "./Friend";

const Frineds: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Friends</h2>
          <Friend />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Suggest Friends</h2>
          <UnknownFriends />
        </div>
      </div>
    </div>
  );
};

export default Frineds;
