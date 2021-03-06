import {
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_FAIL,
  } from "../../constants/auth.constants";
  import axios from "axios";
  import { userLoaded } from "./userLoaded";
  
  export const changePassword = (newPassword) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ newPassword });
      const res = await axios.put(
        "https://whispering-depths-80857.herokuapp.com/api/users/change_password",
        body,
        config
      );
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
      dispatch(userLoaded());
      // alert("Password Updated");
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };