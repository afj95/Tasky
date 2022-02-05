import { request } from "../tools"

const addTaskReq = async (project_id, task) => {
    return await request({
        url: 'tasks',
        method: 'post',
        params: {
            task,
            project_id
        }
    })
}

const deleteTaskReq = async taskId => {
    return await request({
        url: 'tasks/del',
        method: 'delete',
        params: {
            taskId
        }
    })
}

const checkTaskReq = async taskId => {
    return await request({
        url: 'tasks/check',
        method: 'put',
        params: {
            taskId
        }
    })
}

const unCheckTaskReq = async taskId => {
    return await request({
        url: 'tasks/uncheck',
        method: 'put',
        params: {
            taskId
        }
    })
}



export {
    addTaskReq,
    deleteTaskReq,
    checkTaskReq,
    unCheckTaskReq
}