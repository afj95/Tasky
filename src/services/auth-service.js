import { request } from "../tools"

const loginRequest = async (username, password) => {
    return await request({
        url: 'auth/login',
        method: 'post',
        params: {
            user: {
                username: username,
                password: password
            }
        }
    })
}

const registerRequest = async (user) => {
    return await request({
        url: 'auth/register',
        method: 'post',
        params: {
            user: user
        }
    })
}

const sendResetEmailRequest = async (email) => {
    return await request({
        url: 'auth/forget-pass',
        method: 'post',
        params: {
            email: email
        }
    })
}

const sendCodeRequest = async (code, password) => {
    return await request({
        url: 'auth/reset-pass',
        method: 'post',
        params: {
            code: code,
            password: password
        }
    })
}
export {
    loginRequest,
    registerRequest,

    sendResetEmailRequest,
    sendCodeRequest
}