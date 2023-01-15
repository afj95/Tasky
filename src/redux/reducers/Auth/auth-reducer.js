export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGOUT = "LOGOUT";
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'

const authState = {
    user: {},
};

const authReducer = (state = authState, action) => {
    const payload = action.payload
    switch (action.type) {
        case AUTH_SUCCESS: {
            return {
                ...state,
                user: payload.user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                user: {}
            }
        }

        case FETCH_PROFILE_SUCCESS: {
            let newUser = { ...state.user, ...payload }
            return {
                ...state,
                user: newUser
            }
        }

        default: {
            return { ...state }
        }
    };
};

export { authReducer };