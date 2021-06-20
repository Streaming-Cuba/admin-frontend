import { createSlice } from "@reduxjs/toolkit";
import CookieManager from "../../apis/cookies";
import Account from '../../types/Account'

type SliceState = {
  token: string | null;
  isAuthenticated: boolean;
  account: Account | null;
  messages: any[];
  notifications: any[];
};

// First approach: define the initial state using that type
const initialState: SliceState = {
  token: CookieManager.getToken(),
  isAuthenticated: false,
  account: null,
  messages: [
    {
      id: 0,
      variant: "warning",
      name: "Jane Hew",
      message: "Hey! How is it going?",
      time: "9:32",
    },
    {
      id: 1,
      variant: "success",
      name: "Lloyd Brown",
      message: "Check out my new Dashboard",
      time: "9:18",
    },
    {
      id: 2,
      variant: "primary",
      name: "Mark Winstein",
      message: "I want rearrange the appointment",
      time: "9:15",
    },
    {
      id: 3,
      variant: "secondary",
      name: "Liana Dutti",
      message: "Good news from sale department",
      time: "9:09",
    },
  ],
  notifications: [
    { id: 0, color: "warning", message: "Check out this awesome ticket" },
    {
      id: 1,
      color: "success",
      type: "info",
      message: "What is the best way to get ...",
    },
    {
      id: 2,
      color: "secondary",
      type: "notification",
      message: "This is just a simple notification",
    },
    {
      id: 3,
      color: "primary",
      type: "e-commerce",
      message: "12 new orders has arrived today",
    },
  ],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccount: (state, actions) => {
      state.account = actions.payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      CookieManager.clearAll();
      state.isAuthenticated = false;
      state.token = null;
      state.account = null;      
    }
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setAccount, signOut } = authSlice.actions;

export default authSlice.reducer;
