import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

type updatePostpayloadtypes = {
  id: number;
  img?: FileList;
  video?: FileList;
  title: string;
};

type props = {
  updatethepostmethod: (data: updatePostpayloadtypes) => {};
  id: number;
};

type PostsTypes = {
  images?: FileList;
  videos?: FileList;
  title: string;
};

const PostUpdate: React.FC<props> = ({ updatethepostmethod, id }) => {
  const { register, handleSubmit } = useForm<PostsTypes>();

  const onSubmitthefrom = (data: PostsTypes) => {
    if (data.videos?.length === 0 && data.images?.length === 0) {
      toast.error("Please select at least one file");
    } else {
      if (data.images) {
        updatethepostmethod({ id: id, img: data.images, title: data.title });
      } else {
        updatethepostmethod({ id, video: data.videos, title: data.title });
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4 mx-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
      <form onSubmit={handleSubmit(onSubmitthefrom)} className="space-y-4">
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            {...register("images")}
            className="block w-full text-sm mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="videos"
            className="block text-sm font-medium text-gray-700"
          >
            Videos
          </label>
          <input
            type="file"
            id="videos"
            {...register("videos")}
            className="block w-full text-sm mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="block w-full text-sm mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mt-4 py-2"
        >
          Update
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default PostUpdate;
