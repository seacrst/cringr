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
    increaseChaos(state, action: PayloadAction<number>) {

      if (state.user.chaos === 100) {
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
    }
  }
});

export const selectUser: Select<User> = (state) => state.user;

export const { increaseChaos } = userSlice.actions;