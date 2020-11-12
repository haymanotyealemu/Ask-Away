import {
    CHANGE_PROFILE,
    CHANGE_USER_DATA_FAILED,
  } from "../../constants/auth.constants";
  import axios from "axios";
  import { userLoaded } from "./userLoaded";
  export const changeUserData = (changeUserData, userDataToChange) => async (
    dispatch
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ changeUserData });
      const response = await axios.put(
        `https://whispering-depths-80857.herokuapp.com/api/users/change_user_data/${userDataToChange}`,
        body,
        config
      );
      dispatch({
        type: CHANGE_PROFILE,
        payload: response.data,
      });
      dispatch(userLoaded());
      alert("Data has changed");
    } catch (error) {
      dispatch({
        type: CHANGE_USER_DATA_FAILED,
        payload: error,
      });
    }
  };