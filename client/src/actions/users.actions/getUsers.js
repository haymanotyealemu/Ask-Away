import axios from "axios";
import { GET_USERS, USER_ERROR} from "../../constants/users.constants";

export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/users/users`);
        dispatch({ type: GET_USERS, payload: res.data});
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error,
        });
    }
}