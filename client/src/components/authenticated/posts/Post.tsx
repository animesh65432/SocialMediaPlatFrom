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

  const fetchAllTheData = async () => {
    try {
      await getposts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTheData();
  }, []);

  if (posts.length === 0) {
    return <div className="text-center text-gray-500">There are no posts</div>;
  }

  const formatDate = (dateString: string | undefined) => {
    return format(new Date(dateString || ""), "PPPpp");
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-full md:max-w-3xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <Avatar src={post?.userPhotoUrl} alt="User Profile" />
            <div>
              <p className="font-semibold text-lg">{post?.userName}</p>
              <p className="text-sm text-gray-600">
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {post?.img && (
              <img
                src={post?.img}
                alt="Post"
                className="w-full rounded-md object-cover max-h-80"
              />
            )}
            {post?.video && (
              <video
                src={post?.video}
                controls
                className="w-full rounded-md max-h-80"
              />
            )}
            <p className="text-gray-700">{post?.title}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-2">
              <IconButton
                onClick={() => setshowupdate(post.id)}
                aria-label="Edit Post"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deletethepost({ id: post.id })}
                aria-label="Delete Post"
              >
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
