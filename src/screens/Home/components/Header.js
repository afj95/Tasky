import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    I18nManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../../navigation/RootNavigation';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';

const { height } = Dimensions.get("screen");

export const Header = ({ user, text }) => {

    const _onAddProjectPressed = () => navigate('AddProject', {})

    return (
        <View style={styles.subHeader}>
            <View />
            <MyText style={styles.title}>{text}</MyText>
            {user && user.role === 'admin' ? <View style={styles.addProjectView}>
                <Ionicons
                    name={'md-add-circle'}
                    size={22}
                    color={Colors.appWhite}
                    onPress={_onAddProjectPressed}
                />
                <MyText style={styles.addProjectText}>addProject</MyText>
            </View> : <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: height > 600 ? 55 : 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: 'bold',
        color: Colors.appWhite
    },
    addProjectView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addProjectText: {
        color: Colors.appWhite,
        fontFamily: 'light'
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