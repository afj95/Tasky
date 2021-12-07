import React, { useState } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../../utils/Colors';
import { MainHeader } from '../../components/UI/MainHeader';
import { Formik } from 'formik';
import { AddProjectForm, Header } from './components';
import { TextInput } from 'react-native-paper';
import { t } from '../../i18n';

export const AddProjectScreen = () => {

    const [submit, handleSubmit] = useState(null);

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
        return errors;
    };

    const onSubmit = (values) => {
        // dispatch
        console.log(`values`, values)
    }

    const initialValues = {
        projectName1: '',
        projectName2: '',
        supervisor: '',
        projectDescription: '',
        tasks: [],
    }

    return (
        <Formik
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}>
            {props => 
                <>
                    <Header title={'addProject'} onPress={props?.handleSubmit} />
                    <AddProjectForm addProjectProps={props} />
                </>
            }
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: Colors.bg
    }
})