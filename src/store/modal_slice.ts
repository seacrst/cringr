import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";

interface ModalState {
  open: boolean,
  title: string,
  message: string
}

const initialState: ModalState = {
  open: false,
  title: "",
  message: ""
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setNotfication(state, action: PayloadAction<{title: string, message: string}>) {
      state.message = action.payload.message
      state.title = action.payload.title
    }
  }
});

export const selectModal: Select<ModalState> = (state) => state.modal;

export const {setOpen, setNotfication} = modalSlice.actions;