import 'react-native-gesture-handler';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import useCachedResources from './src/hooks/useCachedResources';
import useLang from './src/hooks/useLang';
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation/MainNavigator";
import Colors from './src/utils/Colors';
import { ErrorScreen } from './src/screens/ErrorScreen';

export default function App() {

  const { isLoadingComplete, hasError: hasFontsError } = useCachedResources();
  const { isLangLoaded, hasError: hasLangError } = useLang();

  if (hasFontsError || hasLangError) {
    return <ErrorScreen />
  } else if (isLoadingComplete && isLangLoaded) {
    return (
      <SafeAreaProvider>
        <MainNavigator />
        <StatusBar style={'light'} backgroundColor={Colors.primary} />
      </SafeAreaProvider>
    )
  } else return null;
}