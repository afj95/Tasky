import {
    addProjectRequest,
    deleteProjectRequest,
    fetchingProjectsReq,
    fetchingOneProjectReq,
    finishProjectRequest,
    getProjectsDetailsReq,
    getLatestProjectsreq,
    getEmployeesDetailsReq,
    getChartsDataReq
} from "../../../services";
import { setError, setLoading, stopLoading } from "../Global/global-actions";
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
    DELETE_PROJECT_FAILED,

    DASHBOARD_PROJECTS_SUCCESS,
    DASHBOARD_LATESTS_SUCCESS,
    DASHBOARD_EMPLOYEES_SUCCESS,
    DASHBOARD_CHARTS_SUCCESS
} from "./projects-types"

const resetProjectsErrors = () => {
    return { type: RESET_PROJECTS_ERRORS }
}

const fetchingProjects = (status = '', deleted = false) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_PROJECTS });

            const fetchingProjectsRes = await fetchingProjectsReq(status, deleted);

            dispatch({
                type: FETCHING_PROJECTS_SUCCESS,
                projects: fetchingProjectsRes?.data?.data?.projects
            })

        } catch (error) {
            dispatch({ type: FETCHING_PROJECTS_FAILED, error: error })
        }
    }
}

const fetchingOneProject = (project_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_PROJECT });

            const fetchingProjectRes = await fetchingOneProjectReq(project_id);

            dispatch({
                type: FETCHING_PROJECT_SUCCESS,
                project: fetchingProjectRes?.data?.data?.project
            })

        } catch (error) {
            dispatch({ type: FETCHING_PROJECT_FAILED, error: error })
        }
    }
}

const addNewProject = (project) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_PROJECTS });

            const addProjectResponse = await addProjectRequest(project);

            dispatch({
                type: ADD_PROJECT_SUCCESS,
                addProjectResponse: addProjectResponse?.status === 201 || addProjectResponse?.status === 200
            })
        } catch (error) {
            dispatch({ type: ADD_PROJECT_FAILED, addProjectResponse: false });
        }
    }
}

const editProject = (projectId) => {
    return async (dispatch) => {
        try {
            dispatch({})

            const editProjectResponse = await editProjectRequest(projectId);

            dispatch({})
        } catch (error) {
            dispatch({})
        }
    }
}

const finishProject = (projectId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PROJECT_ACTIONS })

            const finishProjectResponse = await finishProjectRequest(projectId);

            dispatch({ type: FINISH_PROJECT_SUCCESS, finishProjectSuccess: finishProjectResponse });
        } catch (error) {
            dispatch({ type: FINISH_PROJECT_FAILED, finishProjectFailed: error });
        }
    }
}

const deleteProject = (projectId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PROJECT_ACTIONS })

            const deleteProjectResponse = await deleteProjectRequest(projectId);

            dispatch({ type: DELETE_PROJECT_SUCCESS, deleteProjectSuccess: deleteProjectResponse });
        } catch (error) {
            dispatch({ type: DELETE_PROJECT_FAILED, deleteProjectFailed: error });
        }
    }
}

// Dashboard routes

const getProjectsDetails = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'dashboard': true }))

            const getProjectsDetailsRes = await getProjectsDetailsReq();

            dispatch(stopLoading())
            dispatch({ type: DASHBOARD_PROJECTS_SUCCESS, payload: getProjectsDetailsRes?.data?.data });
        } catch (error) {
            dispatch(stopLoading())
            dispatch(setError({ 'dashboard': { message: error?.message } }))
            dispatch({ type: DASHBOARD_PROJECTS_SUCCESS, payload: {} });
        }
    }
}

const getEmployeesDetails = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'dashboard': true }))

            const getEmployeesDetailsRes = await getEmployeesDetailsReq();

            dispatch(stopLoading())
            dispatch({ type: DASHBOARD_EMPLOYEES_SUCCESS, payload: getEmployeesDetailsRes?.data?.data });
        } catch (error) {
            dispatch(stopLoading())
            dispatch(setError({ 'dashboard': { message: error?.message } }))
            dispatch({ type: DASHBOARD_EMPLOYEES_SUCCESS, payload: {} });
        }
    }
}

const getChartsData = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'dashboard': true }))

            const getChartsDataRes = await getChartsDataReq()

            dispatch(stopLoading())
            dispatch({ type: DASHBOARD_CHARTS_SUCCESS, payload: getChartsDataRes?.data?.data }); // <- array [num, num]
        } catch (error) {
            dispatch(stopLoading())
            dispatch(setError({ 'dashboard': { message: error?.message } }))
            dispatch({ type: DASHBOARD_CHARTS_SUCCESS, payload: {} });
        }
    }
}

const getLatestProjects = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'dashboard': true }))

            const getLatestProjectsRes = await getLatestProjectsreq();

            dispatch(stopLoading())
            dispatch({ type: DASHBOARD_LATESTS_SUCCESS, payload: getLatestProjectsRes?.data?.data });
        } catch (error) {
            dispatch(stopLoading())
            dispatch(setError({ 'dashboard': { latest: true } }))
            dispatch({ type: DASHBOARD_LATESTS_SUCCESS, payload: [] });
        }
    }
}

const getDashboardData = () => {
    return dispatch => {
        dispatch(getProjectsDetails())
        dispatch(getEmployeesDetails())
        dispatch(getLatestProjects())
        dispatch(getChartsData())
    }
}

export {
    resetProjectsErrors,
    fetchingProjects,
    addNewProject,
    finishProject,
    deleteProject,
    fetchingOneProject,
    // Dashboard routes
    getDashboardData,
    getEmployeesDetails,
    getLatestProjects,
    getChartsData,
    getProjectsDetails,
}