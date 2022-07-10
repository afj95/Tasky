import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("screen");

export const Header = ({ text, onEmployeePressed }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.subHeader}>
            <Ionicons
                name={'reorder-three'}
                size={35}
                color={Colors.buttons}
                onPress={navigation.toggleDrawer}
            />
            <MyText style={{ fontSize: 20, fontWeight: 'bold', color: Colors.text }}>{text}</MyText>
            <AntDesign name={'adduser'} size={30} color={Colors.buttons} onPress={onEmployeePressed} />
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