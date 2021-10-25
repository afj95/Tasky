import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Formik } from 'formik';  
import { RegisterForm } from './components';
import MyText from '../../../components/UI/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import { resetAuth, register } from '../../../redux/reducers/Auth/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { t } from '../../../i18n';

export const RegisterScreen = () => {
    const dispatch = useDispatch();

    const authStatus = useSelector((state) => state?.authReducer?.authStatus)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        switch(authStatus) {
            case 201:
                showMessage({
                    message: t('app.registeredSuccessfully'),
                    titleStyle: { textAlign: 'left' },
                    type: 'success',
                    duration: 3000
                })
                // TODO: Store token and navigate to home
            break;
            case 409:
                showMessage({
                    message: t('app.registeringDuplicate'),
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000
                })
            break;
            case 500:
                showMessage({
                    message: t('app.serverError'),
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000
                })
            break;
        }
        dispatch(resetAuth());
    }, [authStatus, user])

    const initialValues = {
        name: '',
        username: '',
        password: '',
    }

    const onSubmit = (values) => dispatch(register(values))

    const validate = (values) => {
        const errors = {};
        if(!values.name) {
            errors.name = 'required'
        }
        if (!values.username) {
          errors.username = 'required';
        } else if(isNaN(values.username)) {
            errors.username = 'onlyNumbers'
        } else if(values.username.charAt(0) !== '0') {
            errors.username = 'phonneNumstart'
        } else if(values.username.length < 10) {
            errors.username = 'phoneNumlength'
        }
        // if(!values.email) {
        //     errors.email = 'required'
        // } else if(!values.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
        //     errors.email = 'notValidEmail'
        // }
        // Checking password
        if (!values.password) {
            errors.password = 'required';
        } else if (values.password.length < 8) {
            errors.password = 'passwordLength';
        }
        return errors;
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.welcomeContainer}>
                <MyText style={{ fontSize: 33 }}>welcome</MyText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.formContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <MyText style={{ marginBottom: 20, fontSize: 18 }}>signup</MyText>
                    </View>
                    <Formik
                        validate={validate}
                        onSubmit={onSubmit}
                        // onSubmit={() => console.log('fuck')}
                        initialValues={initialValues}>
                        {props => {
                            return <RegisterForm RegisterProps={props} /> 
                        }}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    welcomeContainer: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
        // shadow
        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
})