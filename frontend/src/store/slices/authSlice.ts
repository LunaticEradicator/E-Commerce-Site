import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : { userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    removeCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { registerCredentials, setCredentials, removeCredentials } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
