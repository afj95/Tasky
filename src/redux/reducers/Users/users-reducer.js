import { usersState } from "./users-state";
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
} from "./users-types";

export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';


const usersReducer = (state = usersState, action) => {
    switch (action.type) {
        // case RESET_ERRORS: {
        //     return {
        //         ...state,
        //         fetchSupervisorsError: '',
        //         editEmpSuccess: '',
        //         fetchAllEmployeesError: '',
        //         fetchSupervisorsError: '',
        //         addEmployeeError: '',
        //         addEmployeeSuccess: '',
        //         editEmpSuccess: '',
        //         editEmpError: ''
        //     }
        // }

        // case FETCHING_ALL_EMP: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: true,
        //     }
        // }
        // case FETCHING_ALL_EMP_SUCCESS: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: false,
        //         all_employees: action?.all_employees
        //     }
        // }
        // case FETCHING_ALL_EMP_FAILED: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: false,
        //         fetchAllEmployeesError: action.fetchAllEmployeesError
        //     }
        // }

        // case FETCHING_SUPERVISORS: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: true,
        //     }
        // }
        // case FETCHING_SUPERVISORS_SUCCESS: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: false,
        //         supervisors: action.supervisors
        //     }
        // }
        // case FETCHING_SUPERVISORS_FAILED: {
        //     return {
        //         ...state,
        //         fetchAllEmployeesLoading: false,
        //         supervisors: [],
        //         fetchSupervisorsError: action.fetchSupervisorsError
        //     }
        // }

        // case FETCHING_DELETED_SUCCESS: {
        //     return {
        //         ...state,
        //         deletedEmployees: action.deletedEmployees
        //     }
        // }
        // case FETCHING_DELETED_FAILED: {
        //     return {
        //         ...state,
        //         deletedEmployees: []
        //     }
        // }

        // case FETCHING_UNDELETED_SUCCESS: {
        //     return {
        //         ...state,
        //         undeletedEmployees: action.undeletedEmployees,
        //         fetchAllEmployeesLoading: false,
        //     }
        // }

        // case EDIT_EMPLOYEE: {
        //     return {
        //         ...state,
        //         editEmpLoading: true,
        //         editEmpError: '',
        //         editEmpSuccess: ''
        //     }
        // }
        // case EDIT_EMPLOYEE_SUCCEE: {
        //     return {
        //         ...state,
        //         editEmpLoading: false,
        //         editEmpSuccess: action?.editEmpSuccess
        //     }
        // }
        // case EDIT_EMPLOYEE_FAILED: {
        //     return {
        //         ...state,
        //         editEmpLoading: false,
        //         editEmpError: action?.editEmpError.message
        //     }
        // }

        // case ADD_EMPLOYEE: {
        //     return {
        //         ...state,
        //         addEmployeeLoading: true
        //     }
        // }
        // case ADD_EMPLOYEE_SUCCESS: {
        //     return {
        //         ...state,
        //         addEmployeeLoading: false,
        //         addEmployeeSuccess: action.addEmployeeSuccess
        //     }
        // }
        // case ADD_EMPLOYEE_FAILED: {
        //     return {
        //         ...state,
        //         addEmployeeLoading: false,
        //         addEmployeeError: action?.addEmployeeError
        //     }
        // }



        case EDIT_PROFILE_SUCCESS: {
            return {
                ...state,
                user: action?.payload
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export { usersReducer };