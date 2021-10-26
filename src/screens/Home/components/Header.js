import React from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../../navigation/RootNavigation';
// components
import MyText from "../../../components/UI/MyText";
import Colors from '../../../utils/Colors';

const { height } = Dimensions.get("screen");

export const Header = ({ text }) => {

    const _onAddProjectPressed = () => {
        navigate('AddProjectScreen', {});
    }

    return (
        <View>
            <View style={styles.subHeader(160)}>
                <View />
                <View />
                <MyText style={{ fontSize: 20, fontWeight: 'bold' }} text={text} />
                <View style={styles.addProjectView}>
                    <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} onPress={_onAddProjectPressed} />
                    <MyText text={'addProject'} style={styles.addProjectText}  />
                </View>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    subHeader: (headerHeight) => ({
        width: '100%',
        height: headerHeight / 2,
        paddingHorizontal: 10,
        paddingTop: height > 600 ? 20 : 10,
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
        elevation: 4
    }),
    addProjectView: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    addProjectText: {
        fontSize: 9,
        color: Colors.text
    }
})