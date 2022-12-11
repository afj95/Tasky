import { request } from "../tools"

const fetchingProjectsReq = async (status, deleted) => {
    return await request({
        url: `projects?status=${status}&deleted=${deleted}`,
        method: 'get',
    })
}

const fetchingOneProjectReq = async (project_id) => {
    return await request({
        url: `projects/one?id=${project_id}`,
        method: 'get',
    })
}

const addProjectRequest = async (project) => {
    return await request({
        url: 'projects',
        method: 'post',
        params: project
    })
}

const finishProjectRequest = async (projectId) => {
    return await request({
        url: `projects/finish?project_id=${projectId}`,
        method: 'put'
    })
}

const deleteProjectRequest = async (projectId) => {
    return await request({
        url: `projects/del?project_id=${projectId}`,
        method: 'put'
    })
}

// Dashboard routes
const getProjectsDetailsReq = async () => {
    return await request({
        url: `projects/dash/projects`,
        method: 'get'
    })
}

const getEmployeesDetailsReq = async () => {
    return await request({
        url: `projects/dash/employees`,
        method: 'get'
    })
}

const getChartsDataReq = async () => {
    return await request({
        url: `projects/dash/tasks`,
        method: 'get'
    })
}

const getLatestProjectsreq = async () => {
    return await request({
        url: `projects/dash/latest`,
        method: 'get'
    })
}

export {
    fetchingProjectsReq,
    fetchingOneProjectReq,
    addProjectRequest,
    finishProjectRequest,
    deleteProjectRequest,
    // Dashboard routes
    getProjectsDetailsReq,
    getEmployeesDetailsReq,
    getChartsDataReq,
    getLatestProjectsreq
}