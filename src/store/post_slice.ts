import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "src/parts";
import { Select } from "./store";
import { genPoints, genSlice, posts2 } from "src/lib";
import { rangeInc } from "derive-rust";

interface PostsState {
  posts: Post[],
  shuffle: Post[],
  reposted: Post[],
}

interface PostState {
  post: {
    currentId: number,
    repostIds: Array<number>,
    commentsIds: Array<number>,
    postId: number,
    liked: number,
    likedIds: number[],
  },
  credits: {
    loseHint: boolean
  }
}

const initialPostState: PostState = {
  post: {
    currentId: 0,
    repostIds: [],
    commentsIds: [],
    postId: 0,
    liked: 0,
    likedIds: []
  },
  credits: {
    loseHint: false
  }
}

export const postSlice = createSlice({
  name: "one post",
  initialState: initialPostState,
  reducers: {
    setCurrentId(state, action: PayloadAction<number>) {
      state.post.currentId = action.payload;
    },
    setCredLoseHint(state, action: PayloadAction<boolean>) {
      state.credits.loseHint = action.payload;
    },
    setPostId(state, action: PayloadAction<number>) {
      state.post.postId = action.payload;
    },
    setRepostId(state, action: PayloadAction<Array<number>>) {
      state.post.repostIds = [...state.post.repostIds, ...action.payload];
    },
    addLikedIds(state, action: PayloadAction<Array<number>>) {
      state.post.likedIds = [...state.post.likedIds, ...action.payload];
    },
    setLikedIds(state, action: PayloadAction<Array<number>>) {
      state.post.likedIds = action.payload;
    },
    resetRepostedId(state) {
      state.post.repostIds = [];
    },
    setLikedId(state, action: PayloadAction<number>) {
      state.post.liked = action.payload;
    },
    setCommented(state, action: PayloadAction<Array<number>>) {
      state.post.commentsIds = [...state.post.commentsIds, ...action.payload];
    },
    resetCommented(state) {
      state.post.commentsIds = [];
    },
    setInitialPost(state) {
      state.credits = {
        loseHint: false
      };

      state.post = {
        currentId: 0,
        repostIds: [],
        commentsIds: [],
        postId: 0,
        liked: 0,
        likedIds: []
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
  posts2[i].reposted = false;
  return posts2[i] as Post;
}));

const newPosts = evalPosts();

const initialState: PostsState = {
  shuffle: genSlice(newPosts, 0),
  posts: newPosts,
  reposted: []
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    shuffle(state, action: PayloadAction<[number, number[]]>) {
      state.reposted = [];
      state.shuffle = genSlice(genPoints(state.posts), action.payload[0]);
      const reposted = state.shuffle.filter(post => action.payload[1].includes(post.id));
      
      if (reposted.length > 0) {
        state.shuffle = [
          ...state.shuffle.filter(post => !action.payload[1].includes(post.id)), 
          ...reposted.map(post => ({ ...post, reposted: true }))
        ];
      }

      if (action.payload[1].length > 0) {
        const uniqueIds = action.payload[1].filter(id => !state.shuffle.find(post => post.id === id));

        state.reposted = evalPosts()
          .filter(post => uniqueIds.includes(post.id))
          .map(post => {
            post.reposted = true;
            return post;
          });
      }
      return state;
    },
    setReposted(state, action: PayloadAction<Array<number>>) {
      state.reposted = evalPosts()
        .filter(post => action.payload.includes(post.id))
        .map(post => {
          post.reposted = true;
          return post;
        });
    },
    setInitialPosts(state) {
      const newPosts = evalPosts();
      state.shuffle = genSlice(newPosts, 0);
      state.posts = newPosts;
      state.reposted = [];
    }
  }
});

export const selectPost: Select<PostState> = (state) => state.post;
export const selectCreditsHints: Select<{loseHint: boolean}> = (state) => state.post.credits;
export const selectPosts: Select<PostsState> = (state) => state.posts;

export const {
  setCurrentId, 
  setCredLoseHint, 
  setInitialPost, 
  setPostId, 
  setCommented,
  resetCommented,
  setRepostId,
  resetRepostedId,
  setLikedId,
  addLikedIds,
  setLikedIds
} = postSlice.actions;

export const {shuffle, setInitialPosts, setReposted} = postsSlice.actions;