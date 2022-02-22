import React from 'react'
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import { useDispatch } from 'react-redux';

export const EmpOptionsModal = ({ visible, closeModal, employee }) => {

    const dispatch = useDispatch();

    const onEditEmployeePressed = () => {
        
    }

    const onDeleteEmployeePressed = () => {

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
                        <TouchableOpacity activeOpacity={0.5} onPress={onEditEmployeePressed} style={styles.editEmployeeContainer}>
                            <MyText>editEmployee</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={onDeleteEmployeePressed} style={styles.deleteEmployeeContainer}>
                            <MyText>deleteEmployee</MyText>
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
        // height: '30%',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: { alignSelf: 'flex-end' },
    editEmployeeContainer: {
        borderBottomWidth: 0.6,
        padding: 10,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
    },
    deleteEmployeeContainer: {
        padding: 10,
    },
})