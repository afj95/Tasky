import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            await Font.loadAsync({
                light: require('../../assets/fonts/light.ttf'),
                bold: require('../../assets/fonts/bold.ttf')
            })
                .then(value => {
                    if (__DEV__) {
                        console.log('Finished loading fonts');
                        console.log('value', value);
                    }
                })
                .catch(reason => {
                    if (__DEV__) {
                        console.log('Failed loading fonts');
                        console.log('reason', reason);
                    }
                })
                .finally(() => {
                    setLoadingComplete(true)
                    SplashScreen.hideAsync();
                })
        }

        loadResourcesAndDataAsync();
    }, [])


    return isLoadingComplete;
}