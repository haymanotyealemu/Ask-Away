import axios from "axios";
import { REMOVE_POST, POST_ERROR } from "../../../constants/posts.constants";
import { getPost } from "../posts.actions/getPost";

export const removeLikeFromPost = (post_id, like_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://whispering-depths-80857.herokuapp.com/api/posts/remove_like/${post_id}/${like_id}`
    );
    dispatch({ type: REMOVE_POST, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
