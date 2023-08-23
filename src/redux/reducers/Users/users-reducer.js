export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const FETCHING_EMPLOYEES_SUCCESS = 'FETCHING_EMPLOYEES_SUCCESS';
export const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS'
export const RESET = 'RESET';

const usersState = {
    profile_updated: false,
    all_employees: [],
    all_users: [],
    foremen: []
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

        case FETCHING_USERS_SUCCESS: {
            return {
                ...state,
                all_users: action?.payload?.all_users?.data?.data,
                foremen: action?.payload?.all_users?.data?.data.filter(user => user?.role === 'foreman'),
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