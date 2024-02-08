import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import MyText from "../components/UI/MyText";
import { EmployeesScreen, HomeScreen, ProfileScreen } from "../screens";
import Colors from "../utils/Colors";

// export const screensOptions = {
//      drawerActiveTintColor: Colors.primary,
//      drawerType: 'slide',
// };

export const supervisorScreens = [
     {
          name: 'HomeScreen',
          component: HomeScreen,
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>projects</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='list' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
          }
     },
     // {
     //      name: 'AttendenceScreen',
     //      component: AttendenceScreen,
     //      options: {
     //           tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>attendence</MyText>,
     //           tabBarIcon: ({ focused }) => <FontAwesome name='list-alt' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
     //      }
     // },
     {
          name: 'ProfileScreen',
          component: ProfileScreen,
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>profile</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='user' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
          }
     },
];

export const adminScreens = [
     // {
     //      name: 'DashboardScreen',
     //      component: DashboardScreen,
     //      options: {
     //           tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>dashboardScreen</MyText>,
     //      }
     // },
     {
          name: 'HomeScreen',
          component: HomeScreen,
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>projects</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='list' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
          }
     },
     {
          name: 'EmployeesScreen',
          component: EmployeesScreen,
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>employees</MyText>,
               tabBarIcon: ({ focused }) => <FontAwesome5 name='users' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
          }
     },
     {
          name: 'ProfileScreen',
          component: ProfileScreen,
          options: {
               tabBarLabel: ({ focused }) => <MyText style={{ ...styles.title, color: focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)' }}>profile</MyText>,
               tabBarIcon: ({ focused }) => <Entypo name='user' size={25} color={focused ? Colors.primary : 'rgba(0, 0, 0, 0.5)'} />,
          }
     },
];

const styles = StyleSheet.create({
     title: {
          color: Colors.primary,
          fontFamily: 'bold'
     }
})