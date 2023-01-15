import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, stopLoading } from '../Global/global-actions';
import { AUTH_SUCCESS, FETCH_PROFILE_SUCCESS, LOGOUT } from './auth-reducer';
import { request } from '../../../tools';

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'login': true }))

            const user = (await request({
                url: 'login',
                method: 'POST',
                params: {
                    email: email,
                    password: password
                }
            }))?.data?.data?.user

            dispatch(stopLoading({ failed: false }))
            dispatch({
                type: AUTH_SUCCESS,
                payload: { user }
            });

        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'login': error } }))
        }
    }
}

export const logout = (navigate) => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('token')
            .then(() => dispatch({ type: LOGOUT }))
            .then(navigate)
    }
}

export const fetchProfile = () => {
    try {
        return async dispatch => {
            dispatch(setLoading({ 'fetch_profile': true }));

            const fetchProfileRes = await request({
                url: `user`,
                method: 'GET'
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: fetchProfileRes?.data
            })
        }
    } catch (error) {
        dispatch(stopLoading({ failed: true, error: { 'profile': error } }))
    }
}