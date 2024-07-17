import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import usePosthook from "../../../hooks/usePosthook";

type PostsTypes = {
  images?: FileList;
  videos?: FileList;
  title: string;
};

const PostFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostsTypes>();
  const { createnewpost, loading, errorMessages } = usePosthook();

  const onSubmit = async (data: PostsTypes) => {
    if (!data.images && !data.videos) {
      toast.error("Please select at least one image or video");
    } else {
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
      } catch (error) {
        toast.error("Failed to create post. Please try again later.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="images">Images:</label>
        <input type="file" id="images" {...register("images")} />
        <label htmlFor="videos">Videos:</label>
        <input type="file" id="videos" {...register("videos")} />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          {...register("title", { required: "Please enter a title" })}
        />
        <span>{errors.title && errors.title.message}</span>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default PostFrom;
