import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { navigate } from '../../../navigation/RootNavigation';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("screen");

export const Header = ({ user, text, showModal }) => {
    const navigation = useNavigation();

    const _onAddProjectPressed = () => navigate('AddProject', {})

    return (
        <View style={styles.subHeader}>
            <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
                {/* <MyText text={I18nManager.isRTL ? 'English' : 'العربية'} /> */}
                {/* <Entypo name={'dots-three-vertical'} size={25} color={Colors.black} /> */}
                <Ionicons name={'reorder-three'} size={35} color={Colors.buttons} onPress={navigation.toggleDrawer} />
            </TouchableOpacity>
            <MyText style={{ fontSize: 20, fontWeight: 'bold' }}>{text}</MyText>
            {user.role === 'admin' ? <View style={styles.addProjectView}>
                <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} onPress={_onAddProjectPressed} />
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
        backgroundColor: '#fff',
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