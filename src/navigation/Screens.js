import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import MyText from "../components/UI/MyText";
import { DashboardScreen, EmployeesScreen, HomeScreen, ProfileScreen } from "../screens";
import Colors from "../utils/Colors";

// export const screensOptions = {
//      drawerActiveTintColor: Colors.primary,
//      drawerType: 'slide',
// };

export const adminScreens = [
     {
          name: 'DashboardScreen',
          component: DashboardScreen,
          label: 'dashboard',
          options: { title: () => <MyText style={styles.title}>dashboardScreen</MyText> }
     },
     {
          name: 'HomeScreen',
          component: HomeScreen,
          label: 'projects',
          options: { title: () => <MyText style={styles.title}>projects</MyText> }
     },
     {
          name: 'EmployeesScreen',
          component: EmployeesScreen,
          label: 'employees',
          options: { title: () => <MyText style={styles.title}>employees</MyText> }
     },
     {
          name: 'ProfileScreen',
          component: ProfileScreen,
          label: 'profile',
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : Colors.black }}>profile</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='user' size={25} color={focused ? Colors.primary : Colors.black} />,
          }
     },
];

export const supervisorScreens = [
     {
          name: 'HomeScreen',
          component: HomeScreen,
          label: 'projects',
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : Colors.black }}>projects</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='list' size={25} color={focused ? Colors.primary : Colors.black} />,
          }
     },
     {
          name: 'ProfileScreen',
          component: ProfileScreen,
          label: 'profile',
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : Colors.black }}>profile</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='user' size={25} color={focused ? Colors.primary : Colors.black} />,
          }
     },
];

const styles = StyleSheet.create({
     title: {
          color: Colors.primary,
          fontFamily: 'bold'
     }
})