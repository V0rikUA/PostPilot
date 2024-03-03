import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  name: "",
  email: "",
  connectedSM: {},
  posts: {},
};

export const getUserData = createAsyncThunk("user/getData", async () => {
  const userData = await api.getUserInfo();
  const userPosts = await api.getposts();

  return { userData, userPosts };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const { name, email, connectedSM } = action.payload.userData;
      const { posts } = action.payload.userPosts;

      state.name = name;
      state.email = email;
      state.connectedSM = connectedSM;
      state.posts = posts;
      console.log(state);
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
