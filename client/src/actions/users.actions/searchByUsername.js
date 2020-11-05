import axios from "axios";
import { USER_ERROR} from "../../constants/users.constants";
import { SEARCH_BY_USERNAME } from "../../constants/auth.constants";

export const searchByUsername = (searchValue ) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ searchValue });
        const res = await axios.put(`http://localhost:8000/api/users/search_by_username`,
        body,
        config
        );
        dispatch({ type:SEARCH_BY_USERNAME, 
                    payload: res.data});
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error,
        });
    }
}