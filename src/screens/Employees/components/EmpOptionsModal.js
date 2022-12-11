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
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../../navigation/RootNavigation';
import { deleteEmployee, restoreEmployee } from '../../../redux/reducers/Users/users-actions';

export const EmpOptionsModal = ({ visible, closeModal, employee, isAnyChange }) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state?.authReducer?.user)

    const onEditEmployeePressed = () => {
        isAnyChange(true)
        closeModal();
        navigate('EditEmployeeScreen', { employee: employee })
    }

    const onDeleteEmployeePressed = () => {
        isAnyChange(true)
        dispatch(deleteEmployee(employee._id))
        closeModal();
    }

    const onRestoreEmployeePressed = () => {
        isAnyChange(true)
        dispatch(restoreEmployee(employee._id))
        closeModal();
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
                                color={Colors.primary}
                                onPress={closeModal}
                            />
                        </View>
                        {employee.deleted ? null :
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={onEditEmployeePressed}
                                style={styles.editEmployeeContainer}>
                                <MyText style={styles.option}>editEmployee</MyText>
                            </TouchableOpacity>}
                        {!employee.deleted && user?._id !== employee?._id ?
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={onDeleteEmployeePressed}
                                style={styles.deleteEmployeeContainer}>
                                <MyText style={styles.deleteOption}>deleteEmployee</MyText>
                            </TouchableOpacity>
                            : user?._id !== employee?._id ?
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={onRestoreEmployeePressed}
                                    style={styles.deleteEmployeeContainer}>
                                    <MyText style={styles.option}>restoreEmployee</MyText>
                                </TouchableOpacity> : null
                        }
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
        backgroundColor: Colors.appWhite,
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
        borderBottomColor: Colors.lightBlue,
        padding: 10,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
    },
    option: {
        color: Colors.primary,
        fontFamily: 'bold'
    },
    deleteOption: {
        color: Colors.red,
        fontFamily: 'bold'
    },
    deleteEmployeeContainer: {
        padding: 10,
    },
})