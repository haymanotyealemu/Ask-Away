import {
    THE_MOST_RECENT_POSTS,
    POST_ERROR,
  } from "../../../constants/posts.constants";
  import axios from "axios";
  
  export const getMostRecentPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(
        "https://whispering-depths-80857.herokuapp.com/api/posts/most_recent"
      );
      dispatch({ type: THE_MOST_RECENT_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };