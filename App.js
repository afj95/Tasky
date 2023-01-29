import 'react-native-gesture-handler';
import React from "react";
import { Text } from 'react-native'
import MainNavigator from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux";
import Loader from "./src/components/Loaders/Loader";
import { StatusBar } from 'expo-status-bar';
import useCachedResources from './src/hooks/useCachedResources';

export default function App() {

  React.useEffect(() => {
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
    }
  }, [])

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <MainNavigator />
            <StatusBar style={'light'} />
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    )
  }
}