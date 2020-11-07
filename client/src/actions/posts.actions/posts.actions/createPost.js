import { MAKE_POST, POST_ERROR } from "../../../constants/posts.constants";
import axios from "axios";

export const createPost = (postText) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ postText });
    const res = await axios.post(
      `http://localhost:8000/api/posts`,
      body,
      config
    );

    dispatch({ type: MAKE_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
