import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { usePosthook } from "../../../hooks/customhooks";
import { PhotoCamera, Videocam } from "@mui/icons-material";
import { IconButton, CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button"

type PostsTypes = {
  images: string;
  videos: string;
  title: string;
};

const PostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostsTypes>();
  const { createnewpost, loading } = usePosthook();
  const [imagespreview, setimagespreview] = useState<string | null>(null)
  const [videospreview, setvideopreview] = useState<string | null>(null)

  const onSubmit = async (data: PostsTypes) => {
    if (!imagespreview && !videospreview && data.title.length === 0) {
      toast.error("Please select at least one image or video");
      return;
    }

    try {
      if (imagespreview) {
        await createnewpost({ ...data, img: imagespreview })

      } else if (videospreview) {
        await createnewpost({ ...data, video: videospreview })

      }
      setimagespreview(null)
      setvideopreview(null)
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again later.");
    }
  };

  const handleFileChange = (type: 'image' | 'video') => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          if (type === 'image') {
            setimagespreview(reader.result);
            setvideopreview(null)
          } else {
            console.log(reader.result)
            setvideopreview(reader.result)
            setimagespreview(null)
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  console.log(videospreview)
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
            onChange={handleFileChange("image")}
          />
          <input
            type="file"
            id="videos"
            {...register("videos")}
            style={{ display: "none" }}
            accept="video/*"
            onChange={handleFileChange("video")}
          />
          <div>
            {imagespreview && <img src={imagespreview} className="w-40 h-40" />}
            {videospreview && <video src={videospreview} controls className="w-40 h-40" />}
          </div>

          <div className="flex space-x-2 mb-2 sm:mb-0">
            <IconButton
              color="inherit"
              onClick={() => document.getElementById("images")?.click()}
              aria-label="Upload Image"
            >
              <PhotoCamera />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => document.getElementById("videos")?.click()}
              aria-label="Upload Video"
            >
              <Videocam />
            </IconButton>
          </div>

          {!loading && <Button type="submit" disabled={loading}>Post</Button>}
          {loading && <CircularProgress />}
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default PostForm;
