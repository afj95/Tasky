import React from 'react';
// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/index.js';

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
)

export {
    AuthStackScreens,
}