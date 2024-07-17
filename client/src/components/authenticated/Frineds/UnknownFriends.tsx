import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useaddfirend from "../../../hooks/useaddfirend";
import useGetallunknownfrinedhook from "../../../hooks/useGetallunknowfrinedhook";

type dataTypes = {
  id: number;
  Name: string;
  PhotoUrl: string;
};
const UnknownFriends: React.FC = () => {
  const unknownfriends = useSelector(
    (state: RootState) => state.Friend.unknowfriends
  );
  const { addfirned } = useaddfirend();
  const { gettheallunknownfriends } = useGetallunknownfrinedhook();

  const addthefriendrequest = async (data: dataTypes) => {
    let response = await addfirned(data);
    console.log(response);
  };

  useEffect(() => {
    gettheallunknownfriends();

    return () => {};
  }, []);
  return (
    <div>
      <p>Suggest friends</p>
      {unknownfriends.map((obj, index) => (
        <div key={index}>
          {obj?.PhotoUrl}
          <p>{obj?.Name}</p>
          <button
            onClick={() =>
              addthefriendrequest({
                id: obj.Id,
                Name: obj.Name,
                PhotoUrl: obj.PhotoUrl,
              })
            }
          >
            add
          </button>
        </div>
      ))}
    </div>
  );
};
export default UnknownFriends;
