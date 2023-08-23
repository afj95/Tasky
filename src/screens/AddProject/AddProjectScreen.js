import React, { useEffect, useRef } from 'react'
import { Formik } from 'formik';
import { AddProjectForm } from './components';
import { resetProject, addNewProject } from '../../redux/reducers/Projects/projects-actions';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { MainHeader } from '../../components/UI/MainHeader';
import { showMessage } from '../../tools';

export const AddProjectScreen = () => {
    const _form = useRef(null);

    const dispatch = useDispatch();

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    useEffect(() => {
        dispatch(resetProject())
    }, [])

    useEffect(() => {
        if (errors?.add_project) {
            showMessage({
                message: errors?.add_project,
                type: 'danger'
            })
        }
    }, [loadings?.add_project])

    const validate = (values) => {
        const errors = {};
        if (!values?.projectName) {
            errors.projectName = 'fieldRequired'
        }
        if (!values?.projectSupervisors) {
            errors.projectSupervisors = 'fieldRequired'
        }
        if (!values?.projectStatus) {
            errors.projectStatus = 'fieldRequired'
        }
        return errors;
    };

    const onSubmit = (values) => {
        const {
            projectName,
            projectSupervisors,
            projectDescription,
            showed,
            projectStatus,
            startDate
        } = values;

        dispatch(addNewProject({
            name: projectName,
            user_id: projectSupervisors,
            description: projectDescription,
            showed,
            status: projectStatus,
            start_date: startDate
        }))

    }

    const initialValues = {
        projectName: '',
        projectSupervisors: '',
        projectDescription: '',
        showed: false,
        projectStatus: '',
        startDate: new Date(),
    }

    const resetForm = () => _form?.current?.resetForm();

    return (
        <Formik
            innerRef={_form}
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}>
            {props =>
                <View style={{ flex: 1 }}>
                    {/* <Header title={'addProject'} onPress={props?.handleSubmit} isLoading={fetchingProjectsLoading} /> */}
                    <MainHeader title={'addProject'} translate showGoBack />
                    <AddProjectForm loadings={loadings} resetForm={resetForm} addProjectProps={props} />
                </View>
            }
        </Formik>
    )
}