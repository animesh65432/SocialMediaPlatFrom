import React, { useEffect } from "react";
import useGetThepost from "../../../hooks/useGetThepost";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useDeleteThePost from "../../../hooks/useDeleteThePost";
import useUpatePost from "../../../hooks/useUpatePost";
import PostUpdate from "./PostUpdate";
import { Avatar, IconButton, CircularProgress } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSeetheUser } from "@/hooks/customhooks"
import { useNavigate } from "react-router-dom"

const Post: React.FC = () => {
  const { getposts } = useGetThepost();
  const posts = useSelector((state: RootState) => state.posts.value);
  const { deletethepost } = useDeleteThePost();
  const { updatethepost } = useUpatePost();
  const [loading, see_the_other_peoples] = useSeetheUser()
  const navigate = useNavigate()


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

  const handle_see_the_other_peoples = async (userId: number) => {
    see_the_other_peoples(userId)
    navigate(`/Profile`)
  }

  if (loading) {
    return <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-full md:max-w-3xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <div onClick={() => handle_see_the_other_peoples(post.User.Id)}>
              {
                post.User.PhotoUrl ? <Avatar src={post?.User.PhotoUrl} alt="User Profile" /> : <>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-10 h-10 rounded-lg" /></>
              }
            </div>
            <div>
              <p className="font-semibold text-lg">{post?.User.Name}</p>
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
              <Popover>
                <PopoverTrigger asChild>
                  <IconButton aria-label="Edit Post">
                    <EditIcon />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-md p-4">
                  <PostUpdate
                    updatethepostmethod={updatethepost}
                    id={post.id}
                  />
                </PopoverContent>
              </Popover>
              <IconButton
                onClick={() => deletethepost({ id: post.id })}
                aria-label="Delete Post"
              >
                <DeleteIcon />
              </IconButton>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;