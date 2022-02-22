import {
    fetchAllEmployeesReq,
    fetchSuperVisorsReq,
    editEmployeeReq
} from '../../../services';
import {
    RESET_ERRORS,

    FETCHING_ALL_EMP,
    FETCHING_ALL_EMP_SUCCESS,
    FETCHING_ALL_EMP_FAILED,

    FETCHING_SUPERVISORS,
    FETCHING_SUPERVISORS_SUCCESS,
    FETCHING_SUPERVISORS_FAILED,

    EDIT_EMPLOYEE,
    EDIT_EMPLOYEE_SUCCEE,
    EDIT_EMPLOYEE_FAILED,
} from './users-types'

const resetUsersErrors = () => {
    return { type: RESET_ERRORS }
}

const fetchAllEmployees = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_ALL_EMP })
            
            const fetchAllEmployeesRes = await fetchAllEmployeesReq();
            
            dispatch({
                type: FETCHING_ALL_EMP_SUCCESS,
                all_employees: fetchAllEmployeesRes?.data?.data?.users
            })
        } catch (error) {
            dispatch({
                type: FETCHING_ALL_EMP_FAILED,
                fetchAllEmployeesError: error
            })
        }
    }
}

const fetchSuperVisors = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_SUPERVISORS })
            
            const fetchSuperVisorsRes = await fetchSuperVisorsReq();
            
            dispatch({
                type: FETCHING_SUPERVISORS_SUCCESS,
                supervisors: fetchSuperVisorsRes?.data?.data?.supervisors
            })
        } catch (error) {
            dispatch({
                type: FETCHING_SUPERVISORS_FAILED,
                fetchSupervisorsError: error
            })
        }
    }
}

const editEmployee = emp_id => {
    return async dispatch => {
        try {
            dispatch({ type: EDIT_EMPLOYEE })

            const editEmployeeRes = await editEmployeeReq(emp_id)

            dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: editEmployeeRes?.data?.data })
        } catch (error) {
            dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
        }
    }
}

export {
    resetUsersErrors,

    fetchAllEmployees,
    fetchSuperVisors,
    editEmployee
}