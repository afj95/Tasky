import { usersState } from "./users-state";
import {
    RESET_ERRORS,

    FETCHING_SUPERVISORS,
    FETCHING_SUPERVISORS_SUCCESS,
    FETCHING_SUPERVISORS_FAILED
} from "./users-types";

const usersReducer = (state = usersState, action) => {
    switch(action.type) {
        case RESET_ERRORS: {
            return {
                ...state,
                fetchSupervisorsError: ''
            }
        }
        case FETCHING_SUPERVISORS: {
            return {
                ...state,
                fetchSupervisorsLoading: true,
            }
        }
        case FETCHING_SUPERVISORS_SUCCESS: {
            return {
                ...state,
                fetchSupervisorsLoading: false,
                supervisors: action.supervisors
            }
        }
        case FETCHING_SUPERVISORS_FAILED: {
            return {
                ...state,
                fetchSupervisorsLoading: false,
                supervisors: [],
                fetchSupervisorsError: action.fetchSupervisorsError
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export { usersReducer };