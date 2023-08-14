import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.get("userInfo"))
  : { userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logOut: (state, action) => {},
  },
});

export const { setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
