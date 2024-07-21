import React, { useEffect } from "react";
import useGetallfriend from "../../../hooks/useGetallfriend";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useDeletefriend from "../../../hooks/useDeletefriend";
import { IconButton, Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import io from "socket.io-client";

type data = {
  id: number;
  PhotoUrl: string;
  Name: string;
};

const Friend: React.FC = () => {
  const Friends = useSelector((state: RootState) => state.Friend.fiends);
  const { getfriends } = useGetallfriend();
  const { deletthefriend, deltelaoding } = useDeletefriend();

  const getallthefriends = async () => {
    await getfriends();
  };

  const ondeletefriend = (data: data) => {
    deletthefriend(data);
  };

  useEffect(() => {
    getallthefriends();
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Friends</h3>
      {Friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Friends.map((obj) => (
            <div
              key={obj.Id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md"
            >
              <Avatar src={obj?.PhotoUrl} alt={obj?.Name} className="mr-4" />
              <div className="flex-1">
                <p className="text-lg font-medium">{obj.Name}</p>
              </div>
              <IconButton
                color="secondary"
                onClick={() =>
                  ondeletefriend({
                    id: obj.Id,
                    Name: obj.Name,
                    PhotoUrl: obj.PhotoUrl,
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>There are no friends.</p>
        </div>
      )}
    </>
  );
};

export default Friend;
