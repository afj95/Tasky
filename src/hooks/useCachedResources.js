import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    light: require('../../assets/fonts/light.otf'),
                    bold: require('../../assets/fonts/bold.otf')
                })

            } catch (error) {
                console.warn(error);
            } finally {
                setLoadingComplete(true)
            }
        }

        loadResourcesAndDataAsync();
    }, [])

    return isLoadingComplete;
}