import axios from "axios";
import { GET_USER_POSTS, USER_ERROR} from "../../constants/users.constants";

export const getUserPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`https://whispering-depths-80857.herokuapp.com/api/posts/user_posts`);
        dispatch({ type: GET_USER_POSTS, payload: res.data});
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error,
        });
    }
}