import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    errors: null,
    isAuthenticated: false,
    // Cambiar el valor *false >>> true* cuando tengamos el inicio de sesion
    isLoading: false,
  },
  reducers: {
    signInRequest: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.errors = null;
    },
    signInFailure: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    signUpRequest: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.errors = null;
    },
    signUpFailure: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} = authSlice.actions;

export default authSlice.reducer;
