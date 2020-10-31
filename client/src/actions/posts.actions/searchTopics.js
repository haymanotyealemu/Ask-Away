import { SEARCH_TOPICS, POST_ERROR } from "../../constants/posts.constants";
import axios from "axios";

export const searchTopics = (searchValue) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ searchValue });
    const res = await axios.put(
      `http://localhost:7000/api/posts/search_for_post`,
      body,
      config
    );

    dispatch({ type: SEARCH_TOPICS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};