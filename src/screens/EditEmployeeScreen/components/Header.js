import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
// components
import MyText from "../../../components/UI/MyText";
import { Appbar as RNAppbar } from 'react-native-paper';
import { goBack } from '../../../navigation/RootNavigation';
import Colors from '../../../utils/Colors';

const { height } = Dimensions.get("screen");

export const Header = ({ text }) => {
    return (
        <View style={styles.subHeader}>
            <RNAppbar.BackAction size={25} color={Colors.buttons} onPress={goBack} />
            <MyText style={{ fontSize: 20, fontWeight: 'bold', color: Colors.text }}>{text}</MyText>
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: height > 600 ? 55 : 10,
        backgroundColor: Colors.secondary,
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
    }
})