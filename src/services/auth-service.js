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

export {
    loginRequest,
    registerRequest,
}