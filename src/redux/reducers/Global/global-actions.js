import { ERROR, LOADING, STOP } from "./global-reducer"

export const setLoading = (payload) => ({
     type: LOADING,
     payload
})

export const setError = (payload) => ({
     type: ERROR,
     payload
})

export const stopLoading = () => ({
     type: STOP
})
