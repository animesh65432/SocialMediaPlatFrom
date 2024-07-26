import React from "react";
import { useParams } from "react-router-dom";
const Roomid: React.FC = () => {
  let { roomid } = useParams();
  return <div>Roomid</div>;
};

export default Roomid;
