import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux";
import Loader from "./src/components/Loaders/Loader";

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}