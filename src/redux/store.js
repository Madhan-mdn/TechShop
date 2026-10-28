import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import searchReducer from "./searchSlice.js";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export default store;
