import React, { useEffect, useState } from "react";
import useGetThepost from "../../../hooks/useGetThepost";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useDeleteThePost from "../../../hooks/useDeleteThePost";
import useUpatePost from "../../../hooks/useUpatePost";
import PostUpdate from "./PostUpdate";

const Post: React.FC = () => {
  const { getposts } = useGetThepost();
  const posts = useSelector((state: RootState) => state.posts.value);
  const { deletethepost } = useDeleteThePost();
  const { updatethepost } = useUpatePost();
  const [showupdate, setshowupdate] = useState<boolean>(false);

  const fecthallthedata = async () => {
    try {
      let reponse = await getposts();
      console.log(reponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthallthedata();
  }, []);

  if (posts.length === 0) {
    return <div>there is no post</div>;
  }
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <img src={post?.img} />
          <video src={post?.video}></video>
          <p>{post?.title}</p>
          <button>update</button>
          <button onClick={() => deletethepost({ id: post.id })}>delete</button>
          <button onClick={() => setshowupdate((prev) => !prev)}>update</button>
          {showupdate && (
            <PostUpdate updatethepostmethod={updatethepost} id={post.id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;
