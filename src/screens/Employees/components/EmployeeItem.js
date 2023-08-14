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
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { navigate } from '../../../navigation/RootNavigation';

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

    const openEmployeeDetailsScreen = () => {
        navigate('EmployeeDetailsScreen', { employee });
    }

    return (
        <TouchableOpacity onPress={openEmployeeDetailsScreen}>
            <View style={styles.container}>
                <MyText text={employee.name} />
            </View>
            {/* <EmpOptionsModal
                employee={employee}
                visible={empModalVisible}
                closeModal={closeEmpOptionsModal}
                isAnyChange={isAnyChange}
            /> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderBottomColor: '#bcbcbc',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
})