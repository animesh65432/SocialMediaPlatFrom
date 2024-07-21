import React, { useEffect, useState } from "react";
import useGetThepost from "../../../hooks/useGetThepost";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useDeleteThePost from "../../../hooks/useDeleteThePost";
import useUpatePost from "../../../hooks/useUpatePost";
import PostUpdate from "./PostUpdate";
import { Avatar, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { format } from "date-fns";

const Post: React.FC = () => {
  const { getposts } = useGetThepost();
  const posts = useSelector((state: RootState) => state.posts.value);
  const { deletethepost } = useDeleteThePost();
  const { updatethepost } = useUpatePost();
  const [showupdate, setshowupdate] = useState<number | null>(null);

  const fecthallthedata = async () => {
    try {
      await getposts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthallthedata();
  }, []);

  if (posts.length === 0) {
    return <div>There are no posts</div>;
  }

  const formatDate = (dateString: string | undefined) => {
    return format(new Date(dateString || ""), "PPPpp");
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg p-4 space-y-4 max-w-xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <Avatar src={post?.userPhotoUrl} alt="User Profile" />
            <div>
              <p className="font-bold">{post?.userName}</p>
              <p className="text-sm text-gray-500">
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {post?.img && (
              <img
                src={post?.img}
                alt="Post"
                className="w-full rounded-md object-cover"
              />
            )}
            {post?.video && (
              <video src={post?.video} controls className="w-full rounded-md" />
            )}
            <p>{post?.title}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <IconButton onClick={() => setshowupdate(post.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deletethepost({ id: post.id })}>
                <DeleteIcon />
              </IconButton>
            </div>
            {showupdate === post.id && (
              <PostUpdate updatethepostmethod={updatethepost} id={post.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
