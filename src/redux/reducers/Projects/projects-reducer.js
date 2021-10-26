import { projectsState } from "./projects-state";
import {
    RESET_PROJECTS_ERRORS,

    FETCHING_PROJECTS,
    FETCHING_PROJECTS_FAILED,
    FETCHING_PROJECTS_SUCCESS
} from "./projects-types";

const projectsReducer = (state = projectsState, action) => {
    switch(action?.type) {
        case RESET_PROJECTS_ERRORS: {
            return {
                ...state,
                fetchingProjectsError: ''
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
                fetchingProjectsLoading: false,
                fetchingProjectsError: action?.error
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