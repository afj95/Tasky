import { tasksState } from "./tasks-state";
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
} from "./tasks-types";

const tasksReducer = (state = tasksState, action) => {
    switch(action.type) {
        case TASKS_RESET: {
            return {
                ...state,
                task: {},
                addTaskError: '',
                deleteTaskError: '',
                checkTaskError: ''
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                addTaskLoading: true
            }
        }
        case ADD_TASK_SUCCESS: {
            return {
                ...state,
                addTaskLoading: false,
                task: action.data?.data?.task
            }
        }
        case ADD_TASK_FAILED: {
            return { 
                ...state,
                addTaskLoading: false,
                addTaskError: action?.addTaskError
            }
        }

        case DELETE_TASK: {
            return {
                ...state,
                fetchingProjectsLoading: true,
            }
        }
        case DELETE_TASK_SUCCESS: {
            return {
                ...state,
                fetchingProjectsLoading: false,
            }
        }
        case DELETE_TASK_FAILED: {
            return {
                ...state,
                fetchingProjectsLoading: false,
                deleteTaskError: action.deleteTaskError
            }
        }

        case CHECK_TASK: {
            return {
                ...state,
                fetchingProjectsLoading: true,
            }
        }
        case CHECK_TASK_SUCCESS: {
            return {
                ...state,
                fetchingProjectsLoading: false,
            }
        }
        case CHECK_TASK_FAILED: {
            return {
                ...state,
                fetchingProjectsLoading: false,
                checkTaskError: action.checkTaskError
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}

export { tasksReducer }