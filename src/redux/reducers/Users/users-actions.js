import {
    fetchAllEmployeesReq,
    fetchSuperVisorsReq,
    editEmployeeReq,
    addEmployeeReq, 
    deleteEmployeeReq,
    undoDeleteEmployeeReq,
    fetchDeletedEmployeesReq,
    fetchUndeletedEmployeesReq
} from './requests';
import {
    RESET_ERRORS,

    FETCHING_ALL_EMP,
    FETCHING_ALL_EMP_SUCCESS,
    FETCHING_ALL_EMP_FAILED,

    FETCHING_SUPERVISORS,
    FETCHING_SUPERVISORS_SUCCESS,
    FETCHING_SUPERVISORS_FAILED,

    FETCHING_DELETED_SUCCESS,
    FETCHING_DELETED_FAILED,

    EDIT_EMPLOYEE,
    EDIT_EMPLOYEE_SUCCEE,
    EDIT_EMPLOYEE_FAILED,

    ADD_EMPLOYEE,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILED,
    FETCHING_UNDELETED_SUCCESS,
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
                fetchAllEmployeesError: error
            })
        }
    }
}

const fetchUndeletedEmployees = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_ALL_EMP })
            
            const fetchUndeletedEmployeesRes = await fetchUndeletedEmployeesReq();
            
            dispatch({
                type: FETCHING_UNDELETED_SUCCESS,
                undeletedEmployees: fetchUndeletedEmployeesRes?.data?.data?.undeletedUsers
            })
        } catch (error) {
            dispatch({
                type: FETCHING_ALL_EMP_FAILED,
                fetchAllEmployeesError: error
            })
        }
    }
}

const fetchDeletedEmployees = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCHING_ALL_EMP })
            
            const fetchDeletedEmployeesRes = await fetchDeletedEmployeesReq();
            
            dispatch({
                type: FETCHING_DELETED_SUCCESS,
                deletedEmployees: fetchDeletedEmployeesRes?.data?.data?.deletedUsers
            })
        } catch (error) {
            dispatch({
                type: FETCHING_ALL_EMP_FAILED,
                fetchAllEmployeesError: error
            })
        }
    }
}

const addEmpoloyee = async (values) => {
    return async dispatch => {
        try {
            dispatch({ type: ADD_EMPLOYEE })

            const editEmployeeRes = await addEmployeeReq(values)

            dispatch({ type: ADD_EMPLOYEE_SUCCESS, addEmployeeSuccess: editEmployeeRes.data?.message })
            dispatch(resetUsersErrors())
            dispatch(fetchAllEmployees())
            dispatch(resetUsersErrors())
        } catch (error) {
            dispatch({ type: ADD_EMPLOYEE_FAILED, addEmployeeError: error.message })
            dispatch(resetUsersErrors())
        }
    }
}

const editEmployee = async (values) => {
    return async dispatch => {
        try {
            dispatch({ type: EDIT_EMPLOYEE })

            const editEmployeeRes = await editEmployeeReq(values)

            dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: editEmployeeRes?.data?.data })
            dispatch(resetUsersErrors())
            dispatch(fetchAllEmployees())
            dispatch(fetchSuperVisors())
        } catch (error) {
            dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
        }
    }
}

const deleteEmployee = async (emp_id) => {
    return async dispatch => {
        try {
            dispatch({ type: EDIT_EMPLOYEE })

            const deleteEmployeeRes = await deleteEmployeeReq(emp_id)

            dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: deleteEmployeeRes?.data?.data })
            dispatch(resetUsersErrors())
            dispatch(fetchAllEmployees())
            dispatch(fetchSuperVisors())
        } catch (error) {
            dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
        }
    }
}

const restoreEmployee = async (emp_id) => {
    return async dispatch => {
        try {
            dispatch({ type: EDIT_EMPLOYEE })

            const deleteEmployeeRes = await undoDeleteEmployeeReq(emp_id)

            dispatch({ type: EDIT_EMPLOYEE_SUCCEE, editEmpSuccess: deleteEmployeeRes?.data?.data })
            dispatch(resetUsersErrors())
            dispatch(fetchAllEmployees())
            dispatch(fetchSuperVisors())
        } catch (error) {
            dispatch({ type: EDIT_EMPLOYEE_FAILED, editEmpError: error })
        }
    }
}

export {
    resetUsersErrors,

    fetchAllEmployees,
    fetchSuperVisors,
    fetchDeletedEmployees,
    fetchUndeletedEmployees,
    addEmpoloyee,
    editEmployee,
    deleteEmployee,
    restoreEmployee
}