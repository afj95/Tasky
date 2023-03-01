import 'react-native-gesture-handler';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import useCachedResources from './src/hooks/useCachedResources';
import useLang from './src/hooks/useLang';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux";
import Loader from "./src/components/Loaders/Loader";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {

  const isLoadingComplete = useCachedResources();
  const isLangLoaded = useLang();

  if (isLoadingComplete && isLangLoaded) {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <MainNavigator />
            <StatusBar style={'auto'} />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    )
  } else return null

}