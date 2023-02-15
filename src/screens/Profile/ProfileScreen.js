import React, { useState, useEffect } from 'react'
import {
     View,
     StyleSheet,
     Image,
     I18nManager,
     ScrollView,
     Alert,
     RefreshControl
} from 'react-native'
import MyText from '../../components/UI/MyText'
import Colors from '../../utils/Colors'
import TouchableOpacity from '../../components/UI/TouchableOpacity'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { fetchProfile, logout as logoutAction } from '../../redux/reducers/Auth/auth-actions';
import { t } from '../../i18n'
import { ProfileModal } from './components'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { i18n } from '../../i18n';
import { reloadAsync } from 'expo-updates';

export const ProfileScreen = ({ navigation }) => {
     const dispatch = useDispatch();

     const [profileModal, setProfileModal] = useState(false);
     const [label, setLabel] = useState('');
     const [value, setValue] = useState('');

     const user = useSelector((state) => state.authReducer.user);
     const loadings = useSelector((state) => state?.globalReducer?.loadings)

     useEffect(() => {
          dispatch(fetchProfile())
     }, [])

     const onChangeLanguagePressed = () => {
          Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
               {
                    style: 'cancel',
                    text: t('app.cancel')
               },
               {
                    text: t('app.changeLangConfirm'),
                    onPress: async () => {
                         try {
                              if (I18nManager.isRTL) { // if current is arabic
                                   i18n.locale = 'en';
                                   I18nManager.forceRTL(false);
                                   I18nManager.allowRTL(false);
                                   await AsyncStorage.setItem('lang', 'en')
                              } else {
                                   i18n.locale = 'ar';
                                   I18nManager.forceRTL(true);
                                   I18nManager.allowRTL(true);
                                   await AsyncStorage.setItem('lang', 'ar')
                              }
                         } catch (error) {
                              i18n.locale = 'ar';
                              I18nManager.forceRTL(true);
                              I18nManager.allowRTL(true);
                              await AsyncStorage.setItem('lang', 'ar')
                         }
                         await reloadAsync();
                    }
               }
          ],
               {
                    /** @platform android */
                    cancelable: true,
               })
     }

     const onLogoutPressed = () => {
          Alert.alert(t('app.logoutAlertTitle'), t('app.logoutMessage'),
               [
                    {
                         style: 'cancel',
                         text: t('app.cancel')
                    },
                    {
                         text: t('app.changeLangConfirm'),
                         onPress: () => {
                              dispatch(logoutAction(() =>
                                   navigation.dispatch(
                                        CommonActions.reset({
                                             index: 1,
                                             routes: [{ name: 'Auth' }]
                                        })
                                   ))
                              );
                         }
                    }
               ],
               {
                    /** @platform android */
                    cancelable: true,
               })
     }

     const openModal = (label, value) => {
          setLabel(label)
          setValue(value)
          setProfileModal(true)
     }
     const closeModal = () => setProfileModal(false);

     const editItems = [
          {
               label: 'name',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               value: user?.name,
               valueStyle: { color: Colors.text, fontFamily: 'light', fontSize: 13 },
               onPress: () => openModal('name', user?.name)
          },
          {
               label: 'phone',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               value: user?.phone_number,
               valueStyle: { color: Colors.text, fontFamily: 'light', fontSize: 13 },
               onPress: () => openModal('phone', user?.phone_number)
          },
          {
               label: 'email',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               value: user?.email,
               valueStyle: { color: Colors.text, fontFamily: 'light', fontSize: 13 },
               onPress: () => openModal('email', user?.email)
          },
          {
               label: 'password',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               value: '********',
               valueStyle: { color: Colors.text, fontFamily: 'light', fontSize: 13 },
               onPress: () => openModal('password', '')
          },
     ];

     const appItems = [
          {
               label: 'changeLanguage',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               onPress: onChangeLanguagePressed
          },
          {
               label: 'logout',
               labelStyle: { color: Colors.red, fontFamily: 'bold' },
               onPress: onLogoutPressed
          },
          {
               label: 'about',
               labelStyle: { color: Colors.primary, fontFamily: 'bold' },
               onPress: () => openModal('about', '')
          },
     ];

     const onRefresh = () => dispatch(fetchProfile())

     const changeImage = () => { }

     return (
          <View style={styles.container}>
               <LinearGradient
                    colors={[Colors.primary, 'rgba(255,255,255,0.3)']}
                    style={styles.container}>
                    <View style={styles.lowContainer}>
                         {/* TODO: Add change profile image */}
                         <TouchableOpacity disabled onPressOut={changeImage} style={styles.profileImageContainer}>
                              {/* <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.profileImage} /> */}
                              {user.image ?
                                   <Image source={{ uri: user?.image }} style={styles.profileImage} />
                                   :
                                   <Ionicons name={'person'} size={90} color={Colors.appWhite} />
                              }
                         </TouchableOpacity>
                         <View style={styles.indicator}>
                              <ActivityIndicator
                                   hidesWhenStopped
                                   size={'small'}
                                   color={Colors.primary}
                                   animating={loadings?.fetch_profile === true}
                              />
                         </View>
                         <ScrollView
                              contentContainerStyle={{ paddingVertical: 10 }}
                              showsVerticalScrollIndicator={false}
                              refreshControl={
                                   <RefreshControl
                                        refreshing={false}
                                        onRefresh={onRefresh}
                                        tintColor={Colors.primary}
                                        colors={[Colors.primary, Colors.secondary]}
                                   />
                              }>
                              {editItems.map((item, index) => {
                                   const { label, labelStyle, value, valueStyle, onPress } = item;
                                   return (
                                        <TouchableOpacity
                                             key={index}
                                             style={styles.item}
                                             onPress={onPress}>
                                             <View>
                                                  <MyText style={labelStyle}>{label}</MyText>
                                                  <MyText style={valueStyle} text={value} />
                                             </View>
                                             <MaterialIcons name={'arrow-forward-ios'} size={20} color={Colors.primary} style={styles.arrow} />
                                        </TouchableOpacity>
                                   )
                              })}
                              <View style={{ height: 10 }} />
                              {appItems.map((item, index) => {
                                   const { label, labelStyle, onPress } = item;
                                   return (
                                        <TouchableOpacity
                                             key={index}
                                             style={styles.item}
                                             onPress={onPress}>
                                             <MyText style={labelStyle}>{label}</MyText>
                                        </TouchableOpacity>
                                   )
                              })}
                         </ScrollView>
                    </View>
               </LinearGradient>
               <ProfileModal
                    visible={profileModal}
                    closeModal={closeModal}
                    label={label}
                    value={value}
                    user={user}
               />
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'flex-end'
     },
     lowContainer: {
          height: '70%',
          backgroundColor: Colors.appWhite,
          paddingHorizontal: 5,
          borderTopStartRadius: 18,
          borderTopEndRadius: 18,
     },
     profileImageContainer: {
          width: 120, height: 120,
          borderRadius: 120 / 2,
          borderWidth: 1,
          borderColor: 'rgba(50, 98, 115, 0.8)',
          alignSelf: 'center',
          marginTop: -75,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(50, 98, 115, 0.5)'
     },
     profileImage: {
          width: '100%',
          height: '100%',
          borderRadius: 120 / 2,
          resizeMode: 'contain'
     },
     indicator: {
          position: 'absolute',
          end: 10,
          top: 5,
     },
     item: {
          width: '100%',
          backgroundColor: Colors.white,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
          borderRadius: 3,
          paddingHorizontal: 5
     },
     arrow: {
          transform: I18nManager.isRTL ?
               [
                    { rotateY: "180deg" },
                    { rotateZ: "0deg" }
               ]
               :
               [
                    { rotateY: "0deg" },
                    { rotateZ: "0deg" }
               ]
     }
})