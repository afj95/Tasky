import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { i18n } from '../i18n';
import { reloadAsync } from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import moment from 'moment';

export default useLang = () => {
     const [isLangLoaded, setIsLangLoaded] = React.useState(false);

     React.useEffect(() => {
          async function getLange() {
               try {
                    const lang = await AsyncStorage.getItem('lang')
                    if (lang !== null) {
                         i18n.locale = lang;
                         I18nManager.forceRTL(lang === 'ar');
                         I18nManager.allowRTL(lang === 'ar');
                         moment.locale(lang === 'ar' ? 'ar-sa' : 'en');
                    } else {
                         i18n.locale = 'en';
                         await AsyncStorage.setItem('lang', 'en')
                         moment.locale('en');
                         await reloadAsync()
                    }
               } catch (error) {
                    i18n.locale = 'en';
                    await AsyncStorage.setItem('lang', 'en')
                    moment.locale('en');
                    await reloadAsync()
               } finally {
                    setIsLangLoaded(true)
                    SplashScreen.hideAsync();
               }
          }
          getLange();
     }, [])

     return isLangLoaded;
}