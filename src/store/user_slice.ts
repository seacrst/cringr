import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";

interface User {
  user: {
    chaos: number,
    credits: number,
    likes: number,
    followers: number
  }
}
const initialState: User = {
  user: {
    chaos: 0,
    credits: 100,
    likes: 5,
    followers: 0
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
      state.user.likes -= 1
    },
    increaseChaos(state, action: PayloadAction<number>) {
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
    },
    decreaseChaos(state, action: PayloadAction<number>) {
      if ((state.user.chaos - action.payload) > 100) {
        state.user.chaos = 100;
        return state
      }

      if ((state.user.chaos - action.payload) < 0) {
        state.user.chaos = 0;
        return state
      }

      state.user = {
        ...state.user,
        chaos: state.user.chaos - action.payload
      }
    },
    increaseCredits(state, action: PayloadAction<number>) {
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
    },
    decreaseCredits(state, action: PayloadAction<number>) {
      if ((state.user.credits - action.payload) > 100) {
        state.user.credits = 100;
        return state
      }

      if ((state.user.credits - action.payload) < 0) {
        state.user.credits = 0;
        return state
      }

      state.user = {
        ...state.user,
        credits: state.user.credits - action.payload
      }
    }
  }
});

export const selectUser: Select<User> = (state) => state.user;

export const { increaseChaos, decreaseChaos, increaseCredits, decreaseCredits, increaseLikes, decreaseLikes } = userSlice.actions;