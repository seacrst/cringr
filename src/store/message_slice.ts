import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";

interface MessageState {
  message: string,
  visible: boolean,
  color: "red" | "green",
  id: number
}

const initialState: MessageState = {
  message: "",
  visible: false,
  color: "red",
  id: 0
}

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<[string, "red" | "green"]>) {
      state.message = action.payload[0];
      state.color = action.payload[1];
    },
    setVisibility(state, action: PayloadAction<[boolean, number]>) {
      state.visible = action.payload[0];
      state.id = action.payload[1];
    }
  }
});

export const selectMessage: Select<MessageState> = (state) => state.message;

export const {setMessage, setVisibility} = messageSlice.actions;