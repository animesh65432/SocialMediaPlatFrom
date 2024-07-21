import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useaddfirend from "../../../hooks/useaddfirend";
import useGetallunknownfrinedhook from "../../../hooks/useGetallunknowfrinedhook";
import { IconButton, Avatar, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Suggested Friends</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {unknownfriends.map((obj, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          >
            <Avatar src={obj?.PhotoUrl} alt={obj?.Name} className="mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">{obj?.Name}</p>
            </div>
            <IconButton
              color="primary"
              onClick={() =>
                addthefriendrequest({
                  id: obj.Id,
                  Name: obj.Name,
                  PhotoUrl: obj.PhotoUrl,
                })
              }
            >
              <PersonAddIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnknownFriends;
