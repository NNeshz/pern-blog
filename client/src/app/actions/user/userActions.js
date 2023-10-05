import {
  signupRequest,
  signupSucces,
  signupFail,
  signinRequest,
  signinSucces,
  signinFail,
} from "../../features/user/userSlice";
import axios from "../../api/api.js";

export const signupUser = (user) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const { data } = await axios.post("/signup", user);
    dispatch(signupSucces(data));
  } catch (error) {
    let errorMessages = [];
    if (Array.isArray(error.response.data)) {
      errorMessages = error.response.data;
    } else {
      errorMessages.push(error.response.data.message);
    }
    dispatch(signupFail(errorMessages));
  }
};

export const signinUser = (user) => async (dispatch) => {
  try {
    dispatch(signinRequest());
    const { data } = await axios.post("/signin", user);
    dispatch(signinSucces(data));
  } catch (error) {
    let errorMessages = [];
    if (Array.isArray(error.response.data)) {
      errorMessages = error.response.data;
    } else {
      errorMessages.push(error.response.data.message);
    }
    dispatch(signinFail(errorMessages));
  }
};
