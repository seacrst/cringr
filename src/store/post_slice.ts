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
    },
    credits: {
      loseHint: false
    }
  },
  reducers: {
    setCurrentId(state, action: PayloadAction<number>) {
      state.post.currentId = action.payload;
    },
    setCredLoseHint(state, action: PayloadAction<boolean>) {
      state.credits.loseHint = action.payload;
    },
    setInitialPost(state) {
      state.credits = {
        loseHint: false
      };

      state.post = {
        currentId: 0
      };
    }
  }
});

const rng = rangeInc(1, posts2.length);

export const evalPosts = () => genPoints(rng.map((id, i) => {
  posts2[i].chaos = {
    value: NaN,
  };
  posts2[i].credits = {
    value: NaN
  };
  posts2[i].id = id;
  return posts2[i] as Post;
}));

const newPosts = evalPosts();

const initialState: PostState = {
  shuffle: genSlice(newPosts, 0),
  posts: newPosts
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    shuffle(state, action: PayloadAction<number>) {
      state.shuffle = genSlice(genPoints(state.posts), action.payload)
      return state;
    },
    setInitialPosts(state) {
      const newPosts = evalPosts();
      state.shuffle = genSlice(newPosts, 0);
      state.posts = newPosts;
    }
  }
});

export const selectPost: Select<{currentId: number}> = (state) => state.post.post;
export const selectCreditsHints: Select<{loseHint: boolean}> = (state) => state.post.credits;
export const selectPosts: Select<PostState> = (state) => state.posts;

export const {setCurrentId, setCredLoseHint, setInitialPost} = postSlice.actions;
export const {shuffle, setInitialPosts} = postsSlice.actions;