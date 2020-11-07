import axios from "axios";
import { GET_USER_BY_ID, USER_ERROR} from "../../constants/users.constants";

export const getUserById = (user_id) => async (dispatch) => {
    try {
        const res = await axios.get(`https://whispering-depths-80857.herokuapp.com/api/users/user_by_id/${user_id}`);
        dispatch({ type: GET_USER_BY_ID, payload: res.data});
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error,
        });
    }
}
