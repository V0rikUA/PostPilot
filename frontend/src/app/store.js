import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/AuthenticationSlice";
import userSlice from "../feature/UserSlice";
import InsigtsSlice from "../feature/InsigtsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: "dashSlice",
    user: userSlice,
    insights: InsigtsSlice,
  },
});

export default store;
