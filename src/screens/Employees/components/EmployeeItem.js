import React from 'react';
import {
    View,
    StyleSheet,
    I18nManager
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { navigate } from '../../../navigation/RootNavigation';

export const EmployeeItem = ({ id, employee, undeletedSupervisor }) => {

    // const [empModalVisible, setEmpModal] = useState(false)
    // const [anyChange, isAnyChange] = useState(false)

    // const user = useSelector((state) => state?.authReducer?.user)

    // const closeEmpOptionsModal = () => {
    //     setEmpModal(false);
    //     if (anyChange) {
    //         onRefresh();
    //         isAnyChange(false)
    //     }
    // }

    // const openEmployeeModal = () => setEmpModal(true)

    if (undeletedSupervisor && employee.deleted) {
        return null;
    }

    const openEmployeeDetailsScreen = () => {
        navigate('EmployeeDetailsScreen', { employee });
    }

    return (
        <TouchableOpacity onPress={openEmployeeDetailsScreen}>
            <View style={styles.container}>
                {I18nManager.isRTL ? <MyText text={' - ' + (id + 1)} /> : <MyText text={(id + 1) + ' - '} />}
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
        flexDirection: 'row'
    },
})