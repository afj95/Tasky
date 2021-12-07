import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { store } from '../redux';
import { Provider, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loaders/Loader';
import { ErrorScreen } from '../screens/ErrorScreen';
import i18n from 'i18n-js';
// Navigators
import {
    AuthStackScreens,
    HomeStackScreens
} from './Navigators';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { I18nManager } from 'react-native';

const MainStack = createStackNavigator();
const MainNavigator = () => {
    const [initialRouteName, setInitialRouteName] = useState('')
    const [screenToShow, setScreenToShow] = useState(<Loader />);

    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        // Checking the token
        AsyncStorage.getItem('token', (error, token) => {
            if(error) {
                console.log(`error while getting the token`, error)
                setInitialRouteName('Auth')
            } else if(token) { 
                // console.log(`token`, token)
                
                // In case of there is a token
                if(user && Object.keys(user).length > 0) {
                    // Checking if the user saved in redux
                    setInitialRouteName('Home')
                } else {
                    console.log('no user')
                    setInitialRouteName('Auth')
                }
            } else {
                // In case of no token founded
                console.log('no token')
                setInitialRouteName('Auth')
            }
        })
        AsyncStorage.getItem('lang', (error, lang) => {
            if(error) {
                i18n.locale = "ar";
                I18nManager.forceRTL(true);
                I18nManager.allowRTL(true);
            } else if(lang) {
                i18n.locale = lang;
                I18nManager.forceRTL(lang === 'ar');
                I18nManager.allowRTL(lang === 'ar');
            }
        })
    }, [initialRouteName])

    if(!initialRouteName) {
        setTimeout(() => {
          setScreenToShow(<ErrorScreen />)
        }, 5000) // After 5 seconds if the initialRouteName not modified it will show error screen
        return screenToShow
    } else {
        return (
            <NavigationContainer ref={navigationRef}>
                <MainStack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{ headerShown: false }} >
                    <MainStack.Screen name={'Auth'} component={AuthStackScreens} />
                    <MainStack.Screen name={'Home'} component={HomeStackScreens} />
                </MainStack.Navigator>
                <StatusBar style={'auto'} />
                <FlashMessage position={'top'} />
            </NavigationContainer>
        )
    }
}

export default MainNavigator;