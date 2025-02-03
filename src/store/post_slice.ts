import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "src/parts";
import { Select } from "./store";
import { genSlice, posts } from "src/lib2";

interface PostState {
  posts: Post[],
  shuffle: Post[]
}

export const postSlice = createSlice({
  name: "one post",
  initialState: {
    post: {
      currentId: 0
    }
  },
  reducers: {
    setCurrentId(state, action: PayloadAction<number>) {
      state.post.currentId = action.payload;
    }
  }
})

const initialState: PostState = {
  shuffle: genSlice(posts),
  posts: posts
}

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    shuffle(state) {
      state.shuffle = genSlice(posts)
    }
  }
});

export const selectPost: Select<{currentId: number}> = (state) => state.post.post;
export const selectGenPostSlice: Select<Post[]> = (state) => state.posts.posts;

export const {setCurrentId} = postSlice.actions;
export const {shuffle} = postsSlice.actions;