import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { submitNewUser } from "./AuthenticationSlice";

const initialState = {
  name: "",
  email: "",
  connectedSM: {
    instagram: { connected: false },
    x: { connected: false },
    facebook: { connected: false },
    youtube: { connected: false },
    tiktok: { connected: false },
  },
  posts: [],
  folowers: 0,
  accountID: 0,
};

const addUserData = (state, { name, email, connectedSM }) => {
  state.name = name;
  state.email = email;

  for (let socialMedia in connectedSM) {
    state.connectedSM = {
      ...state.connectedSM,
      [`${socialMedia}`]: connectedSM[`${socialMedia}`],
    };
  }
};

export const getUserData = createAsyncThunk("user/getData", async () => {
  const userData = await api
    .getUserInfo()
    .then((data) => {
      return data;
    })
    .catch(() => {
      return Promise.reject("Cannot get user data");
    });

  if (userData.connectedSM.instagram) {
    userData.connectedSM.instagram = await api
      .getposts()
      .then((data) => {
        data.connected = true;
        return data;
      })
      .catch(() => {
        return Promise.reject("Cannot get user posts");
      });
  }

  return { userData };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      addUserData(state, action.payload.userData);
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(submitNewUser.fulfilled, (state, action) => {
      addUserData(state, action.payload);
    });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
