import { projectsState } from "./projects-state";
import {
    RESET_PROJECTS_ERRORS,

    FETCHING_PROJECTS,
    FETCHING_PROJECTS_FAILED,
    FETCHING_PROJECTS_SUCCESS,

    FETCHING_PROJECT,
    FETCHING_PROJECT_SUCCESS,
    FETCHING_PROJECT_FAILED,

    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILED,
    
    PROJECT_ACTIONS,
    FINISH_PROJECT_SUCCESS,
    FINISH_PROJECT_FAILED,
    
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILED
} from "./projects-types";

const projectsReducer = (state = projectsState, action) => {
    switch(action?.type) {
        case RESET_PROJECTS_ERRORS: {
            return {
                ...state,
                fetchingProjectsError: '',
                addProjectResponse: null,
                finishProjectSuccess: '',
                finishProjectFailed: '',
                deleteProjectSuccess: '',
                deleteProjectFailed: '',
                fetchingProjectError: '',
                project: ''
            }
        }

        case FETCHING_PROJECTS: {
            return {
                ...state,
                fetchingProjectsLoading: true
            }
        }
        case FETCHING_PROJECTS_SUCCESS: {
            return {
                ...state,
                fetchingProjectsLoading: false,
                projects: action?.projects
            }
        }
        case FETCHING_PROJECTS_FAILED: {
            return {
                ...state,
                projects: [],
                fetchingProjectsLoading: false,
                // TODO: Not handled
                fetchingProjectsError: action?.error
            }
        }

        case FETCHING_PROJECT: {
            return {
                ...state,
                fetchingProjectsLoading: true
            }
        }
        case FETCHING_PROJECT_SUCCESS: {
            return {
                ...state,
                fetchingProjectsLoading: false,
                project: action?.project
            }
        }
        case FETCHING_PROJECT_FAILED: {
            return {
                ...state,
                project: {},
                fetchingProjectsLoading: false,
                fetchingProjectError: action?.error
            }
        }

        case ADD_PROJECT_SUCCESS: {
            return {
                ...state,
                addProjectResponse: action?.addProjectResponse,
                fetchingProjectsLoading: false,
            }
        }
        case ADD_PROJECT_FAILED: {
            return {
                ...state,
                addProjectResponse: action?.addProjectResponse,
                fetchingProjectsLoading: false,
            }
        }

        case PROJECT_ACTIONS: {
            return {
                ...state,
                projectActionsLoading: true
            }
        }
        case FINISH_PROJECT_SUCCESS: {
            return {
                ...state,
                projectActionsLoading: false,
                finishProjectSuccess: action?.finishProjectSuccess
            }
        }
        case FINISH_PROJECT_FAILED: {
            return {
                ...state,
                projectActionsLoading: false,
                finishProjectFailed: action?.finishProjectFailed
            }
        }

        case DELETE_PROJECT_SUCCESS: {
            return {
                ...state,
                projectActionsLoading: false,
                deleteProjectSuccess: action?.deleteProjectSuccess,
            }
        }
        case DELETE_PROJECT_FAILED: {
            return {
                ...state,
                projectActionsLoading: false,
                deleteProjectFailed: action?.deleteProjectFailed,
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export { projectsReducer };