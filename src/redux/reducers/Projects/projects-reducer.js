import {
    FETCHING_PROJECTS_SUCCESS,

    FETCHING_PROJECT_SUCCESS,
    RESET_PROJECT,

    // ADMIN
    // ADD_PROJECT_SUCCESS,
    // FINISH_PROJECT_SUCCESS,
    // DELETE_PROJECT_SUCCESS,

    // Dashboard
    // DASHBOARD_PROJECTS_SUCCESS,
    // DASHBOARD_LATESTS_SUCCESS,
    // DASHBOARD_EMPLOYEES_SUCCESS,
    // DASHBOARD_CHARTS_SUCCESS
} from "./projects-types";

const projectsState = {
    projects: [],
    inProgressProjects: [],
    upcomingProjects: [],
    totalProjects: 0,
    project: {},

    // ADMIN
    // addProjectResponse: '',
    // finishProjectSuccess: '',
    // deleteProjectSuccess: '',

    // Dashboard
    // dashboardProjects: {},
    // dashboardEmployees: {},
    // dashboardCharts: [0, 0],
    // dashboardLatests: [],
}

const projectsReducer = (state = projectsState, action) => {
    const payload = action?.payload;
    switch (action?.type) {
        case RESET_PROJECT: {
            return {
                ...state,
                project: {}
            }
        }

        case FETCHING_PROJECTS_SUCCESS: {
            if (payload?.in_progress) {
                return {
                    ...state,
                    totalProjects: payload?.projects?.data?.total,
                    inProgressProjects: payload?.loadMore ? [
                        ...state.projects,
                        ...payload?.projects?.data?.data,
                    ] : payload?.projects?.data?.data
                }
            } else {
                return {
                    ...state,
                    totalProjects: payload?.projects?.data?.total,
                    upcomingProjects: payload?.loadMore ? [
                        ...state.projects,
                        ...payload?.projects?.data?.data,
                    ] : payload?.projects?.data?.data
                }
            }
        }

        case FETCHING_PROJECT_SUCCESS: {
            return {
                ...state,
                project: payload?.project
            }
        }

        // ADMIN
        // case ADD_PROJECT_SUCCESS: {
        //     return {
        //         ...state,
        //         addProjectResponse: action?.addProjectResponse,
        //         fetchingProjectsLoading: false,
        //     }
        // }
        // case FINISH_PROJECT_SUCCESS: {
        //     return {
        //         ...state,
        //         projectActionsLoading: false,
        //         finishProjectSuccess: action?.finishProjectSuccess
        //     }
        // }
        // case DELETE_PROJECT_SUCCESS: {
        //     return {
        //         ...state,
        //         projectActionsLoading: false,
        //         deleteProjectSuccess: action?.deleteProjectSuccess,
        //     }
        // }

        // Dashboard
        // case DASHBOARD_PROJECTS_SUCCESS: {
        //     return {
        //         ...state,
        //         dashboardProjects: action?.payload
        //     }
        // }
        // case DASHBOARD_EMPLOYEES_SUCCESS: {
        //     return {
        //         ...state,
        //         dashboardEmployees: action?.payload
        //     }
        // }
        // case DASHBOARD_CHARTS_SUCCESS: {
        //     return {
        //         ...state,
        //         dashboardCharts: action?.payload
        //     }
        // }
        // case DASHBOARD_LATESTS_SUCCESS: {
        //     return {
        //         ...state,
        //         dashboardLatests: action?.payload?.latests
        //     }
        // }

        default: {
            return {
                ...state
            }
        }
    }
}

export { projectsReducer };