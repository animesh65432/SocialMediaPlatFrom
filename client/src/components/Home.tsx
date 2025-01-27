import React from "react";
import PostForm from "./authenticated/posts/PostFrom";
import Post from "./authenticated/posts/Post";

const Home: React.FC = () => {
  return (
    <div className=" p-6 bg-gray-100 h-[90vh] overflow-x-auto">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <PostForm />
        </div>
        <div>
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Home;
