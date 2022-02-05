import React, { useEffect } from 'react'
import { Formik } from 'formik';
import { AddProjectForm, Header } from './components';
import { addNewProject, resetProjectsErrors } from '../../redux/reducers/Projects/projects-actions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { t } from '../../i18n';

export const AddProjectScreen = () => {
    const dispatch = useDispatch();

    const addProjectResponse = useSelector(state => state.projectsReducer.addProjectResponse)
    const fetchingProjectsLoading = useSelector(state => state?.projectsReducer?.fetchingProjectsLoading)

    const validate = (values) => {
        const errors = {};
        if(!values?.projectName1) {
            errors.projectName1 = 'fieldRequired'
        }
        if(!values?.projectName2) {
            errors.projectName2 = 'fieldRequired'
        }
        if(!values?.projectSupervisors) {
            errors.projectSupervisors = 'fieldRequired'
        }
        if(!values?.projectDescription) {
            errors.projectDescription = 'fieldRequired'
        }
        return errors;
    };

    useEffect(() => {
        if(addProjectResponse === true) {
            showMessage({
                message: t('app.projectAddedSuccess'),
                type: 'success',
                duration: 1500,
                style: { paddingTop: 40 }
            })
        } else if(addProjectResponse === false) {
            showMessage({
                message: t('app.projectNotAdded'),
                type: 'danger',
                duration: 1500,
                style: { paddingTop: 40, textAlign: 'left', alignItems: 'center' }
            })
        }
        dispatch(resetProjectsErrors());
    }, [addProjectResponse])

    const onSubmit = (values) => {
        dispatch(addNewProject(values))
        console.log(`values`, values)
    }

    const initialValues = {
        projectName1: '',
        projectName2: '',
        projectSupervisors: '',
        projectDescription: ''
    }

    return (
        <Formik
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}>
            {props => 
                <>
                    <Header title={'addProject'} onPress={props?.handleSubmit} isLoading={fetchingProjectsLoading} />
                    <AddProjectForm addProjectProps={props} />
                </>
            }
        </Formik>
    )
}