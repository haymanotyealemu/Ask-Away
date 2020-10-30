import { GET_POST, POST_ERROR } from "../../../constants/posts.constants";
import axios from "axios";

export const getPost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:7000/api/posts/${post_id}`
    );
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};