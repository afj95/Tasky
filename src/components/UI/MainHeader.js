import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
// components
import MyText from "./MyText";
import Colors from '../../utils/Colors';
import { goBack } from '../../navigation/RootNavigation';
import { Appbar as RNAppbar } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

export const MainHeader = ({ title, text, showGoBackButton }) => {
    return (
        <>
            <View style={{...styles.headerContainer,  justifyContent: showGoBackButton? 'space-between' : 'center',}}>
                {text ? <MyText style={{ fontSize: 25, fontWeight: 'bold' }} text={text}/> : null }
                {title ? <MyText style={{ fontSize: 25, fontWeight: 'bold' }} >{title}</MyText> : null }
                {showGoBackButton ? <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={"#000"} onPress={() => goBack()} /> : null}
                <View/>
            </View>
        </>
    )   
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: height > 600 ? 55 : 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingHorizontal: 10,
        width,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        elevation: 4,
        alignItems: 'center',
    },
})