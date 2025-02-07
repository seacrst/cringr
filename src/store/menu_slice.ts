import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";
interface MenuState {
  info: boolean
}
export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    info: false
  },
  reducers: {
    setInfo(state, action: PayloadAction<boolean>) {
      state.info = action.payload
    }
  }
});

export const selectMenu: Select<MenuState> = (state) => state.menu;

export const {setInfo} = menuSlice.actions;