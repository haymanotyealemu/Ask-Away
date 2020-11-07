import {
    CHECK_PASSWORDS,
    CHANGE_PASSWORD_FAIL,
  } from "../../constants/auth.constants";
  import axios from "axios";
  
  export const checkPasswords = (passwordToCheck) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ passwordToCheck });
      const res = await axios.put(
        "https://whispering-depths-80857.herokuapp.com/api/users/check_password",
        body,
        config
      );
      dispatch({
        type: CHECK_PASSWORDS,
        payload: res.data,
      });
      // alert("Password change succesful");
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };