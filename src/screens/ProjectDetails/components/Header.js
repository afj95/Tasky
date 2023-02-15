import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { goBack } from '../../../navigation/RootNavigation';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';
import { Appbar as RNAppbar } from 'react-native-paper';

const { height } = Dimensions.get("screen");

export const Header = ({ text, showGoBackButton }) => {

    // const openOptionsModal = () => showModal();

    return (
        <View style={styles.subHeader}>
            {showGoBackButton ?
                <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={Colors.appWhite} onPress={() => goBack()} />
                : <View />}
            <MyText numberOfLines={1} style={styles.title} text={text} />
            {/* {user.role === 'admin' ? <TouchableOpacity activeOpacity={0.5} onPress={openOptionsModal}>
                <Entypo name={'dots-three-vertical'} size={25} color={Colors.appWhite} />
            </TouchableOpacity> : <View />} */}
            <View />
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
    addProjectView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addProjectText: {
        color: Colors.text
    },
    title: {
        fontSize: 20,
        fontFamily: 'bold',
        color: Colors.appWhite
    }
})