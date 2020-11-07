import { getPost } from "../posts.actions/getPost";
import axios from "axios";
import { LIKE_COMMENT, POST_ERROR } from "../../../constants/posts.constants";

export const addLikeToComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://whispering-depths-80857.herokuapp.com/api/posts/like_comment/${post_id}/${comment_id}`
    );
    dispatch({ type: LIKE_COMMENT, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};