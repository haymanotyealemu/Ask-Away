import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../../constants/posts.constants";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/posts/");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};