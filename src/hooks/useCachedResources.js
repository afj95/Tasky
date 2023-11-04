import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { loadAsync } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import moment from 'moment';
import { i18n } from '../i18n';

export const useCachedResources = () => {
    const [loadingCompleted, setLoadingCompleted] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        (async () => {
            SplashScreen.preventAutoHideAsync();
            try {
                // Loading fonts
                await loadAsync({
                    light: require('../../assets/fonts/light.otf'),
                    bold: require('../../assets/fonts/bold.otf'),
                    ...FontAwesome.font,
                })

                // Loading lang
                const lang = await AsyncStorage.getItem('lang');
                if (lang !== null) {
                    i18n.locale = lang;
                    I18nManager.forceRTL(lang === 'ar');
                    I18nManager.allowRTL(lang === 'ar');
                    moment.locale(lang === 'ar' ? 'ar-sa' : 'en');
                } else {
                    i18n.locale = 'en';
                    I18nManager.forceRTL(false);
                    I18nManager.allowRTL(false);
                    await AsyncStorage.setItem('lang', 'en');
                    moment.locale('en');
                }
                setLoadingCompleted(true);
            } catch (error) {
                setHasError(true);
                console.log('Error', error);
                i18n.locale = 'en';
                await AsyncStorage.setItem('lang', 'en');
                moment.locale('en');
            } finally {
                SplashScreen.hideAsync();
            }
        })()

    }, [])

    return [loadingCompleted, hasError];
}