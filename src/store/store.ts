import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user_slice";
import { postSlice, postsSlice } from "./post_slice";
import { modalSlice } from "./modal_slice";
import { messageSlice } from "./message_slice";


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    post: postSlice.reducer,
    modal: modalSlice.reducer,
    message: messageSlice.reducer
  }
});

type Store = ReturnType<typeof store.getState>;

export type Select<S> = (state: Store) => S;