import {
    MOST_LIKED_POSTS,
    POST_ERROR,
  } from "../../../constants/posts.constants";
  import axios from "axios";
  
  export const getMostLikedPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(
        "https://whispering-depths-80857.herokuapp.com/api/posts/most_liked"
      );
      dispatch({ type: MOST_LIKED_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };