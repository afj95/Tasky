
export const PROJECT_TASKS_SUCCESS = 'PROJECT_TASKS_SUCCESS';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const RESET_PROJECT_TASKS = 'RESET_PROJECT_TASKS';
// ADMIN
// export const ADD_TASK_SUCCESS = "add task - success";
// export const DELETE_TASK_SUCCESS = "delete task - success";

const tasksState = {
    projectTasks: [],
    projectCheckedTasks: [],
    task: {}
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