import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";
import { LIKES } from "src/lib";

interface User {
  user: {
    chaos: number,
    credits: number,
    likes: number,
    followers: number,
    streak: number,
    fails: number
  },
  page: {
    shuffle: boolean
  }
}
const initialState: User = {
  user: {
    chaos: 0,
    credits: 100,
    likes: LIKES,
    fails: parseInt(sessionStorage.getItem("fails") ?? "0"),
    followers: parseInt(sessionStorage.getItem("followers") ?? "0"),
    streak: 0
  },
  page: {
    shuffle: false
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increaseLikes(state) {
      state.user.likes += 1
    },
    decreaseLikes(state) {
      if (state.user.likes - 1 <= 0) {
        state.user.likes = 0;
        return state;
      }
      
      state.user.likes -= 1
    },
    setDecreasedLikes(state, action: PayloadAction<number>) {
      if (state.user.likes - action.payload <= 0) {
        state.user.likes = 0;
        return state;
      }
      
      state.user.likes -= action.payload;
    },
    increaseLike(state, action: PayloadAction<number>) {
      state.user.likes =+ action.payload;
    },
    setChaos(state, action: PayloadAction<number>) {
      if ((state.user.chaos + action.payload) < 0) {
        state.user.chaos = 0;
        return state;
      }

      if ((state.user.chaos + action.payload) > 100) {
        state.user.chaos = 100;
        return state;
      }
      
      state.user = {
        ...state.user,
        chaos: state.user.chaos + action.payload,
      }

      return state;
    },
    setShuffled(state, action: PayloadAction<boolean>) {
      state.page.shuffle = action.payload;
    },
    setCredits(state, action: PayloadAction<number>) {
      if ((state.user.credits + action.payload) < 0) {
        state.user.credits = 0;
        return state;
      }

      if ((state.user.credits + action.payload) > 100) {
        state.user.credits = 100;
        return state;
      }

      state.user = {
        ...state.user,
        credits: state.user.credits + action.payload,
      }

      return state;
    },
    addFail(state) {
      state.user.fails += 1;
    },
    setFails(state, action: PayloadAction<number>) {
      state.user.fails = action.payload;
    },
    setInitialUser(state) {
      const followers = state.user.followers;
      const fails = state.user.fails;
      state.user = { ...initialState.user, followers, fails };
      state.page = initialState.page;
    },
    setFollowers(state, action: PayloadAction<number>) {
      state.user.followers += action.payload;
    },
    resetFollowers(state) {
      state.user.followers = 0;
    },
    setStreak(state, action: PayloadAction<number>) {
      state.user.streak += action.payload;
    },
    resetStreak(state) {
      state.user.streak = 0;
    }
  }
});

export const selectUser: Select<User> = (state) => state.user;

export const {
  increaseLikes, 
  decreaseLikes,
  setDecreasedLikes,
  setChaos,
  setCredits,
  setInitialUser,
  setShuffled,
  increaseLike,
  setFollowers,
  setStreak,
  resetStreak,
  resetFollowers,
  setFails,
  addFail
} = userSlice.actions;