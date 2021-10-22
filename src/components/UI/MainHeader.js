import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
// components
import MyText from "./MyText";
import { HeaderBottom } from "./HeaderBottomSeperator";
import Colors from '../../utils/Colors';
import { goBack } from '../../navigation/RootNavigation';
import { Appbar as RNAppbar } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

export const MainHeader = ({ navigation, text, showGoBackButton }) => {
    return (
        <>
            <View style={{...styles.headerContainer,  justifyContent: showGoBackButton? 'space-between' : 'center',}}>
                {showGoBackButton &&
                    <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={"#000"} onPress={() => goBack()} />
                }
                <MyText style={{ fontSize: 25, fontWeight: 'bold' }} text={text}/>
                <View/>
            </View>
            <HeaderBottom />
        </>
    )   
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: height > 600 ? 20 : 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingHorizontal: 10,
        top: 0,
        right: 0,
        left: 0,
        width,
        height: 80,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        elevation: 4,
        alignItems: 'center',
    },
})