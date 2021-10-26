import {
    fetchingProjectsReq
} from "../../../services/projects-service";
import {
    RESET_PROJECTS_ERRORS,

    FETCHING_PROJECTS,
    FETCHING_PROJECTS_FAILED,
    FETCHING_PROJECTS_SUCCESS
} from "./projects-types"

const resetProjectsErrors = () => {
    return { type: RESET_PROJECTS_ERRORS }
}

const fetchingProjects = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_PROJECTS });

            const fetchingProjectsRes = await fetchingProjectsReq();

            dispatch({
                type: FETCHING_PROJECTS_SUCCESS,
                projects: fetchingProjectsRes?.data?.data?.projects
            })

        } catch (error) {
            dispatch({ type: FETCHING_PROJECTS_FAILED, error: error })
        }
    }
}

export {
    resetProjectsErrors,

    fetchingProjects
}