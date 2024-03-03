import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, userSignIn } from "../utils/auth";
import api from "../utils/api";

const initialState = {
  isLoggedIn: false,
};

export const signIn = createAsyncThunk(
  "user/singin",
  async (userCredentials) => {
    let response = false;
    userSignIn(userCredentials)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setUserToken(data.token);
        console.log("first");
        response = true;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
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
    setIsLoggedIn: (state, action) => {
      const { loggedIn } = action.payload;
      state.isLoggedIn = loggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload;
    });
  },
});

export const { submitNewUser, setIsLoggedIn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
