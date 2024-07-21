import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Post = {
  id: number;
  img?: string;
  title?: string;
  comment?: string;
  UserId?: number;
  video?: string;
  userPhotoUrl?: string;
  userName?: string;
  createdAt?: string;
};

type PostsState = {
  value: Post[];
};

const initialState: PostsState = {
  value: [],
};

const PostSlices = createSlice({
  name: "post",
  initialState,
  reducers: {
    GetallTheposts: (state, action: PayloadAction<Post[]>) => {
      state.value = action.payload;
    },
    delethepostfromreducer: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.value = state.value.filter((post) => post.id !== id);
    },
    createthepost: (state, action: PayloadAction<Post>) => {
      state.value.push(action.payload);
    },
    createcomment: (
      state,
      action: PayloadAction<{ id: number; comment: string }>
    ) => {
      const { id, comment } = action.payload;
      state.value = state.value.map((post) =>
        post.id === id ? { ...post, comment } : post
      );
    },
  },
});

export const {
  createcomment,
  createthepost,
  delethepostfromreducer,
  GetallTheposts,
} = PostSlices.actions;
export default PostSlices.reducer;
