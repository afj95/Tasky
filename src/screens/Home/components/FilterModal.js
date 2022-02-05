import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity
} from 'react-native';
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';

export const FilterModal = ({ visible, closeModal, status, setStatus, deleted, setDeleted }) => {

    const onStatusPressed = () => {
        closeModal();
        setStatus(status === 'active' ? 'finished' : 'active')
    }
    
    const onDeletedPressed = () => {
        closeModal();
        setDeleted(!deleted);
    }

    return (
        <View>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButton}>
                            <AntDesign
                                name={'closecircle'}
                                size={24}
                                color={Colors.black}
                                onPress={() => closeModal()}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={onStatusPressed} style={styles.statusContainer(status)}>
                            <MyText>{status === 'active' ? 'finished' : 'active'}</MyText>
                            <MyText style={styles.helpText}>{status === 'active' ? 'finishedMessage' : 'activeMessage'}</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={onDeletedPressed} style={styles.deleteContainer(deleted)}>
                            <MyText>deleted</MyText>
                            <MyText style={styles.helpText}>deletedMessage</MyText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        backgroundColor: "#00000070",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10,
        // height: '60%',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: { alignSelf: 'flex-end' },
    statusContainer: (status) => ({
        borderBottomWidth: 0.6,
        padding: 10,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        backgroundColor: status === 'finished' ? '#d5d5d5' : '#ffffff'
    }),
    deleteContainer: (deleted) => ({
        padding: 10,
        backgroundColor: deleted ? '#d5d5d5' : '#ffffff'
    }),
    helpText: {
        color: '#444',
        fontSize: 12,
        marginStart: 10
    },
})