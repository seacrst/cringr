import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";

interface NotificationState {
  type: "victory" | "failure" | "comment" | "info" | "bonus" | "",
  open: boolean,
  title: string,
  message: string
}

const initialState: NotificationState = {
  type: "",
  open: false,
  title: "",
  message: ""
}

export const notificationSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeNotificationModal(state) {
      state.open = false;
    },
    setNotfication(state, action: PayloadAction<NotificationState>) {
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.open = action.payload.open;
    },
    setInitialNotification(state) {
      state.message = initialState.message;
      state.title = initialState.title;
      state.open = initialState.open;
      state.type = initialState.type;
    }
  }
});

export const selectModal: Select<NotificationState> = (state) => state.notification;

export const {
  setInitialNotification, 
  setNotfication, 
  closeNotificationModal
} = notificationSlice.actions;