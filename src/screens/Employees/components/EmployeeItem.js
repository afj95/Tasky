import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import { EmpOptionsModal } from './EmpOptionsModal';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

export const EmployeeItem = ({ employee, onRefresh, undeletedSupervisor }) => {

    const [empModalVisible, setEmpModal] = useState(false)
    const [anyChange, isAnyChange] = useState(false)

    const user = useSelector((state) => state?.authReducer?.user)

    const closeEmpOptionsModal = () => {
        setEmpModal(false);
        if (anyChange) {
            onRefresh();
        }
    }

    const openEmployeeModal = () => setEmpModal(true)

    if (undeletedSupervisor && employee.deleted) {
        return null;
    }

    return (
        <>
            <View style={styles.container(employee.deleted)}>
                <View>
                    <MyText style={styles.text} text={employee.name} />
                    <MyText style={styles.text} text={employee.role} />
                </View>
                {employee._id === user._id ? null :
                    <Entypo
                        name={'dots-three-vertical'}
                        size={20}
                        color={Colors.black}
                        onPress={openEmployeeModal}
                    />}
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
    container: (deleted) => ({
        backgroundColor: deleted ? '#ffb3b3' : Colors.lightBlue,
        marginBottom: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    deletedText: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold'
    },
    text: {
        color: Colors.black
    }
})