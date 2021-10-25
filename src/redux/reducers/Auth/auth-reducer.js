import { authState } from './auth-state';
import {
    RESET_AUTH,
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT,

    RESET_EMAIL_SENT,
    RESET_EMAIL_SENDING_FAILED,

    PASSWORD_CHANGED_SUCCESSFULLY,
    PASSWORD_CHANGING_FAILED,
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
                user: action?.user,
                authStatus: action?.authStatus,
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

        case RESET_EMAIL_SENT: {
            return {
                ...state,
                authLoading: false,
                resetPasswordStatus: action.resetPasswordStatus
            }
        }
        case RESET_EMAIL_SENDING_FAILED: {
            return {
                ...state,
                authLoading: false,
                resetPasswordStatus: 'mail not found'
            }
        }

        case PASSWORD_CHANGED_SUCCESSFULLY: {
            return {
                ...state,
                authLoading: false,
                resetPasswordStatus: action?.resetPasswordStatus
            }
        }
        case PASSWORD_CHANGING_FAILED: {
            return {
                ...state,
                authLoading: false,
                resetPasswordStatus: action?.resetPasswordStatus
            }
        }

        default: {
            return { ...state }
        }
    };
};

export { authReducer };