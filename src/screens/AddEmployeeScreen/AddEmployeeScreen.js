import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Formik } from 'formik';
import MyText from '../../components/UI/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { AddEmpoyeeForm, Header } from './components';
import { addEmpoloyee } from '../../redux/reducers/Users/users-actions'
import Colors from '../../utils/Colors';

export const AddEmployeeScreen = () => {
    const dispatch = useDispatch();

    const addEmployeeLoading = useSelector((state) => state?.usersReducer?.addEmployeeLoading)
    const addEmployeeSuccess = useSelector((state) => state?.usersReducer?.addEmployeeSuccess)
    const addEmployeeError = useSelector((state) => state?.usersReducer?.addEmployeeError)

    useEffect(() => {
        if (addEmployeeError) {
            showMessage({
                message: addEmployeeError + '',
                type: 'danger',
                duration: 3000,
                style: { paddingTop: 30 },
                titleStyle: { fontSize: 18 }
            })
        }
        if (addEmployeeSuccess) {
            showMessage({
                message: addEmployeeSuccess + '',
                type: 'success',
                duration: 3000,
                style: { paddingTop: 30 },
                titleStyle: { fontSize: 18 }
            })
        }
    }, [addEmployeeLoading])

    const initialValues = {
        name: '',
        username: '',
    }

    const onSubmit = values => dispatch(addEmpoloyee(values))

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
            <Header text={'addEmployee'} showGoBackButton />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.instractionsView}>
                    <MyText style={styles.instractionsText}>addEmployeeInstractions</MyText>
                    <MyText style={styles.notesText}>addEmployeeNote</MyText>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyles}>
                    <View style={styles.formContainer}>
                        <Formik
                            validate={validate}
                            onSubmit={onSubmit}
                            initialValues={initialValues}>
                            {props => <AddEmpoyeeForm RegisterProps={props} isLoading={addEmployeeLoading} />}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        color: Colors.primary,
        fontFamily: 'bold'
    },
    notesText: {
        fontSize: 10,
        marginStart: 5,
        color: Colors.primary,
        fontFamily: 'light'
    },
    formContainer: {
        width: '90%',
        backgroundColor: Colors.primary,
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 10
    },
})