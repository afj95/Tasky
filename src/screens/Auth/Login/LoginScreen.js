import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';  
import { LoginForm } from './components';
import MyText from '../../../components/UI/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { login, resetAuth } from '../../../redux/reducers/Auth/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../../i18n';

export const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const authStatus = useSelector((state) => state?.authReducer?.authStatus)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        dispatch(resetAuth())
    }, [])
    
    useEffect(() => {
        switch(authStatus) {
            case 200:
                showMessage({
                    message: t('app.loggedinSuccessfully'),
                    titleStyle: { textAlign: 'left' },
                    type: 'success',
                    duration: 3000,
                    style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                })
            AsyncStorage.setItem('token', user?.token).then(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [ { name: 'Home' } ]
                    })
                )
            })
            break;
            case 403:
                showMessage({
                    message: t('app.wrongPassword'),
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000,
                    style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                })
            break;
            case 404:
                showMessage({
                    message: t('app.notFoundedUser'),
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000,
                    style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                })
            break;
            case 500:
                showMessage({
                    message: t('app.serverError'),
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000,
                    style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                })
                break;
            }
        dispatch(resetAuth());
    }, [authStatus, user])

    const initialValues = {
        username: '',
        password: '',
    }

    const onSubmit = (values) => {
        dispatch(login(values.username, values.password ))
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) {
          errors.username = 'required';
        } else if(isNaN(values.username)) {
            errors.username = 'phoneNumbersOnlyNums'
        } else if(values.username.charAt(0) !== '0') {
            errors.username = 'phonneNumstart'
        } else if(values.username.length < 10) {
            errors.username = 'phoneNumlength'
        }
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
                <MyText style={{ fontSize: 33 }}>welcomeBack</MyText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.formContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <MyText style={{ marginBottom: 20, fontSize: 18 }}>login</MyText>
                    </View>
                    <Formik
                        /*
                        // 'validate' better the 'validationSchema'
                        // cuz validation in schema can't sort which 
                        // validate fun will start first.
                        */
                        validate={validate}
                        onSubmit={onSubmit}
                        initialValues={initialValues}>
                        {(props) => <LoginForm loginProps={props} /> }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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