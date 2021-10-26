import { request } from "../tools"

const fetchingProjectsReq = async () => {
    return await request({
        url: 'projects',
        method: 'get',
    })
}

export {
    fetchingProjectsReq
}