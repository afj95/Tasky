import { request, showMessage } from "../../../tools";
import { setLoading, stopLoading } from "../Global/global-actions";
import { fetchProjectTasks } from "../Tasks/tasks-actions";
import {
    ADD_NEW_WORK_TYPE,
    ADD_PROJECT_SUCCESS,
    DELETE_WORK_TYPE,
    FETCHING_PROJECTS_SUCCESS,
    FETCHING_PROJECT_SUCCESS,
    RESET_PROJECT
} from "./projects-reducer";

export const resetProject = () => ({
    type: RESET_PROJECT
})

// status & deleted for admins only
// export const fetchProjects = (status = '', deleted = false, loadMore = false, page = 1, perPage = 10, refresh) => {
export const fetchInprogressProjects = ({
    loadMore = false,
    page = 1,
    perPage = 5,
    refresh = false,
    in_progress = true
}) => {
    return async (dispatch) => {
        try {
            if (refresh) {
                dispatch(setLoading({ 'projects_refresh': true }))
            } else {
                dispatch(setLoading({ 'projects': true }))
            }

            const fetchingProjectsRes = await request({
                // url: `projects?status=${status}&deleted=${deleted}&page=${page}&perPage=${perPage}`,
                url: `projects?page=${page}&perPage=${perPage}`,
                method: 'GET',
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCHING_PROJECTS_SUCCESS,
                payload: {
                    loadMore,
                    in_progress,
                    projects: fetchingProjectsRes?.data
                }
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'projects': error } }))
        }
    }
}

export const fetchUpcomingProjects = ({
    loadMore = false,
    page = 1,
    perPage = 5,
    refresh = false,
    in_progress = false
}) => {
    return async (dispatch) => {
        try {
            if (refresh) {
                dispatch(setLoading({ 'projects_refresh': true }))
            } else {
                dispatch(setLoading({ 'projects_upcoming': true }))
            }

            const fetchingProjectsRes = await request({
                // url: `projects?status=${status}&deleted=${deleted}&page=${page}&perPage=${perPage}`,
                url: `projects/upcoming?page=${page}&perPage=${perPage}`,
                method: 'GET',
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCHING_PROJECTS_SUCCESS,
                payload: {
                    loadMore,
                    in_progress,
                    projects: fetchingProjectsRes?.data
                }
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'projects': error } }))
        }
    }
}

export const fetchOneProject = (project_id, refresh = false) => {
    return async (dispatch) => {
        try {
            if (refresh) {
                dispatch(setLoading({ 'project_refresh': true }))
            } else {
                dispatch(setLoading({ 'project': true }))
            }

            const fetchingProjectRes = await request({
                url: `projects/${project_id}`,
                method: 'GET',
            })

            await dispatch(stopLoading())
            await dispatch({
                type: FETCHING_PROJECT_SUCCESS,
                payload: { project: fetchingProjectRes?.data?.data }
            })
            dispatch(fetchProjectTasks(project_id, refresh))
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'project': error } }))
        }
    }
}

// ============================================================================================================
// ============================================================================================================

// ADMIN routes

export const addNewProject = (project) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'add_project': true }))

            const addProjectRes = await request({
                url: 'projects',
                method: 'POST',
                params: project
            })

            await dispatch(stopLoading())

            showMessage({
                message: addProjectRes.data?.message,
                type: 'success'
            })

            await dispatch({
                type: ADD_PROJECT_SUCCESS,
                payload: addProjectRes?.data
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'add_project': error } }))
        }
    }
}

export const addNewType = type => {
    return async dispatch => {
        try {
            dispatch({ type: ADD_NEW_WORK_TYPE, payload: { type } })
        } catch (error) {
            if (__DEV__) console.log('error adding new workType', error);
        }
    }
}
export const deleteWorkType = (index) => ({
    type: DELETE_WORK_TYPE,
    payload: { index }
})

// export const editProject = (projectId) => {
//     return async (dispatch) => {
//         try {} catch (error) {}
//     }
// }

// export const finishProject = (projectId) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: PROJECT_ACTIONS })

