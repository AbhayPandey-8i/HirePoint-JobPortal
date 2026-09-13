import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      isAuthenticated: true;
    },

    logout: (state) => {
      state.user = null;
      isAuthenticated: false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
