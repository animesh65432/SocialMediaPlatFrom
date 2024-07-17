import React from "react";
import PostFrom from "./authenticated/posts/PostFrom";
import Post from "./authenticated/posts/Post";

const Home: React.FC = () => {
  return (
    <div>
      <PostFrom />
      <Post />
    </div>
  );
};

export default Home;
