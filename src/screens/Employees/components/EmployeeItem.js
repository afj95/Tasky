import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import { EmpOptionsModal } from '.';

export const EmployeeItem = ({ employee }) => {

    const [empModalVisible, setEmpModal] = useState(false)

    const closeEmpOptionsModal = () => setEmpModal(false)

    const openEmployeeModal = () => setEmpModal(true)

    return (
        <>
            <View style={styles.container}>
                <View>
                    <MyText text={employee.name} />
                    <MyText text={employee.role} />
                </View>
                <Entypo
                    name={'dots-three-vertical'}
                    size={20}
                    color={Colors.black}
                    onPress={openEmployeeModal}
                />
            </View>
            <EmpOptionsModal employee={employee} visible={empModalVisible} closeModal={closeEmpOptionsModal} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})