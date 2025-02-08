import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Select } from "./store";
interface MenuState {
  info: boolean,
  repostInfo: boolean,
  profile: boolean,
}
export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    info: false,
    repostInfo: false,
    profile: false
  },
  reducers: {
    setInfo(state, action: PayloadAction<boolean>) {
      state.info = action.payload
    },
    setRepostInfo(state, action: PayloadAction<boolean>) {
      state.repostInfo = action.payload;
    },
    setProfile(state, action: PayloadAction<boolean>) {
      state.profile = action.payload;
    }
  }
});

export const selectMenu: Select<MenuState> = (state) => state.menu;

export const {setInfo, setRepostInfo, setProfile} = menuSlice.actions;