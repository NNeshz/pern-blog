import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  errors: null,
  isAuth: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
    },
    signupSucces: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    signupFail: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.isAuth = false;
    },
    signinRequest: (state) => {
      state.isLoading = true;
    },
    signinSucces: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    signinFail: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const { signupRequest, signupSucces, signupFail, signinRequest, signinSucces, signinFail } = userSlice.actions;

export default userSlice.reducer;
