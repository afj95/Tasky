import { request } from "../../../tools";
import { setLoading, stopLoading } from "../Global/global-actions";
import { getProjectTasks } from "../Tasks/tasks-actions";
import {
    FETCHING_PROJECTS_SUCCESS,

    FETCHING_PROJECT_SUCCESS,
    RESET_PROJECT

    // ADMIN
    // ADD_PROJECT_SUCCESS,
    // FINISH_PROJECT_SUCCESS,
    // DELETE_PROJECT_SUCCESS,

    // Dashboard
    // DASHBOARD_PROJECTS_SUCCESS,
    // DASHBOARD_LATESTS_SUCCESS,
    // DASHBOARD_EMPLOYEES_SUCCESS,
    // DASHBOARD_CHARTS_SUCCESS
} from "./projects-types"

export const resetProject = () => ({
    type: RESET_PROJECT
})

export const fetchProjects = (status = '', deleted = false, loadMore, page = 1, perPage = 10) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'projects': true }))

            const fetchingProjectsRes = await request({
                url: `projects?status=${status}&deleted=${deleted}&page=${page}&perPage=${perPage}`,
                method: 'GET',
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCHING_PROJECTS_SUCCESS,
                payload: {
                    loadMore,
                    projects: fetchingProjectsRes?.data
                }
            })

        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'projects': error } }))
        }
    }
}

export const fetchOneProject = (project_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'project': true }))

            const fetchingProjectRes = await request({
                url: `projects/${project_id}`,
                method: 'GET',
            })

            await dispatch({
                type: FETCHING_PROJECT_SUCCESS,
                payload: { project: fetchingProjectRes?.data?.data }
            })

            await dispatch(getProjectTasks(project_id, () => dispatch(stopLoading())))

        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'project': error } }))
        }
    }
}

// ============================================================================================================
// ============================================================================================================

// ADMIN routes

// export const addNewProject = (project) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: FETCHING_PROJECTS });

//             const addProjectResponse = await request({
//                 url: 'projects',
//                 method: 'POST',
//                 params: project
//             })

//             dispatch({
//                 type: ADD_PROJECT_SUCCESS,
//                 addProjectResponse: addProjectResponse?.status === 201 || addProjectResponse?.status === 200
//             })
//         } catch (error) {
//             dispatch({ type: ADD_PROJECT_FAILED, addProjectResponse: false });
//         }
//     }
// }

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