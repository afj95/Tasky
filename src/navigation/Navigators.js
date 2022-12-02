import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  EmployeesScreen,
  AddEmployeeScreen,
  EditEmployeeScreen,
  DashboardScreen
} from '../screens';
import { useSelector } from 'react-redux';
import MyText from '../components/UI/MyText';
import Colors from '../utils/Colors';

const AuthStack = createStackNavigator();
export const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
)

const HomeStack = createStackNavigator();
export const HomeStackScreens = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="AddProject" component={AddProjectScreen} />

    <HomeStack.Screen name="ProjectDetails" component={ProjectStuckScreens} />
    <HomeStack.Screen name="Employees" component={EmployeesStuckScreens} />
  </HomeStack.Navigator>
)

const ProjectStuck = createStackNavigator();
const ProjectStuckScreens = () => (
  <ProjectStuck.Navigator screenOptions={{ headerShown: false }}>
    <ProjectStuck.Screen name={'ProjectDetailsScreen'} component={ProjectDetails} />
  </ProjectStuck.Navigator>
)

const EmployeesStuck = createStackNavigator();
const EmployeesStuckScreens = () => (
  <EmployeesStuck.Navigator screenOptions={{ headerShown: false }}>
    <EmployeesStuck.Screen name={'EmployeesScreen'} component={EmployeesScreen} />
    <EmployeesStuck.Screen name={'AddEmployeeScreen'} component={AddEmployeeScreen} />
    <EmployeesStuck.Screen name={'EditEmployeeScreen'} component={EditEmployeeScreen} />
  </EmployeesStuck.Navigator>
)

const Drawer = createDrawerNavigator();
export const DrawerScreens = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <Drawer.Navigator
      initialRouteName={'DashboardScreen'}
      drawerContent={props => <DrawerComponent props={props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name={'DashboardScreen'}
        component={DashboardScreen}
        options={{
          title: () => (
            <MyText style={styles.title}>dashboardScreen</MyText>
          )
        }} />
      <Drawer.Screen
        name={'HomeScreens'}
        component={HomeStackScreens}
        options={{
          title: () => (
            <MyText style={styles.title}>projects</MyText>
          )
        }} />
      {user?.role === 'admin' ?
        <Drawer.Screen
          name={'employeesScreen'}
          component={EmployeesStuckScreens}
          options={{
            title: () => (
              <MyText style={styles.title}>employees</MyText>
            )
          }}
        /> : null}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
    fontFamily: 'bold'
  }
})