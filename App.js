import 'react-native-gesture-handler';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { useCachedResources } from './src/hooks/useCachedResources';
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation/MainNavigator";
import Colors from './src/utils/Colors';
import { ErrorScreen } from './src/screens/ErrorScreen';

export default function App() {

  const [loadingCompleted, hasError] = useCachedResources();

  if (hasError) {
    return <ErrorScreen />
  } else if (loadingCompleted) {
    return (
      <SafeAreaProvider>
        <MainNavigator />
        <StatusBar style={'light'} backgroundColor={Colors.primary} />
      </SafeAreaProvider>
    )
  } else return null;
}