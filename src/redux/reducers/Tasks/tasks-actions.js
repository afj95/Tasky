import { addTaskReq, checkTaskReq, deleteTaskReq, unCheckTaskReq } from '../../../services';
import { fetchingOneProject } from '../Projects/projects-actions';
import {
    TASKS_RESET,

    ADD_TASK,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,

    DELETE_TASK,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILED,

    CHECK_TASK,
    CHECK_TASK_SUCCESS,
    CHECK_TASK_FAILED,
} from './tasks-types'

const resetTasksState = () => {
    return { type: TASKS_RESET }
}

const addNewTask = (project_id, task) => {
    return async dispatch => {
        try {
            dispatch({ type: ADD_TASK })
            
            const addTaskRes = await addTaskReq(project_id, task);

            dispatch(fetchingOneProject(project_id))
            dispatch({ type: ADD_TASK_SUCCESS, task: addTaskRes })
        } catch (error) {
            dispatch({ type: ADD_TASK_FAILED, addTaskError: error })
        }
    }
}

const deleteTask = (taskId, project_id) => {
    return async dispatch => {
        try {
            dispatch({ type: DELETE_TASK })
            
            const deleteTaskRes = await deleteTaskReq(taskId);

            dispatch(fetchingOneProject(project_id))
            dispatch({ type: DELETE_TASK_SUCCESS })
        } catch (error) {
            dispatch({ type: DELETE_TASK_FAILED, deleteTaskError: error })
        }
    }
}

const checkTask = (taskId, project_id) => {
    return async dispatch => {
        try {
            dispatch({ type: CHECK_TASK })
            
            const checkTaskRes = await checkTaskReq(taskId);

            dispatch({ type: CHECK_TASK_SUCCESS })
            dispatch(fetchingOneProject(project_id))
        } catch (error) {
            dispatch({ type: CHECK_TASK_FAILED, checkTaskError: error })
        }
    }
}

const unCheckTask = (taskId, project_id) => {
    return async dispatch => {
        try {
            dispatch({ type: CHECK_TASK })
            
            const checkTaskRes = await unCheckTaskReq(taskId);

            dispatch({ type: CHECK_TASK_SUCCESS })
            dispatch(fetchingOneProject(project_id))
        } catch (error) {
            dispatch({ type: CHECK_TASK_FAILED, checkTaskError: error })
        }
    }
}

export {
    resetTasksState,

    addNewTask,
    deleteTask,
    checkTask,
    unCheckTask
}