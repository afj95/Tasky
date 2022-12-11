import React from 'react';
import { StyleSheet } from 'react-native';
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

const Drawer = createDrawerNavigator();
const DrawerScreens = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <Drawer.Navigator
      initialRouteName={'DashboardScreen'}
      drawerContent={props => <DrawerComponent props={props} />}
      screenOptions={{ headerShown: false }}>
      {user?.role === 'admin' ?
        <Drawer.Screen
          name={'DashboardScreen'}
          component={DashboardScreen}
          options={{
            title: () => (
              <MyText style={styles.title}>dashboardScreen</MyText>
            )
          }} /> : null}
      <Drawer.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          title: () => (
            <MyText style={styles.title}>projects</MyText>
          )
        }} />
      {user?.role === 'admin' ?
        <Drawer.Screen
          name={'EmployeesScreen'}
          component={EmployeesScreen}
          options={{
            title: () => (
              <MyText style={styles.title}>employees</MyText>
            )
          }}
        /> : null}
    </Drawer.Navigator>
  )
}

const MainStack = createStackNavigator();
export const MainStackScreens = () => (
  <MainStack.Navigator>
    <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Dashboard" component={DrawerScreens} />
      {/* <MainStack.Screen name="HomeScreenStack" component={HomeScreen} /> */}
      <MainStack.Screen name="AddProject" component={AddProjectScreen} />
    </MainStack.Group>

    <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'ProjectDetailsScreen'} component={ProjectDetails} />
    </MainStack.Group>

    <MainStack.Group screenOptions={{ headerShown: false }}>
      {/* <MainStack.Screen name={'EmployeesScreenStack'} component={EmployeesScreen} /> */}
      <MainStack.Screen name={'AddEmployeeScreen'} component={AddEmployeeScreen} />
      <MainStack.Screen name={'EditEmployeeScreen'} component={EditEmployeeScreen} />
    </MainStack.Group>
  </MainStack.Navigator>
)


const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
    fontFamily: 'bold'
  }
})