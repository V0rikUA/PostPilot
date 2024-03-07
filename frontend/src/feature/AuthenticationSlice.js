import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, userSignIn } from "../utils/auth";
import api from "../utils/api";
import { checkUserToken } from "../utils/auth";

const initialState = {
  isLoggedIn: false,
};

export const signIn = createAsyncThunk(
  "user/singin",
  async (userCredentials) => {
    const response = await userSignIn(userCredentials)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        console.log(data.token);
        api.setUserToken(data.token);
        return true;
      })
      .catch((err) => {
        return Promise.reject("Incorrect email or password");
      });
    return response;
  }
);

export const checkToken = createAsyncThunk("user/checkToken", async () => {
  const jwt = localStorage.getItem("jwt");
  return await checkUserToken(jwt);
});

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
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      console.error(action.error.message);
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      return Error(action.error.message);
    });
  },
});

export const { submitNewUser, setIsLoggedIn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
