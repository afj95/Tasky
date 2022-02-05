import {
    fetchSuperVisorsReq
} from '../../../services';
import {
    RESET_ERRORS,

    FETCHING_SUPERVISORS,
    FETCHING_SUPERVISORS_SUCCESS,
    FETCHING_SUPERVISORS_FAILED
} from './users-types'

const resetUsersErrors = () => {
    return { type: RESET_ERRORS }
}

const fetchSuperVisors = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_SUPERVISORS })
            
            const fetchSuperVisorsRes = await fetchSuperVisorsReq();
            
            dispatch({
                type: FETCHING_SUPERVISORS_SUCCESS,
                supervisors: fetchSuperVisorsRes?.data?.data?.supervisors
            })
        } catch (error) {
            dispatch({
                type: FETCHING_SUPERVISORS_FAILED,
                fetchSupervisorsError: error
            })
        }
    }
}

export {
    resetUsersErrors,

    fetchSuperVisors
}