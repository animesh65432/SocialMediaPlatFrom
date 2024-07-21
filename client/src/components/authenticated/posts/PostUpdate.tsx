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
    <div className="p-4 bg-gray-50 rounded-lg mt-4">
      <form onSubmit={handleSubmit(onSubmitthefrom)} className="space-y-4">
        <label htmlFor="images" className="block text-sm font-medium">
          Images
        </label>
        <input
          type="file"
          id="images"
          {...register("images")}
          className="block w-full text-sm"
        />

        <label htmlFor="videos" className="block text-sm font-medium">
          Videos
        </label>
        <input
          type="file"
          id="videos"
          {...register("videos")}
          className="block w-full text-sm"
        />

        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          className="block w-full text-sm"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default PostUpdate;
