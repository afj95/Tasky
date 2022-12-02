import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import { EmpOptionsModal } from './EmpOptionsModal';
import { useSelector } from 'react-redux';

export const EmployeeItem = ({ employee, onRefresh, undeletedSupervisor }) => {

    const [empModalVisible, setEmpModal] = useState(false)
    const [anyChange, isAnyChange] = useState(false)

    const user = useSelector((state) => state?.authReducer?.user)

    const closeEmpOptionsModal = () => {
        setEmpModal(false);
        if (anyChange) {
            onRefresh();
            isAnyChange(false)
        }
    }

    const openEmployeeModal = () => setEmpModal(true)

    if (undeletedSupervisor && employee.deleted) {
        return null;
    }

    return (
        <>
            <View style={[styles.container, { backgroundColor: employee._id === user._id ? Colors.lightBlue : Colors.white }]}>
                <View style={styles.employeeDetailsContainer}>
                    <View style={[styles.imageContainer, { borderColor: employee.deleted ? Colors.red : Colors.primary }]}>
                        <Ionicons name={'person'} size={20} color={employee.deleted ? Colors.red : Colors.primary} />
                    </View>
                    <View>
                        <MyText style={styles.text} text={employee.name} />
                        <MyText style={styles.text} text={employee.role} />
                    </View>
                </View>
                <Entypo
                    name={'dots-three-vertical'}
                    size={20}
                    color={Colors.primary}
                    onPress={openEmployeeModal}
                />
            </View>
            <EmpOptionsModal
                employee={employee}
                visible={empModalVisible}
                closeModal={closeEmpOptionsModal}
                isAnyChange={isAnyChange}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginBottom: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    employeeDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: Colors.primary,
        width: 30, height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
    },
    deletedText: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold'
    },
    text: {
        color: Colors.black
    }
})