//             const finishProjectResponse = await request({
//                 url: `projects/finish?project_id=${projectId}`,
//                 method: 'PUT'
//             })

//             dispatch({ type: FINISH_PROJECT_SUCCESS, finishProjectSuccess: finishProjectResponse });
//         } catch (error) {
//             dispatch({ type: FINISH_PROJECT_FAILED, finishProjectFailed: error });
//         }
//     }
// }

// export const deleteProject = (projectId) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: PROJECT_ACTIONS })

//             const deleteProjectResponse = await request({
//                 url: `projects/del?project_id=${projectId}`,
//                 method: 'PUT'
//             })

//             dispatch({ type: DELETE_PROJECT_SUCCESS, deleteProjectSuccess: deleteProjectResponse });
//         } catch (error) {
//             dispatch({ type: DELETE_PROJECT_FAILED, deleteProjectFailed: error });
//         }
//     }
// }

// ============================================================================================================
// ============================================================================================================

// Dashboard routes

// export const getProjectsDetails = () => {
//     return async (dispatch) => {
//         try {
//             dispatch(setLoading({ 'dashboard': true }))

//             const getProjectsDetailsRes = await request({
//                 url: `projects/dash/projects`,
//                 method: 'GET'
//             })

//             dispatch(stopLoading())
//             dispatch({ type: DASHBOARD_PROJECTS_SUCCESS, payload: getProjectsDetailsRes?.data?.data });
//         } catch (error) {
//             dispatch(stopLoading())
//             dispatch(setError({ 'dashboard': { message: error?.message } }))
//             dispatch({ type: DASHBOARD_PROJECTS_SUCCESS, payload: {} });
//         }
//     }
// }

// export const getEmployeesDetails = () => {
//     return async (dispatch) => {
//         try {
//             dispatch(setLoading({ 'dashboard': true }))

//             const getEmployeesDetailsRes = await request({
//                 url: `projects/dash/employees`,
//                 method: 'GET'
//             })

//             dispatch(stopLoading())
//             dispatch({ type: DASHBOARD_EMPLOYEES_SUCCESS, payload: getEmployeesDetailsRes?.data?.data });
//         } catch (error) {
//             dispatch(stopLoading())
//             dispatch(setError({ 'dashboard': { message: error?.message } }))
//             dispatch({ type: DASHBOARD_EMPLOYEES_SUCCESS, payload: {} });
//         }
//     }
// }

// export const getChartsData = () => {
//     return async (dispatch) => {
//         try {
//             dispatch(setLoading({ 'dashboard': true }))

//             const getChartsDataRes = await request({
//                 url: `projects/dash/tasks`,
//                 method: 'GET'
//             })

//             dispatch(stopLoading())
//             dispatch({ type: DASHBOARD_CHARTS_SUCCESS, payload: getChartsDataRes?.data?.data }); // <- array [num, num]
//         } catch (error) {
//             dispatch(stopLoading())
//             dispatch(setError({ 'dashboard': { message: error?.message } }))
//             dispatch({ type: DASHBOARD_CHARTS_SUCCESS, payload: {} });
//         }
//     }
// }

// export const getLatestProjects = () => {
//     return async (dispatch) => {
//         try {
//             dispatch(setLoading({ 'dashboard': true }))

//             const getLatestProjectsRes = await request({
//                 url: `projects/dash/latest`,
//                 method: 'GET'
//             });

//             dispatch(stopLoading())
//             dispatch({ type: DASHBOARD_LATESTS_SUCCESS, payload: getLatestProjectsRes?.data?.data });
//         } catch (error) {
//             dispatch(stopLoading())
//             dispatch(setError({ 'dashboard': { latest: true } }))
//             dispatch({ type: DASHBOARD_LATESTS_SUCCESS, payload: [] });
//         }
//     }
// }

// export const getDashboardData = () => {
//     return async dispatch => {
//         await Promise.all([
//             dispatch(getProjectsDetails()),
//             dispatch(getEmployeesDetails()),
//             dispatch(getLatestProjects()),
//             dispatch(getChartsData()),
//         ])
//     }
// }