import { request } from "../tools"

const fetchAllEmployeesReq = async () => {
    return await request({
        url: 'users',
        method: 'get'
    })
}

const fetchSuperVisorsReq = async () => {
    return await request({
        url: 'users/supervisors',
        method: 'get'
    })
}

const editEmployeeReq = async emp_id => {
    return await request({
        url: 'users/edit',
        method: 'put',
        params: emp_id
    })
}

const addEmployeeReq = async (values) => {
    return await request({
        url: 'users',
        method: 'post',
        params: values
    })
}

export {
    fetchAllEmployeesReq,
    fetchSuperVisorsReq,
    editEmployeeReq,
    addEmployeeReq
}