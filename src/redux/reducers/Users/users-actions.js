// import {
//     fetchAllEmployeesReq,
//     fetchSuperVisorsReq,
//     editEmployeeReq,
//     addEmployeeReq, 
//     deleteEmployeeReq,
//     undoDeleteEmployeeReq,
//     fetchDeletedEmployeesReq,
//     fetchUndeletedEmployeesReq
// } from './requests';
// import {
//     RESET_ERRORS,

import { request } from "../../../tools";
import { fetchProfile } from "../Auth/auth-actions";
import { setLoading, stopLoading } from "../Global/global-actions"
import { EDIT_PROFILE_SUCCESS, FETCHING_EMPLOYEES_SUCCESS, FETCHING_USERS_SUCCESS, RESET } from "./users-reducer";

//     FETCHING_ALL_EMP,
//     FETCHING_ALL_EMP_SUCCESS,
//     FETCHING_ALL_EMP_FAILED,

//     FETCHING_SUPERVISORS,
//     FETCHING_SUPERVISORS_SUCCESS,
//     FETCHING_SUPERVISORS_FAILED,

//     FETCHING_DELETED_SUCCESS,
//     FETCHING_DELETED_FAILED,

//     EDIT_EMPLOYEE,
//     EDIT_EMPLOYEE_SUCCEE,
//     EDIT_EMPLOYEE_FAILED,

//     ADD_EMPLOYEE,
//     ADD_EMPLOYEE_SUCCESS,
//     ADD_EMPLOYEE_FAILED,
//     FETCHING_UNDELETED_SUCCESS,
// } from './users-types'

// export const resetUsersErrors = () => {
//     return { type: RESET_ERRORS }
// }

// // ADMIN
export const fetchAllEmployees = ({ refresh = false }) => {
    return async (dispatch) => {
        try {
            if (refresh) {
                dispatch(setLoading({ 'employees_refresh': true }))
            } else {
                dispatch(setLoading({ 'employees': true }))
            }

            const fetchAllEmployeesRes = await request({
                url: `employees`,
                method: 'GET'
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCHING_EMPLOYEES_SUCCESS,
                payload: { all_employees: fetchAllEmployeesRes?.data },
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'employees': error } }))
        }
    }
}

export const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ 'users': true }))

            const fetchAllUsersRes = await request({
                url: `users/`,
                method: 'GET'
            })

            dispatch(stopLoading())
            dispatch({
                type: FETCHING_USERS_SUCCESS,
                payload: {
                    all_users: fetchAllUsersRes?.data,
                },
            })
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'users': error } }))
        }
    }
}

// export const fetchSuperVisors = () => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: FETCHING_SUPERVISORS })

//             const fetchSuperVisorsRes = await fetchSuperVisorsReq();

//             dispatch({
//                 type: FETCHING_SUPERVISORS_SUCCESS,
//                 supervisors: fetchSuperVisorsRes?.data?.data?.supervisors
//             })
//         } catch (error) {
//             dispatch({
//                 type: FETCHING_SUPERVISORS_FAILED,
//                 fetchAllEmployeesError: error
//             })
//         }
//     }
// }

// export const fetchUndeletedEmployees = () => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: FETCHING_ALL_EMP })

//             const fetchUndeletedEmployeesRes = await fetchUndeletedEmployeesReq();

//             dispatch({
//                 type: FETCHING_UNDELETED_SUCCESS,
//                 undeletedEmployees: fetchUndeletedEmployeesRes?.data?.data?.undeletedUsers
//             })
//         } catch (error) {
//             dispatch({
//                 type: FETCHING_ALL_EMP_FAILED,
//                 fetchAllEmployeesError: error
//             })
//         }
//     }
// }

// export const fetchDeletedEmployees = () => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: FETCHING_ALL_EMP })

//             const fetchDeletedEmployeesRes = await fetchDeletedEmployeesReq();

//             dispatch({
//                 type: FETCHING_DELETED_SUCCESS,
//                 deletedEmployees: fetchDeletedEmployeesRes?.data?.data?.deletedUsers
//             })
//         } catch (error) {
//             dispatch({
//                 type: FETCHING_ALL_EMP_FAILED,
//                 fetchAllEmployeesError: error
//             })
//         }
//     }
// }

// export const addEmpoloyee = async (values) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: ADD_EMPLOYEE })

//             const editEmployeeRes = await addEmployeeReq(values)

//             dispatch({ type: ADD_EMPLOYEE_SUCCESS, addEmployeeSuccess: editEmployeeRes.data?.message })
//             dispatch(resetUsersErrors())
//             dispatch(fetchAllEmployees())
//             dispatch(resetUsersErrors())
//         } catch (error) {
//             dispatch({ type: ADD_EMPLOYEE_FAILED, addEmployeeError: error.message })
//             dispatch(resetUsersErrors())
//         }
//     }
// }

// export const editEmployee = async (values) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: EDIT_EMPLOYEE })

//             const editEmployeeRes = await editEmployeeReq(values)

//             dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: editEmployeeRes?.data?.data })
//             dispatch(resetUsersErrors())
//             dispatch(fetchAllEmployees())
//             dispatch(fetchSuperVisors())
//         } catch (error) {
//             dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
//         }
//     }
// }

// export const deleteEmployee = async (emp_id) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: EDIT_EMPLOYEE })

//             const deleteEmployeeRes = await deleteEmployeeReq(emp_id)

//             dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: deleteEmployeeRes?.data?.data })
//             dispatch(resetUsersErrors())
//             dispatch(fetchAllEmployees())
//             dispatch(fetchSuperVisors())
//         } catch (error) {
//             dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
//         }
//     }
// }

// export const restoreEmployee = async (emp_id) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: EDIT_EMPLOYEE })

//             const deleteEmployeeRes = await undoDeleteEmployeeReq(emp_id)

//             dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: deleteEmployeeRes?.data?.data })
//             dispatch(resetUsersErrors())
//             dispatch(fetchAllEmployees())
//             dispatch(fetchSuperVisors())
//         } catch (error) {
//             dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
//         }
//     }
// }

// ============================================================================

// Supervisors actions

export const resetUserErrors = () => ({
    type: RESET
})


export const editProfile = (user_id, params) => {
    return async dispatch => {
        try {
            dispatch(setLoading({ 'edit_profile': true }));

            const editProfileRes = await request({
                url: `users/${user_id}`,
                method: 'PUT',
                params
            })

            dispatch(stopLoading())
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: editProfileRes?.data?.data
            })
            dispatch(fetchProfile())
        } catch (error) {
            dispatch(stopLoading({ failed: true, error: { 'edit_profile': error.message } }))
        }
    }
}
