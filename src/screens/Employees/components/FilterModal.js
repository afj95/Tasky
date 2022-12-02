import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../../utils/Colors';
import MyText from '../../../components/UI/MyText';
import { TouchableOpacity } from '../../../components/UI/TouchableOpacity';
import { Fontisto } from '@expo/vector-icons';

export const FilterModal = ({ visible, close, employeeType, setEmployeesType, seUndeletedSupervisor, undeletedSupervisor }) => {

    const changeBackColor = (type, number) => {
        return {
            marginVertical: 10,
            backgroundColor: type === number ? Colors.secondary : Colors.appWhite,
            borderRadius: 3,
            padding: 5
        }
    }

    const changeTextColor = (type, number) => {
        return {
            fontFamily: 'bold',
            color: type === number ? Colors.appWhite : Colors.text,
        }
    }

    const withoutDeleted = () => seUndeletedSupervisor(!undeletedSupervisor)

    return (
        <Modal
            swipeThreshold={10}
            isVisible={visible}
            style={styles.modal}
            onBackdropPress={close}
            onSwipeComplete={close}
            onBackButtonPress={close}
            animationIn={'slideInUp'}
            animationInTiming={500}
            animationOutTiming={500}
            swipeDirection={'down'}
            useNativeDriver>
            <View style={styles.contentView}>
                <View style={styles.header}>
                    <MyText style={styles.headerText}>employeesFilter</MyText>
                </View>
                <View style={styles.undeletedContainer}>
                    <Fontisto
                        name={undeletedSupervisor ? 'checkbox-active' : 'checkbox-passive'}
                        size={20}
                        onPress={withoutDeleted}
                        color={Colors.primary}
                    />
                    <MyText style={styles.undeletedText}>notDeletedSupervisors</MyText>
                </View>
                <TouchableOpacity
                    style={changeBackColor(employeeType, 1)}
                    onPress={() => setEmployeesType(1)}>
                    <MyText style={changeTextColor(employeeType, 1)}>
                        allEmployees
                    </MyText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={changeBackColor(employeeType, 2)}
                    onPress={() => setEmployeesType(2)}>
                    <MyText style={changeTextColor(employeeType, 2)}>supervisors</MyText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={changeBackColor(employeeType, 3)}
                    onPress={() => setEmployeesType(3)}>
                    <MyText style={changeTextColor(employeeType, 3)}>deletedUsers</MyText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={changeBackColor(employeeType, 4)}
                    onPress={() => setEmployeesType(4)}>
                    <MyText style={changeTextColor(employeeType, 4)}>noDeleted</MyText>
                </TouchableOpacity>
            </View>
        </Modal>
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
    header: {
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'bold',
        color: Colors.primary,
        fontSize: 18,
    },
    undeletedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    undeletedText: {
        fontFamily: 'bold',
        color: Colors.primary,
        marginStart: 5
    }
})