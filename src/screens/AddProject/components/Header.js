import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Appbar as RNAppbar } from 'react-native-paper';
import MyText from '../../../components/UI/MyText';
import { goBack } from '../../../navigation/RootNavigation';
import Colors from '../../../utils/Colors';

export const Header = ({ onPress, title, isLoading }) => {
    return (
        <>
            <View style={styles.header}>
                <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={Colors.buttons} onPress={() => goBack()} />
                <MyText style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>{title}</MyText>
                {isLoading ?
                    <ActivityIndicator size={'large'} color={Colors.buttons} />
                    :
                    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.addProjectButton}>
                        <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} />
                        <MyText>add</MyText>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
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
        elevation: 4
    },
    addProjectButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})