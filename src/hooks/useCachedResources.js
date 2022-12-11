import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    ...Ionicons.font,
                    'light': require('../../assets/fonts/light.ttf'),
                    'bold': require('../../assets/fonts/bold.ttf')
                })
            } catch (error) {
                console.warn(error);
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, [])


    return isLoadingComplete;
}