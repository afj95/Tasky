import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loaders/Loader';
import { ErrorScreen } from '../screens/ErrorScreen';
import { i18n } from '../i18n';
// Navigators
import { AuthStackScreens, MainStackScreens } from './Navigators';
import FlashMessage from 'react-native-flash-message';
import { I18nManager } from 'react-native';
import { showMessage } from '../tools';
import { clearErrors } from '../redux/reducers/Global/global-actions';
import { t } from '../i18n';

const MainStack = createStackNavigator();
const MainNavigator = () => {
    const dispatch = useDispatch();

    const [initialRouteName, setInitialRouteName] = useState('');
    const [screenToShow, setScreenToShow] = useState(<Loader />);

    const user = useSelector((state) => state?.authReducer?.user);
    const errors = useSelector((state) => state?.globalReducer?.errors)

    useEffect(() => {
        if (errors?.general) {
            showMessage({
                message: t('app.serverError') + '',
                type: 'danger'
            })
        }
        dispatch(clearErrors());
    }, [errors?.general])

    useEffect(() => {
        (async () => {
            await AsyncStorage.getItem('lang', (error, lang) => {
                if (error) {
                    i18n.locale = "ar";
                    I18nManager.forceRTL(true);
                    I18nManager.allowRTL(true);
                }
                if (lang) {
                    i18n.locale = lang;
                    I18nManager.forceRTL(lang === 'ar');
                    I18nManager.allowRTL(lang === 'ar');
                }
            })
        })()
    }, [])

    useEffect(() => {
        (async () => {
            // Checking the token
            await AsyncStorage.getItem('token', (error, token) => {
                if (error) {
                    setInitialRouteName('Auth')
                } else if (token) {
                    // In case of there is a token
                    if (Object.keys(user || {}).length) {
                        // Checking if the user saved in redux
                        setInitialRouteName('Home')
                    } else {
                        setInitialRouteName('Auth')
                    }
                } else {
                    // In case of no token founded
                    setInitialRouteName('Auth')
                }
            })
        })()
    }, [initialRouteName])

    if (!initialRouteName) {
        setTimeout(() => {
            setScreenToShow(<ErrorScreen />)
        }, 10000) // After 5 seconds if the initialRouteName not modified it will show error screen
        return screenToShow
    } else {
        return (
            <NavigationContainer ref={navigationRef}>
                <MainStack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{ headerShown: false }}>
                    <MainStack.Screen name={'Auth'} component={AuthStackScreens} />
                    <MainStack.Screen name={'Home'} component={MainStackScreens} />
                </MainStack.Navigator>
                <FlashMessage ref={ref => (global["flash"] = ref)} position="top" />
            </NavigationContainer>
        )
    }
}

export default MainNavigator;