import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    I18nManager
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("screen");

export const Header = ({ text, onEmployeePressed }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.subHeader}>
            <Entypo
                name={'list'}
                color={Colors.appWhite}
                size={30}
                style={styles.drawerIcon}
                onPress={navigation.toggleDrawer}
            />
            <MyText style={styles.title}>{text}</MyText>
            <AntDesign
                name={'adduser'}
                size={30}
                color={Colors.appWhite}
                onPress={onEmployeePressed}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: height > 600 ? 55 : 10,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: 'bold',
        color: Colors.appWhite,
    },
    drawerIcon: {
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
    },
})