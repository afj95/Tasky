import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    loginRequest,
    registerRequest,
} from '../../../services';
import {
    RESET_AUTH,
    AUTH_FAILED,
    AUTH_LOADING,
    AUTH_SUCCESS,
    LOGOUT,
} from './auth-types';

const login = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOADING });
    
            const loginResponse = await loginRequest(username, password);

            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    user: loginResponse?.data?.data?.user,
                    authStatus: loginResponse,
                }
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
                authStatus: registerResponse?.status,
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

export {
    login,
    register,
    resetAuth,
    logout,
}