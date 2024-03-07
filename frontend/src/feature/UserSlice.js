import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  name: "",
  email: "",
  connectedSM: {},
  posts: [],
  folowers: 0,
  accountID: 0,
};

export const getUserData = createAsyncThunk("user/getData", async () => {
  const userData = await api
    .getUserInfo()
    .then((data) => data)
    .catch((error) => {
      return Promise.reject("Cannot get user data");
    });

  const userInstagramData = await api
    .getposts()
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return Promise.reject("Cannot get user posts");
    });
  return { userData, userInstagramData };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const { name, email, connectedSM } = action.payload.userData;
      const userInstagramData = action.payload.userInstagramData;

      state.name = name;
      state.email = email;
      state.connectedSM = connectedSM;
      state.posts = userInstagramData.posts;
      state.connectedSM.instagram = userInstagramData.name;
      state.folowers = userInstagramData["followers_count"];
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
