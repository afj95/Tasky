import { request } from "../../../tools"

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

const fetchUndeletedEmployeesReq = async () => {
    return await request({
        url: 'users/undeleted',
        method: 'get'
    })
}

const fetchDeletedEmployeesReq = async () => {
    return await request({
        url: 'users/deleted',
        method: 'get'
    })
}

const editEmployeeReq = async (values) => {
    return await request({
        url: 'users/edit',
        method: 'put',
        params: values
    })
}

const addEmployeeReq = async (values) => {
    return await request({
        url: 'users',
        method: 'post',
        params: values
    })
}


const deleteEmployeeReq = async (emp_id) => {
    return await request({
        url: 'users/delete',
        method: 'delete',
        params: {
            emp_id
        }
    })
}

const undoDeleteEmployeeReq = async (emp_id) => {
    return await request({
        url: 'users/un-delete',
        method: 'put',
        params: {
            emp_id
        }
    })
}

export {
    fetchAllEmployeesReq,
    fetchSuperVisorsReq,
    fetchUndeletedEmployeesReq,
    fetchDeletedEmployeesReq,
    editEmployeeReq,
    addEmployeeReq,
    deleteEmployeeReq,
    undoDeleteEmployeeReq
}