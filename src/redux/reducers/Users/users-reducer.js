export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const FETCHING_EMPLOYEES_SUCCESS = 'FETCHING_EMPLOYEES_SUCCESS';
export const FETCHING_EMPLOYEES_FAILED = 'FETCHING_EMPLOYEES_FAILED';
export const RESET = 'RESET';

const usersState = {
    profile_updated: false,
    all_employees: []
}

const usersReducer = (state = usersState, action) => {
    switch (action.type) {
        case RESET: {
            return {
                ...state,
                profile_updated: false
            }
        }

        case FETCHING_EMPLOYEES_SUCCESS: {
            return {
                ...state,
                all_employees: action?.payload?.all_employees?.data?.data
            }
        }

        case EDIT_PROFILE_SUCCESS: {
            return {
                ...state,
                user: action?.payload,
                profile_updated: true
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