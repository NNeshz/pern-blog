import {
  signInRequest,
  signInFailure,
  signInSuccess,
} from "../features/auth/auth.js";
import axios from "../api/axios.js";

export const signIn = (credentials) => async (dispatch) => {
  try {
    dispatch(signInRequest());
    const response = await axios.post("/signin", credentials);
    const userData = response.data;
    dispatch(signInSuccess(userData));
  } catch (error) {
    const errorData = {
      message: error.message,
      name: error.name,
      code: error.code,
    };
    dispatch(signInFailure(errorData));
  }
};

export const signUp = (credentials) => async (dispatch) => {
  try {
    dispatch(signInRequest());
    const response = await axios.post("/signup", credentials);
    const userData = response.data;
    dispatch(signInSuccess(userData));
  } catch (error) {
    const errorData = {
      message: error.message,
      name: error.name,
      code: error.code,
    };
    dispatch(signInFailure(errorData));
  }
};
