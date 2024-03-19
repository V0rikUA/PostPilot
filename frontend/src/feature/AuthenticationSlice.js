import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, userSignIn } from "../utils/auth";
import api from "../utils/api";
import { checkUserToken } from "../utils/auth";

const initialState = {
  isLoggedIn: false,
};

export const signIn = createAsyncThunk(
  "user/signin",
  async (userCredentials) => {
    const response = await userSignIn(userCredentials)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setUserToken(data.token);
        return data;
      })
      .catch((err) => {
        return Promise.reject("Incorrect email or password\n" + err.message);
      });
    return response;
  }
);

export const submitNewUser = createAsyncThunk(
  "user/signup",
  async ({ email, password, setNavigate }) => {
    const responce = await register(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setUserToken(data.token);
        return data;
      })
      .catch((err) => {
        return Promise.reject(
          "There was a problem while registering new user\n" + err
        );
      });

    return responce;
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
    resetPassword: (state, payload) => {
      /* TODO! */
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoggedIn = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      console.error(action.error.message);
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(submitNewUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(submitNewUser.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const { setIsLoggedIn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
