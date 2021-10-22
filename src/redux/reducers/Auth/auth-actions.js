import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    loginRequest,
    registerRequest,
    sendResetEmailRequest,
    sendCodeRequest
} from '../../../services';
import {
    RESET_AUTH,
    AUTH_FAILED,
    AUTH_LOADING,
    AUTH_SUCCESS,
    LOGOUT,

    RESET_EMAIL_SENT,
    RESET_EMAIL_SENDING_FAILED,

    PASSWORD_CHANGED_SUCCESSFULLY,
    PASSWORD_CHANGING_FAILED,
} from './auth-types';

const login = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOADING });
    
            const loginResponse = await loginRequest(username, password);

            dispatch({
                type: AUTH_SUCCESS, 
                user: loginResponse?.data?.data?.user,
                status: loginResponse?.status,
            });
            
        } catch (error) {
            dispatch({ type: AUTH_FAILED, authStatus: error });
        }
    }
}

const register = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOADING });

            user.phoneNumber = user.username;
    
            const registerResponse = await registerRequest(user);

            dispatch({
                type: AUTH_SUCCESS, 
                user: registerResponse?.data?.data?.user,
                status: registerResponse?.status,
            });
            
        } catch (error) {
            // The error is the status code of the error>
            // ex: 409: have an acc. etc.

            dispatch({ type: AUTH_FAILED, authStatus: error });
        }
    }
}

const logout = () => {
    return async (dispatch) => {
        AsyncStorage.removeItem('token').then(() => {
            dispatch({ type: LOGOUT })
        })
    }
}

const resetAuth = () => {
    return async(dispatch) => dispatch({ type: RESET_AUTH })
}

const sendResetEmail = async (email) => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOADING });

            const sendResetEmailResponse = await sendResetEmailRequest(email);

            dispatch({
                type: RESET_EMAIL_SENT,
                resetPasswordStatus: 'mail sent'
            });
        } catch (error) {
            dispatch({ type: RESET_EMAIL_SENDING_FAILED, resetPasswordStatus: 'mail not found' });
        }
    }
}

const sendResetCode = async (code, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOADING });

            const sendCodeResponse = await sendCodeRequest(code, password);
            
            dispatch({
                type: PASSWORD_CHANGED_SUCCESSFULLY,
                resetPasswordStatus: 'pass changed'
            })
        } catch (error) {
            dispatch({
                type: PASSWORD_CHANGING_FAILED,
                resetPasswordStatus: 'not valid code'
            })
        }
    }
}

export {
    login,
    register,
    resetAuth,
    logout,

    sendResetEmail,
    sendResetCode
}