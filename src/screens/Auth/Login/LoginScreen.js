import React, { useEffect } from 'react';
import { Image } from 'react-native'
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
import { i18n } from '../../../i18n';
import { channel, reloadAsync } from 'expo-updates';
import Colors from '../../../utils/Colors';
import { mainStyles } from '../../../constants';
import { clearErrors } from '../../../redux/reducers/Global/global-actions';
import { showMessage } from '../../../tools';
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
import Errors_codes from '../../../../Errors_codes';

export const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const errors = useSelector((state) => state?.globalReducer?.errors)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        const login = async () => {
            try {
                if (Object.keys(user || {}).length) {
                    await AsyncStorage.setItem('token', user?.token)
                        .then(() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: 'Home' }]
                                })
                            )
                        })
                }
            } catch (error) {
                if (channel[0]?.startsWith('t')) alert('Error asyncStorage ' + JSON.stringify(e));
                else {
                    showMessage({
                        message: t('app.serverError') + ' ' + Errors_codes.login_async_storage,
                        type: 'danger'
                    })
                }
            }

            if (errors?.login) {
                let errorWithCode = t('app.serverError') + ' ' + Errors_codes.login_server_error;
                showMessage({
                    message: !errors?.login?.message ? errorWithCode : errors?.login?.message + '',
                    type: 'danger'
                })
                dispatch(clearErrors());
            }
        }

        login();
    }, [errors, user])

    const initialValues = {
        phone_number: '',
        password: '',
    }
    const devInitialValues = {
        phone_number: '0531119339',
        password: '1234',
    }

    const onSubmit = (values) => {
        dispatch(login(values.phone_number, values.password))
    }

    const validate = (values) => {
        const errors = {}
        if (isNaN(values.phone_number)) {
            errors.phone_number = 'phoneNumbersOnlyNums'
        } else if (values.phone_number?.charAt(0) !== '0') {
            errors.phone_number = 'phonneNumstart'
        } else if (values.phone_number?.length < 10) {
            errors.phone_number = 'phoneNumlength'
        }
        if (!values.phone_number) {
            errors.phone_number = 'required';
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
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: async () => {
                    try {
                        if (I18nManager.isRTL) { // if current is arabic
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
                    } catch (error) {
                        i18n.locale = 'ar';
                        I18nManager.forceRTL(true);
                        I18nManager.allowRTL(true);
                        await AsyncStorage.setItem('lang', 'ar')
                    }
                    await reloadAsync();
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
                <Image source={require('../../../../assets/logo.png')} style={{ width: '100%', height: 60 }} />
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
                        initialValues={__DEV__ || channel[0]?.startsWith('t') ? devInitialValues : initialValues}>
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