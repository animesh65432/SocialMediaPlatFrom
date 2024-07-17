import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
      toast.error("please atleast select one");
    } else {
      if (data.images) {
        updatethepostmethod({ id: id, img: data.images, title: data.title });
      } else {
        updatethepostmethod({ id, video: data.videos, title: data.title });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitthefrom)}>
        <label htmlFor="images">Images</label>
        <input type="file" id="images" {...register("images")}></input>

        <label htmlFor="vidoes">Videos</label>
        <input type="file" id="videos" {...register("videos")}></input>

        <label htmlFor="title" id="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
        ></input>

        <button>update</button>
      </form>
      <Toaster />
    </div>
  );
};

export default PostUpdate;
