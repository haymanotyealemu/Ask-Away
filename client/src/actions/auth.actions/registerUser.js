import axios from "axios";
import { userLoaded } from "./userLoaded";
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
} from "../../constants/auth.constants";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userData);

    const response = await axios.post(
      "https://whispering-depths-80857.herokuapp.com/api/users/register",
      body,
      config
    );

    dispatch({
      type: AUTH_FORM_SUCCESS,
      payload: response.data,
    });
    dispatch(userLoaded());
  } catch (error) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: error,
    });
  }
};
