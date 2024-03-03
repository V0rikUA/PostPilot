import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/AuthenticationSlice";
import userSlice from "../feature/UserSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: "dashSlice",
    user: userSlice,
  },
});

export default store;
