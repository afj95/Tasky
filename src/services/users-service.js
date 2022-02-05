import { request } from "../tools"

const fetchSuperVisorsReq = async () => {
    return await request({
        url: 'users/supervisors',
        method: 'get'
    })
}

export {
    fetchSuperVisorsReq
}