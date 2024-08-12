import React from "react";
import PostForm from "./authenticated/posts/PostFrom";
import Post from "./authenticated/posts/Post";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
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
