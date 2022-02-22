import React from 'react';
// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerComponent } from './Drawer';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddProjectScreen,
  ProjectDetails,
  EmployeesScreen
} from '../screens';
import { t } from '../i18n';

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="Home" component={DrawerScreens} />
  </AuthStack.Navigator>
)

const HomeStack = createStackNavigator();
const HomeStackScreens = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="AddProject" component={AddProjectScreen} />
    {/* <HomeStack.Screen name="ProjectDetails" component={ProjectDetails} /> */}
    <HomeStack.Screen name="ProjectDetails" component={ProjectStuckScreens} />
  </HomeStack.Navigator>
)

const ProjectStuck = createStackNavigator();
const ProjectStuckScreens = () => (
  <ProjectStuck.Navigator screenOptions={{headerShown: false }}>
    <ProjectStuck.Screen name={'ProjectDetailsScreen'} component={ProjectDetails} />
  </ProjectStuck.Navigator>
)

const EmployeesStuck = createStackNavigator();
const EmployeesStuckScreens = () => (
  <EmployeesStuck.Navigator screenOptions={{headerShown: false }}>
    <EmployeesStuck.Screen name={'employeesScreen'} component={EmployeesScreen} />
    {/* <EmployeesStuck.Screen name={'ProjectDetailsScreen'} component={ProjectDetails} /> */}
  </EmployeesStuck.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent props={props} />}
      screenOptions={{headerShown: false }}>
      <Drawer.Screen name={t('app.projects')} component={HomeStackScreens} />
      <Drawer.Screen name={t('app.employees')} component={EmployeesStuckScreens} />
    </Drawer.Navigator>
  )
}

export {
  AuthStackScreens,
  HomeStackScreens,
  DrawerScreens
}