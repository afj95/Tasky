import React from 'react';
// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, HomeScreen, AddProjectScreen } from '../screens';

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="Home" component={HomeStackScreens} />
  </AuthStack.Navigator>
)

const HomeStack = createStackNavigator();
const HomeStackScreens = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="AddProject" component={AddProjectScreen} />
  </HomeStack.Navigator>
)

export {
  AuthStackScreens,
  HomeStackScreens
}