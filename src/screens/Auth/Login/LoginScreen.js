import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { LoginForm } from './components';
import MyText from '../../../components/UI/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../../redux/reducers/Auth/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../../i18n';
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { reloadAsync } from 'expo-updates';
import Colors from '../../../utils/Colors';
import { mainStyles } from '../../../constants';
import { clearErrors } from '../../../redux/reducers/Global/global-actions';
import { showMessage } from '../../../tools/showMessage';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
    I18nManager,
    StatusBar
} from 'react-native';

export const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const errors = useSelector((state) => state?.globalReducer?.errors)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        if (Object.keys(user || {}).length) {
            if (user?.role === 'admin') {
                showMessage({
                    message: 'You are an admin!',
                    description: 'Admin screens not ready yet!',
                    type: 'info',
                    duration: 5000,
                    autoHide: false
                })
            } else {
                AsyncStorage.setItem('token', user?.token).then(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Home' }]
                        })
                    )
                }).catch(e => { })
            }
        }

        if (errors?.login) {
            showMessage({
                message: errors?.login?.message ? errors?.login?.message : errors?.login + '',
                type: 'danger',
            })
            dispatch(clearErrors());
        }
    }, [errors, user])

    const initialValues = {
        email: '',
        password: '',
    }
    const devInitialValues = {
        email: 'ahmad@gmail.com',
        password: '12341234',
    }

    const onSubmit = (values) => {
        dispatch(login(values.email, values.password))
    }

    const validate = (values) => {
        const errors = {}
        if (!values.email) {
            errors.email = 'required';
        }
        // Checking password
        if (!values.password) {
            errors.password = 'required';
        }
        // else if (values.password.length < 8) {
        //     errors.password = 'passwordLength';
        // }
        return errors;
    };

    const onChangeLanguagePressed = () => {
        Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
            {
                style: 'cancel',
                text: t('app.cancel')
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
                <MyText style={styles.welcomeText}>welcomeBack</MyText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle}>
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
                        <MyText style={styles.loginText}>login</MyText>
                    </View>
                    <Formik
                        /*
                            * 'validate' better than 'validationSchema'
                            * cuz validation in schema can't sort which 
                            * validate fun will start first.
                        */
                        validate={validate}
                        onSubmit={onSubmit}
                        initialValues={__DEV__ ? devInitialValues : initialValues}>
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
        backgroundColor: Colors.appWhite
    },
    welcomeContainer: {
        height: '20%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    welcomeText: {
        fontSize: 35,
        color: Colors.primary,
        fontFamily: 'bold'
    },
    changeLanguage: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    changeLanguageText: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.appWhite,
        fontFamily: 'bold'
    },
    loginText: {
        marginBottom: 25,
        fontSize: 18,
        color: Colors.appWhite,
        fontFamily: 'bold'
    },
    scrollStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '90%',
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
        ...mainStyles.viewShadow
    },
})