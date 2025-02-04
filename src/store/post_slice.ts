import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "src/parts";
import { Select } from "./store";
import { genPoints, genSlice, posts2 } from "src/lib";
import { rangeInc } from "derive-rust";

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

const rng = rangeInc(1, posts2.length)

const evalPost = genPoints(rng.map((id, i) => {
  posts2[i].chaos = {
    value: NaN,
  };
  posts2[i].credits = {
    value: NaN
  };
  posts2[i].id = id;
  return posts2[i] as Post;
}));

console.log(evalPost)

const initialState: PostState = {
  shuffle: genSlice(evalPost, 0),
  posts: evalPost
}

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    shuffle(state, action: PayloadAction<number>) {
      state.shuffle = genSlice(genPoints(state.posts), action.payload)
      return state;
    }
  }
});

export const selectPost: Select<{currentId: number}> = (state) => state.post.post;
export const selectPosts: Select<PostState> = (state) => state.posts;

export const {setCurrentId} = postSlice.actions;
export const {shuffle} = postsSlice.actions;