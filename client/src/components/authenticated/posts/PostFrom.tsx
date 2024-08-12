import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { usePosthook } from "../../../hooks/customhooks";
import { PhotoCamera, Videocam } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type PostsTypes = {
  images: FileList;
  videos: FileList;
  title: string;
};

const PostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostsTypes>();
  const { createnewpost, loading } = usePosthook();

  const onSubmit = async (data: PostsTypes) => {
    if (data.images?.length === 0 && data.videos.length === 0) {
      toast.error("Please select at least one image or video");
      return;
    }

    try {
      if (data.images) {
        await createnewpost({
          title: data.title,
          img: data.images,
        });
      } else {
        await createnewpost({
          title: data.title,
          video: data.videos,
        });
      }
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again later.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 mx-auto bg-white rounded-lg shadow-md mt-4 w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
      >
        <textarea
          id="title"
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2 resize-none"
          rows={4}
          {...register("title", { required: "Please enter a title" })}
        />
        {errors.title && (
          <span className="text-sm text-red-500">{errors.title.message}</span>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <input
            type="file"
            id="images"
            {...register("images")}
            style={{ display: "none" }}
            accept="image/*"
          />
          <input
            type="file"
            id="videos"
            {...register("videos")}
            style={{ display: "none" }}
            accept="video/*"
          />

          <div className="flex space-x-2 mb-2 sm:mb-0">
            <IconButton
              color="primary"
              onClick={() => document.getElementById("images")?.click()}
              aria-label="Upload Image"
            >
              <PhotoCamera />
            </IconButton>

            <IconButton
              color="primary"
              onClick={() => document.getElementById("videos")?.click()}
              aria-label="Upload Video"
            >
              <Videocam />
            </IconButton>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Post"}
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default PostForm;
