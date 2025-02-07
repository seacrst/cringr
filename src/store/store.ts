import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user_slice";
import { postSlice, postsSlice } from "./post_slice";
import { notificationSlice } from "./notification_slice";
import { messageSlice } from "./message_slice";
import { menuSlice } from "./menu_slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    post: postSlice.reducer,
    message: messageSlice.reducer,
    notification: notificationSlice.reducer,
    menu: menuSlice.reducer
  }
});

type Store = ReturnType<typeof store.getState>;

export type Select<S> = (state: Store) => S;