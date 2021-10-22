import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </SafeAreaProvider>
  )
}