import 'react-native-gesture-handler';
import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux";
import Loader from "./src/components/Loaders/Loader";
import Colors from './src/utils/Colors';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.appWhite }}>
      <ReduxProvider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <MainNavigator />
          <StatusBar style={'auto'} />
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}