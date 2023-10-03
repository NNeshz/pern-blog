import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.js";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})