import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { goBack, navigate } from '../../../navigation/RootNavigation';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';
import { Appbar as RNAppbar } from 'react-native-paper';

const { height } = Dimensions.get("screen");

export const Header = ({ user, text, showModal, showGoBackButton, fetchingProjectsLoading, onRefresh }) => {

    const openOptionsModal = () => showModal();

    return (
        <View style={styles.subHeader}>
            {showGoBackButton ?
                <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={Colors.buttons} onPress={() => goBack()} />
                : <View />}
            {fetchingProjectsLoading ?
                <ActivityIndicator color={Colors.buttons} size={'small'} />
                :
                <TouchableOpacity onPress={onRefresh} activeOpacity={1}>
                    <MyText style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }} text={text} />
                </TouchableOpacity>
            }
            {user.role === 'admin' ? <TouchableOpacity activeOpacity={0.5} onPress={openOptionsModal}>
                <Entypo name={'dots-three-vertical'} size={25} color={Colors.buttons} />
            </TouchableOpacity> : <View />}
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
    },
    addProjectView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addProjectText: {
        color: Colors.text
    }
})