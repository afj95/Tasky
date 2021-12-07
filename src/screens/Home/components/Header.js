import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    I18nManager,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../../navigation/RootNavigation';
import i18n from 'i18n-js';
import { t } from '../../../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAsync } from 'expo-updates';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';

const { height } = Dimensions.get("screen");

export const Header = ({ text }) => {

    const _onAddProjectPressed = () => {
        navigate('AddProject', {});
    }

    const changeLanguage = async () => {
        Alert.alert(t('app.changeLangAlertTitle'), t('app.changeLangMessage'), [
            {
                style: 'cancel',
                text: t('app.changeLangCancel')
            },
            {
                text: t('app.changeLangConfirm'),
                onPress: async () => {
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
    };

    return (
        <View>
            <View style={styles.subHeader(160)}>
                <TouchableOpacity activeOpacity={0.5} onPress={changeLanguage}>
                    <MyText text={I18nManager.isRTL ? 'English' : 'العربية'} />
                </TouchableOpacity>
                <MyText style={{ fontSize: 20, fontWeight: 'bold' }}>{text}</MyText>
                <View style={styles.addProjectView}>
                    <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} onPress={_onAddProjectPressed} />
                    <MyText style={styles.addProjectText}>addProject</MyText>
                </View>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    subHeader: (headerHeight) => ({
        width: '100%',
        height: headerHeight / 2,
        paddingHorizontal: 10,
        paddingTop: height > 600 ? 20 : 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        // shadow
        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 4,
    }),
    addProjectView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addProjectText: {
        color: Colors.text
    }
})