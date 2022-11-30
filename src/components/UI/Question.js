import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    I18nManager
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../utils/Colors';
import MyText from './MyText';

export default Question = ({ text }) => {

    const [visible, setVisible] = useState(false);

    const close = () => setVisible(false);

    const MyModal = () => {
        return (
            <Modal
                style={styles.modal}
                isVisible={visible}
                onBackdropPress={close}
                onSwipeComplete={close}
                onBackButtonPress={close}
                swipeThreshold={10}
                swipeDirection={'down'}>
                <View style={styles.contentView}>
                    <MyText text={text} />
                </View>

            </Modal>
        )
    }

    return (
        <>
            <AntDesign
                name='questioncircleo'
                size={15}
                color={Colors.primary}
                onPress={() => setVisible(true)}
                style={styles.icon}
            />
            <MyModal />
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    contentView: {
        width: '100%',
        backgroundColor: Colors.appWhite,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 10,
        paddingBottom: 25
    },
    icon: {
        marginHorizontal: 5,
        transform: I18nManager.isRTL ?
            [
                { rotateY: "180deg" },
                { rotateZ: "0deg" }
            ]
            :
            [
                { rotateY: "0deg" },
                { rotateZ: "0deg" },
            ]

    }
})