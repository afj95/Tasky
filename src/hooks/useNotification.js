import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Colors from '../utils/Colors';
import { useDispatch } from 'react-redux';
import { sendExpoToken } from '../redux/reducers/Users/users-actions';

Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
     }),
});

export const useNotification = () => {
     const dispatch = useDispatch();

     const notificationListener = useRef();
     const responseListener = useRef();

     const [expoPushToken, setExpoPushToken] = useState('');
     const [notification, setNotification] = useState(false);

     useEffect(() => {
          registerForPushNotificationsAsync(dispatch).then(token => {
               setExpoPushToken(token);
          });

          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
               // Got the notification.
               // Do whatever I want.
               setNotification(notification);
          });

          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });

          return () => {
               Notifications.removeNotificationSubscription(notificationListener.current);
               Notifications.removeNotificationSubscription(responseListener.current);
          };

     }, []);

     return expoPushToken;
}

async function registerForPushNotificationsAsync(dispatch) {
     let token;
     try {
          if (Platform.OS === 'android') {
               await Notifications.setNotificationChannelAsync('Employees IDs', {
                    name: 'Employees IDs',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: Colors.secondary,
                    sound: true,
               });
          }

          if (Device.isDevice) {
               const { status: existingStatus } = await Notifications.getPermissionsAsync();
               let finalStatus = existingStatus;
               if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
               }
               if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
               }

               token = await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
               });

               dispatch(sendExpoToken(token?.data));
          } else {
               alert('Must use physical device for Push Notifications');
          }
          return token;
     } catch (error) {
          // Error happened while trying to get notification token.
          console.log('error happened while trying to get notification token', error);
     }
}
