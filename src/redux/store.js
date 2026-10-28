import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import searchReducer from "./searchSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
