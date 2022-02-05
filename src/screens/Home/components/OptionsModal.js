import React from 'react'
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Alert,
    I18nManager
} from 'react-native';
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../redux/reducers/Auth/auth-actions';
import { useDispatch } from 'react-redux';
import { reloadAsync } from 'expo-updates';
import { CommonActions } from '@react-navigation/native';

export const OptionsModal = ({ visible, closeModal, navigation }) => {
    const dispatch = useDispatch();

    const onChangeLanguagePressed = () => {
        Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
            {
                style: 'cancel',
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: async () => {
                    closeModal();
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
                    closeModal();
                    dispatch(logout());
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [ { name: 'Auth' } ]
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
        <View>
            <Modal
                animationType={'fade'}
                transparent={true}
                // style={{ backgroundColor: '#00000090' }}
                visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButton}>
                            <AntDesign
                                name={'closecircle'}
                                size={24}
                                color={Colors.black}
                                onPress={() => closeModal()}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={onChangeLanguagePressed} style={styles.languageContainer}>
                            <MyText>changeLanguage</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={onLogoutPressed} style={styles.logoutContainer}>
                            <MyText>logout</MyText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        backgroundColor: "#00000070",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10,
        // height: '30%',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: { alignSelf: 'flex-end' },
    languageContainer: {
        borderBottomWidth: 0.6,
        padding: 10,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
    },
    logoutContainer: {
        padding: 10,
    },
})