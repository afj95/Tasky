// TODO:  Change backgtound of item
import React from 'react'
import {
    View,
    StyleSheet,
    Alert,
    I18nManager
} from 'react-native';
//Drawer
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import Colors from '../utils/Colors';
import MyText from '../components/UI/MyText';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { t } from '../i18n';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAsync } from 'expo-updates';
import { logout } from '../redux/reducers/Auth/auth-actions';
import { CommonActions } from '@react-navigation/native';

export const Drawer = ({ props }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authReducer.user);

    const { state, ...rest } = props;

    const onChangeLanguagePressed = () => {
        Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
            {
                style: 'cancel',
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: async () => {
                    // closeModal();
                    const lang = await AsyncStorage.getItem('lang');
                    AsyncStorage.setItem('lang', lang === "ar" ? "en" : "ar");

                    if (lang !== "ar") {
                        i18n.locale = "ar";
                        I18nManager.forceRTL(true);
                        I18nManager.allowRTL(true);
                    } else {
                        i18n.locale = "en";
                        I18nManager.forceRTL(false);
                        I18nManager.allowRTL(false);
                    }
                    reloadAsync();
                }
            }
        ],
            {
                /** @platform android */
                cancelable: true,
            })
    }

    const onLogoutPressed = () => {
        Alert.alert(t('app.logoutAlertTitle'), t('app.logoutMessage'), [
            {
                style: 'cancel',
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: () => {
                    dispatch(logout());
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Auth' }]
                        })
                    )
                }
            }
        ],
            {
                /** @platform android */
                cancelable: true,
            })
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                {Object.keys(user).length === 0 ? (
                    <></>
                ) : (<></>)}
                <View>
                    <DrawerItemList state={state} {...rest} />
                </View>
            </DrawerContentScrollView>
            <DrawerItem style={styles.seperator} label={() => <></>} />
            <DrawerItem
                onPress={onChangeLanguagePressed}
                label={() =>
                    <View style={styles.changeLanguage}>
                        <FontAwesome
                            name="language"
                            size={25}
                            style={{ marginRight: 30 }}
                            color={Colors.primary}
                        />
                        <MyText style={styles.logoutText}>
                            changeLanguage
                        </MyText>
                    </View>
                }
            />
            {Object.keys(user).length === 0 ? (
                <></>
            ) : (
                <DrawerItem
                    onPress={onLogoutPressed}
                    label={() =>
                        <View style={styles.logout}>
                            <MaterialCommunityIcons
                                name="logout"
                                size={25}
                                style={{ marginRight: 30 }}
                                color={Colors.primary}
                            />
                            <MyText style={styles.logoutText}>
                                logout
                            </MyText>
                        </View>
                    }
                />
            )}

            <DrawerItem style={styles.version} label={() => <MyText style={{ fontSize: 10 }} text={'App Version 1.0'} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appWhite
    },
    changeLanguage: {
        flexDirection: "row",
        alignItems: "center",
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoutText: {
        fontSize: 14,
        color: Colors.primary,
        fontFamily: 'bold'
    },
    seperator: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderTopColor: Colors.primary,
    },
    version: {
        height: 30,
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderTopColor: Colors.text,
    }
})