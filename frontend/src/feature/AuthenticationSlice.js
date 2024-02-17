import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, userSignIn } from "../utils/auth";
import api from "../utils/api";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  userInfo: {},
};

export const signIn = createAsyncThunk(
  "user/singin",
  async (userCredentials) => {
    userSignIn(userCredentials).then((data) => {
      localStorage.setItem("jwt", data.token);
    });
    const userInfo = await api.init().then((data) => {
      return data;
    });
    return userInfo;
  }
);

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    submitNewUser: (state, action) => {
      const { email, password } = action.payload;
      register(email, password).catch(console.log);
    },
    resetPassword: (state, payload) => {
      /* TODO! */
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const { submitNewUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
