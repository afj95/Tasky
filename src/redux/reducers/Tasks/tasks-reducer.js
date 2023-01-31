
export const PROJECT_TASKS_SUCCESS = 'PROJECT_TASKS_SUCCESS';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const FETCH_TASK = 'FETCH_TASK';
export const RESET_PROJECT_TASKS = 'RESET_PROJECT_TASKS';
export const CLEAR_TASK = 'CLEAR_TASK';
export const FETCH_TASK_MATERIALS_SUCCESS = 'FETCH_TASK_MATERIALS_SUCCESS';
// ADMIN
// export const ADD_TASK_SUCCESS = "add task - success";
// export const DELETE_TASK_SUCCESS = "delete task - success";

const tasksState = {
    projectTasks: [],
    projectCheckedTasks: [],
    task: {},
    currentTask: {},
    taskMaterials: []
}

const tasksReducer = (state = tasksState, action) => {
    switch (action.type) {
        case RESET_PROJECT_TASKS: {
            return {
                ...state,
                projectTasks: [],
                projectCheckedTasks: []
            }
        }

        case CLEAR_TASK: {
            return {
                ...state,
                currentTask: {}
            }
        }

        case PROJECT_TASKS_SUCCESS: {
            return {
                ...state,
                // projectTasks: action.payload.tasks
                projectTasks: action.payload.tasks.filter((task) => !task?.checked),
                projectCheckedTasks: action.payload.tasks.filter((task) => task?.checked),
            }
        }

        case EDIT_TASK_SUCCESS: {
            return {
                ...state,
                task: action?.payload
            }
        }

        case FETCH_TASK: {
            return {
                ...state,
                currentTask: action?.payload
            }
        }

        case FETCH_TASK_MATERIALS_SUCCESS: {
            return {
                ...state,
                taskMaterials: action?.payload?.data?.data?.data
            }
        }

        // ADMIN
        // case ADD_TASK_SUCCESS: {
        //     return {
        //         ...state,
        //         addTaskLoading: false,
        //         task: action.data?.data?.task
        //     }
        // }
        // case DELETE_TASK_SUCCESS: {
        //     return {
        //         ...state,
        //         fetchingProjectsLoading: false,
        //     }
        // }

        default: {
            return {
                ...state,
            }
        }
    }
}

export { tasksReducer }