import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Formik } from 'formik';
import MyText from '../../components/UI/MyText';
import { useDispatch, useSelector } from 'react-redux';
import { EditEmpoyeeForm, Header } from './components';
import { editEmployee } from '../../redux/reducers/Users/users-actions';
import { showMessage } from 'react-native-flash-message';
import Colors from '../../utils/Colors';
import { mainStyles } from '../../constants';

export const EditEmployeeScreen = ({ route: { params: { employee } } }) => {
    const dispatch = useDispatch();

    const editEmpLoading = useSelector(state => state.usersReducer.editEmpLoading);
    const editEmpSuccess = useSelector(state => state.usersReducer.editEmpSuccess);
    const editEmpError = useSelector(state => state.usersReducer.editEmpError);

    useEffect(() => {
        if (editEmpSuccess) {
            showMessage({
                message: 'success',
                type: 'success',
            })
        } else if (editEmpError) {
            showMessage({
                message: editEmpError,
                type: 'danger',
            })
        }
    }, [editEmpLoading])

    const initialValues = {
        name: employee.name,
        username: employee.username,
        password: employee.password ? employee.password : null,
        phoneNumber: employee.phoneNumber
    }

    const onSubmit = values => {
        const user = {
            _id: employee._id,
            newEmp: values
        }
        dispatch(editEmployee(user))
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'required'
        }
        if (!values.username) {
            errors.username = 'required';
        } else if (isNaN(values.username)) {
            errors.username = 'onlyNumbers'
        } else if (values.username.charAt(0) !== '0') {
            errors.username = 'phonneNumstart'
        } else if (values.username.length < 10) {
            errors.username = 'phoneNumlength'
        }
        return errors;
    };

    return (
        <View style={styles.container}>
            <Header text={'editEmployee'} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.instractionsView}>
                    <MyText style={styles.instractionsText}>editEmployeeInstractions</MyText>
                </View>
                <View style={styles.formContainer}>
                    <Formik
                        validate={validate}
                        onSubmit={onSubmit}
                        initialValues={initialValues}>
                        {props => <EditEmpoyeeForm RegisterProps={props} isLoading={false} />}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appWhite
    },
    scrollStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    instractionsView: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25
    },
    instractionsText: {
        fontSize: 18,
        fontFamily: 'bold',
        color: Colors.primary
    },
    notesText: {
        fontSize: 10,
        marginStart: 5,
        color: '#333'
    },
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 10,
        ...mainStyles.viewShadow
    },
})