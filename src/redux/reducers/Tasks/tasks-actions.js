import { showMessage } from 'react-native-flash-message';
import { request } from '../../../tools';
import { setLoading, stopLoading } from '../Global/global-actions';
import {
    CLEAR_TASK,
    EDIT_TASK_SUCCESS,
    FETCH_TASK,
    FETCH_TASK_MATERIALS_SUCCESS,
    PROJECT_TASKS_SUCCESS,
    RESET_PROJECT_TASKS

    // ADMIN
    // ADD_TASK_SUCCESS,
    // DELETE_TASK_SUCCESS,
} from './tasks-reducer'

export const restProjectTasks = () => ({
    type: RESET_PROJECT_TASKS,
})

export const clearTask = () => ({
    type: CLEAR_TASK
})

export const fetchProjectTasks = (project_id, refresh) => {
    return async dispatch => {
        try {
            if (refresh) {
                dispatch(setLoading({ 'project_tasks_refresh': true }))
            } else {
                dispatch(setLoading({ 'project_tasks': true }))
            }

            const projectTasksRes = await request({
                url: `projects/${project_id}/tasks`,
                method: 'GET'
            })

            dispatch(stopLoading())
            dispatch({
                type: PROJECT_TASKS_SUCCESS,
                payload: { tasks: projectTasksRes?.data?.data }
            })

        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'project_tasks': error.message ? error.message : error } }))
        }
    }
}

export const checkTask = (task_id) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'check_task': true }))

            const checkTaskRes = await request({
                url: `tasks/${task_id}/check`,
                method: 'PUT'
            })

            dispatch(stopLoading());
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'check_task': error.message ? error.message : error } }))
        }
    }
}

export const unCheckTask = (task_id) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'uncheck_task': true }))

            const checkTaskRes = await request({
                url: `tasks/${task_id}/uncheck`,
                method: 'PUT'
            })

            dispatch(stopLoading());
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'uncheck_task': error.message ? error.message : error } }))
        }
    }
}

export const editTask = (task, params) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'edit_task': true }))

            const editTaskRes = await request({
                url: `tasks/${task.id}`,
                method: 'PUT',
                params: {
                    ...task,
                    ...params
                }
            })

            showMessage({
                message: editTaskRes.data?.message,
                type: 'success'
            })

            dispatch(stopLoading());
            dispatch({
                type: EDIT_TASK_SUCCESS,
                payload: editTaskRes?.data?.data
            })
            dispatch(fetchTask(task.id))
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'edit_task': error.message ? error.message : error } }))
        }
    }
}


export const fetchTask = (task_id) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'edit_task': true }))

            const fetchTaskRes = await request({
                url: `tasks/${task_id}`,
                method: 'GET'
            })

            dispatch(stopLoading());
            dispatch({
                type: FETCH_TASK,
                payload: fetchTaskRes?.data?.data
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'edit_task': error.message ? error.message : error } }))
        }
    }
}

export const fetchTaskMaterials = (task_id) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'fetch_materials': true }))

            const fetchTaskMaterialsRes = await request({
                url: `tasks/${task_id}/materials`,
                method: 'GET'
            })
            dispatch(stopLoading())
            dispatch({ type: FETCH_TASK_MATERIALS_SUCCESS, payload: fetchTaskMaterialsRes })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'fetch_materials': error.message ? error.message : error } }))
        }
    }
}

export const addMaterials = (materials, task_id) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'add_material': true }))

            const addMaterialsRes = await request({
                url: `tasks/${task_id}/materials`,
                method: 'POST',
                params: materials
            })

            dispatch(stopLoading())
            // TODO: Read the task from returned response
            dispatch(fetchTask(task_id))
            dispatch(fetchTaskMaterials(task_id))
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'add_material': error.message ? error.message : error } }))
        }
    }
}

// ============================================================================================================
// ============================================================================================================

// ADMIN
// const addNewTask = (project_id, task) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: ADD_TASK })

//             const addTaskRes = await request({
//                 url: 'tasks',
//                 method: 'POST',
//                 params: {
//                     task,
//                     project_id
//                 }
//             })

//             dispatch(fetchingOneProject(project_id))
//             dispatch({ type: ADD_TASK_SUCCESS, task: addTaskRes })
//         } catch (error) {
//             dispatch({ type: ADD_TASK_FAILED, addTaskError: error })
//         }
//     }
// }

// const deleteTask = (taskId, project_id) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: DELETE_TASK })

//             const deleteTaskRes = await request({
//                 url: 'tasks/del',
//                 method: 'DELETE',
//                 params: {
//                     taskId
//                 }
//             })

//             dispatch(fetchingOneProject(project_id))
//             dispatch({ type: DELETE_TASK_SUCCESS })
//         } catch (error) {
//             dispatch({ type: DELETE_TASK_FAILED, deleteTaskError: error })
//         }
//     }
// }

// ============================================================================================================
// ============================================================================================================

// Later
// export const getTask = (task_id) => {
//     return async (dispatch) => {
//         try {
//             dispatch(setLoading({ 'project_tasks': true }))

//             const getOneTaskRes = await request({
//                 url: `tasks/${task_id}`,
//                 method: 'GET'
//             })

//             dispatch(stopLoading());
//             dispatch({
//                 type: 'GET_ONE_TASK_SUCCESS',
//                 payload: { editedTask: getOneTaskRes?.data?.data }
//             })
//         } catch (error) {
//             dispatch(stopLoading({ failed: true, error: { 'project_tasks': error.message ? error.message : error } }))
//         }
//     }
// }