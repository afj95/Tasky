import { authState } from './auth-state';
import {
    RESET_AUTH,
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT,
} from './auth-types';

const authReducer = (state = authState, action) => {
    switch(action.type) {
        case RESET_AUTH: {
            return {
                ...state,
                authLoading: '',
                authStatus: '',
                resetPasswordStatus: ''
            }
        }
        case AUTH_LOADING: {
            return {
                ...state,
                authLoading: true,
            };
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                authLoading: false,
                user: action?.payload.user,
                authStatus: action?.payload.authStatus,
            };
        }
        case AUTH_FAILED: {
            return {
                ...state,
                authLoading: false,
                authStatus: action?.authStatus
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: '',
                authLoading: '',
                authStatus: '',
            }
        }

        default: {
            return { ...state }
        }
    };
};

export { authReducer };