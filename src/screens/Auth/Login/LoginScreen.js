import React, { useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, I18nManager } from 'react-native';
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
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { reloadAsync } from 'expo-updates';
import Colors from '../../../utils/Colors';

export const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const authStatus = useSelector((state) => state?.authReducer?.authStatus)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        dispatch(resetAuth())
    }, [])

    useEffect(() => {
        switch (authStatus.status) {
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
                            routes: [{ name: 'Home' }]
                        })
                    )
                }).catch(e => {
                    showMessage({
                        message: t('app.serverError'),
                        titleStyle: { textAlign: 'left' },
                        type: 'danger',
                        duration: 3000,
                        style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                    })
                })
                break;
            case 403:
                showMessage({
                    message: authStatus.message,
                    titleStyle: { textAlign: 'left' },
                    type: 'danger',
                    duration: 3000,
                    style: { paddingTop: 33, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }
                })
                break;
            case 404:
                showMessage({
                    message: authStatus.message,
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
        dispatch(login(values.username, values.password))
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'required';
        } else if (isNaN(values.username)) {
            errors.username = 'phoneNumbersOnlyNums'
        } else if (values.username.charAt(0) !== '0') {
            errors.username = 'phonneNumstart'
        } else if (values.username.length < 10) {
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

    const onChangeLanguagePressed = () => {
        Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
            {
                style: 'cancel',
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: () => {
                    AsyncStorage.getItem('lang', async (error, lang) => {
                        if (error) {
                            i18n.locale = "ar";
                            I18nManager.forceRTL(true);
                            I18nManager.allowRTL(true);
                        }
                        if (lang === 'ar') {
                            i18n.locale = 'en';
                            I18nManager.forceRTL(false);
                            I18nManager.allowRTL(false);
                            await AsyncStorage.setItem('lang', 'en')
                        } else {
                            i18n.locale = 'ar';
                            I18nManager.forceRTL(true);
                            I18nManager.allowRTL(true);
                            await AsyncStorage.setItem('lang', 'ar')
                        }
                        reloadAsync();
                    })
                }
            }
        ],
            {
                /** @platform android */
                cancelable: true,
            })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.welcomeContainer}>
                <MyText style={{ fontSize: 33 }}>welcomeBack</MyText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.formContainer}>
                    <TouchableOpacity activeOpacity={0.8} onPress={onChangeLanguagePressed} style={styles.changeLanguage}>
                        <FontAwesome
                            name="language"
                            size={18}
                            color={Colors.appWhite}
                        />
                        <MyText style={styles.changeLanguageText} text={I18nManager.isRTL ? `تغيير\nاللغة` : `change\nLanguage`} />
                    </TouchableOpacity>
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
                        {(props) => <LoginForm loginProps={props} />}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    welcomeContainer: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeLanguage: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    changeLanguageText: {
        fontSize: 10,
        textAlign: 'center'
    },
    formContainer: {
        width: '90%',
        backgroundColor: Colors.secondary,
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