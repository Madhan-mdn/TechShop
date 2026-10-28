import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthModalOpen: false,
  authMode: "login", // "login" | "signup"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      state.authMode = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, setAuthMode } = authSlice.actions;
export default authSlice.reducer;
