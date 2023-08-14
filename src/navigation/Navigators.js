import React from 'react';
// Navigation
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Drawer as DrawerComponent } from './Drawer';
import {
  LoginScreen,
  RegisterScreen,
  AddProjectScreen,
  ProjectDetails,
  EditTaskScreen,
  MaterialsScreen,
  EmployeeDetailsScreen,
  // CalcualtionsScreen
} from '../screens';
import { useSelector } from 'react-redux';
import { adminScreens, supervisorScreens } from './Screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
export const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
)

// const Drawer = createDrawerNavigator();
// const DrawerScreens = () => {
//   const user = useSelector(state => state.authReducer.user);
//   return (
//     <Drawer.Navigator
//       initialRouteName={user?.role === 'admin' ? 'DashboardScreen' : 'HomeScreen'}
//       drawerContent={props => <DrawerComponent props={props} />}
//       screenOptions={{ headerShown: false }}>
//       {user?.role === 'admin' ?
//         adminScreens.map((screen, index) => {
//           const { name, component, options } = screen;
//           return (
//             <Drawer.Screen
//               key={index}
//               name={name}
//               component={component}
//               options={{ ...screensOptions, ...options }}
//             />
//           )
//         })
//         :
//         supervisorScreens.map((screen, index) => {
//           const { name, component, options } = screen;
//           return (
//             <Drawer.Screen
//               key={index}
//               name={name}
//               component={component}
//               options={{ ...screensOptions, ...options }}
//             />
//           )
//         })
//       }
//     </Drawer.Navigator>
//   )
// }

const Tab = createBottomTabNavigator();
const MyTabs = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <Tab.Navigator
      // initialRouteName={user?.role === 'admin' ? 'DashboardScreen' : 'HomeScreen'}
      initialRouteName={'HomeScreen'}
      screenOptions={{ headerShown: false, }}>
      {user?.role === 'admin' ?
        adminScreens.map((screen, index) => {
          const { name, component, options } = screen;
          return (
            <Tab.Screen
              key={index}
              name={name}
              component={component}
              options={options}
            />
          )
        })
        :
        supervisorScreens.map((screen, index) => {
          const { name, component, options } = screen;
          return (
            <Tab.Screen
              key={index}
              name={name}
              component={component}
              options={options}
            />
          )
        })
      }
    </Tab.Navigator>
  );
}

const MainStack = createStackNavigator();
export const MainStackScreens = () => (
  <MainStack.Navigator>

    {/* ADMIN */}
    <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={MyTabs} />
      <MainStack.Screen name="AddProject" component={AddProjectScreen} />
    </MainStack.Group>

    <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'ProjectDetailsScreen'} component={ProjectDetails} />
      <MainStack.Screen name={'EditTaskScreen'} component={EditTaskScreen} />
      <MainStack.Screen name={'MaterialsScreen'} component={MaterialsScreen} />
      {/* <MainStack.Screen name={'CalcualtionsScreen'} component={CalcualtionsScreen} /> */}
    </MainStack.Group>
    <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'EmployeeDetailsScreen'} component={EmployeeDetailsScreen} />
    </MainStack.Group>

    {/* <MainStack.Group screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'EmployeesScreenStack'} component={EmployeesScreen} />
      <MainStack.Screen name={'AddEmployeeScreen'} component={AddEmployeeScreen} />
      <MainStack.Screen name={'EditEmployeeScreen'} component={EditEmployeeScreen} />
    </MainStack.Group> */}
  </MainStack.Navigator>
)