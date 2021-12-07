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

export const Header = ({ onPress, title, loading }) => {
    return (
        <>
            <View style={styles.header}>
                <RNAppbar.BackAction size={25} style={{ padding: 2 }} color={"#000"} onPress={() => goBack()} />
                <MyText style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</MyText>
                {loading ? 
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

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
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
    addProjectButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})