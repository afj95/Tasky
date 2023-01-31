import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { i18n } from '../i18n';
import { reloadAsync } from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';

export default useLang = () => {
     const [isLangLoaded, setisLangLoaded] = React.useState(false);

     React.useEffect(() => {
          async function getLange() {
               try {
                    const lang = await AsyncStorage.getItem('lang')
                    if (lang !== null) {
                         i18n.locale = lang;
                         I18nManager.forceRTL(lang === 'ar');
                         I18nManager.allowRTL(lang === 'ar');
                    } else {
                         i18n.locale = 'en';
                         await AsyncStorage.setItem('lang', 'en')
                         await reloadAsync()
                    }
               } catch (error) {
                    i18n.locale = 'en';
                    await AsyncStorage.setItem('lang', 'en')
                    await reloadAsync()
               } finally {
                    setisLangLoaded(true)
                    SplashScreen.hideAsync();
               }
          }
          getLange();
     }, [])

     return isLangLoaded;
}