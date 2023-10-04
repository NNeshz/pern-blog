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
    console.log(error)
    if (!Array.isArray(error.response.data)) {
      dispatch(signupFail([error.response.data.message]));
    }
    dispatch(signupFail(error.response.data));
  }
};

export const signinUser = (user) => async (dispatch) => {
  try {
    dispatch(signinRequest());
    const { data } = await axios.post("/signin", user);
    dispatch(signinSucces(data));
  } catch (error) {
    if (Array.isArray(error.response.data)) {
      dispatch(signinFail(error.response.data));
    }
    dispatch(signinFail([error.response.data.message]));
  }
};
