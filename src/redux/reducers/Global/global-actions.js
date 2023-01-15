import { CLEAR, ERROR, LOADING, STOP } from "./global-reducer"

export const setLoading = (payload) => ({
     type: LOADING,
     payload
})

export const setError = (payload) => ({
     type: ERROR,
     payload
})

export const stopLoading = (payload) => ({
     type: STOP,
     payload: payload || { failed: false, error: null }
})

export const clearErrors = () => ({
     type: CLEAR
})
