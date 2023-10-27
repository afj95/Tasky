export const FETCHING_PROJECTS_SUCCESS = "FETCHING_PROJECTS_SUCCESS";

export const FETCHING_PROJECT_SUCCESS = "FETCHING_PROJECT_SUCCESS";
export const RESET_PROJECT = "RESET_PROJECT";
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_NEW_WORK_TYPE = 'ADD_NEW_WORK_TYPE';
export const DELETE_WORK_TYPE = 'DELETE_WORK_TYPE';

const projectsState = {
    inProgressProjects: [],
    upcomingProjects: [],
    totalInprogress: 0,
    totalUpcoming: 0,
    project: {},

    // ADMIN
    addProjectResponse: false,
    workTypes: []
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
                project: {},
                addProjectResponse: false
            }
        }

        case FETCHING_PROJECTS_SUCCESS: {
            if (payload?.in_progress) {
                return {
                    ...state,
                    totalInprogress: payload?.projects?.data?.total,
                    inProgressProjects: payload?.loadMore ? [
                        ...state.inProgressProjects,
                        ...payload?.projects?.data?.data,
                    ] : payload?.projects?.data?.data
                }
            } else {
                return {
                    ...state,
                    totalUpcoming: payload?.projects?.data?.total,
                    upcomingProjects: payload?.loadMore ? [
                        ...state.upcomingProjects,
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
        case ADD_PROJECT_SUCCESS: {
            return {
                ...state,
                addProjectResponse: true,
            }
        }

        case ADD_NEW_WORK_TYPE: {
            return {
                ...state,
                workTypes: [
                    ...state.workTypes,
                    payload?.type
                ]
            }
        }
        case DELETE_WORK_TYPE: {
            return {
                ...state,
                workTypes: [
                    ...state.workTypes.filter((type, index) => index !== payload.index),
                ]
            }
        }
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