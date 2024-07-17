import React, { useEffect } from "react";
import useGetallfriend from "../../../hooks/useGetallfriend";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useDeletefriend from "../../../hooks/useDeletefriend";

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

    return () => {};
  }, []);

  return (
    <>
      <h3>Friends</h3>
      {Friends.length > 0 ? (
        Friends.map((obj) => (
          <div key={obj.Id}>
            <img src={obj?.PhotoUrl} />
            <p>{obj.Name}</p>
            <button
              onClick={() =>
                ondeletefriend({
                  id: obj.Id,
                  Name: obj.Name,
                  PhotoUrl: obj.PhotoUrl,
                })
              }
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div>
          <p>There is not Friends </p>
        </div>
      )}
    </>
  );
};
export default Friend;
