import React from "react";
import PostFrom from "./authenticated/posts/PostFrom";
import Post from "./authenticated/posts/Post";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <PostFrom />
        </div>
        <div>
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Home;
