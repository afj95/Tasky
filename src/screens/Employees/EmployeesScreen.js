import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Header, EmployeeItem as EI, FilterModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, fetchDeletedEmployees, fetchSuperVisors, fetchUndeletedEmployees, resetUsersErrors } from '../../redux/reducers/Users/users-actions';
import MyText from '../../components/UI/MyText';
import { t } from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export const EmployeesScreen = () => {
    const dispatch = useDispatch();

    const [focusedList, setFocusedList] = useState(1)
    const [undeletedSupervisor, seUndeletedSupervisor] = useState(true)
    const [filterVisible, setVisible] = useState(false);

    const all_employees = useSelector(state => state?.usersReducer?.all_employees);
    const fetchAllEmployeesLoading = useSelector(state => state?.usersReducer?.fetchAllEmployeesLoading);
    const fetchAllEmployeesError = useSelector(state => state?.usersReducer?.fetchAllEmployeesError);

    const supervisors = useSelector(state => state?.usersReducer?.supervisors);
    const deletedEmployees = useSelector(state => state?.usersReducer?.deletedEmployees);
    const undeletedEmployees = useSelector(state => state?.usersReducer?.undeletedEmployees);

    useEffect(() => {
        dispatch(fetchSuperVisors());
        dispatch(fetchAllEmployees());
        dispatch(fetchDeletedEmployees());
        dispatch(fetchUndeletedEmployees());
    }, [])

    useEffect(() => {
        if (fetchAllEmployeesError === 500) {
            showMessage({
                message: t('app.serverError'),
                type: 'danger',
                duration: 3000
            })
        }
        dispatch(resetUsersErrors())
    }, [fetchAllEmployeesError])

    const onRefresh = () => {
        dispatch(fetchAllEmployees());
        dispatch(fetchSuperVisors())
        dispatch(fetchDeletedEmployees());
        dispatch(fetchUndeletedEmployees());
    }

    const onEmployeePressed = () => {
        navigate('AddEmployeeScreen', {})
    }

    const setList = id => {
        setFocusedList(id);
        onRefresh();
    }

    const setEmployeesType = (list) => {
        // Closing the modal
        closeModal()
        setList(list)
    }

    const closeModal = () => setVisible(false)

    return (
        <View style={styles.container}>
            <Header text={'employees'} onEmployeePressed={onEmployeePressed} />
            <View style={styles.employeesStateView}>
                <View style={styles.stateContainer}>
                    <MyText style={styles.empState}>
                        {focusedList === 1 ? 'allEmployees'
                            :
                            focusedList === 2 ? 'supervisors'
                                :
                                focusedList === 3 ? 'deletedUsers'
                                    : 'noDeleted'}
                    </MyText>
                    <MyText style={styles.empState}
                        text={focusedList === 1 ? all_employees?.length
                            :
                            focusedList === 2 ? supervisors?.length
                                :
                                focusedList === 3 ? deletedEmployees?.length
                                    : undeletedEmployees?.length || ''} />
                    {fetchAllEmployeesLoading ? <ActivityIndicator size={12} color={Colors.primary
                    } /> : null}
                </View>
                <Ionicons
                    name={'md-filter'}
                    size={30}
                    color={Colors.primary}
                    onPress={() => setVisible(true)}
                />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={(item, index) => '#' + index.toString()}
                    data={focusedList === 1 ? all_employees : focusedList === 2 ? supervisors : focusedList === 3 ? deletedEmployees : undeletedEmployees}
                    onRefresh={onRefresh}
                    refreshing={fetchAllEmployeesLoading}
                    renderItem={({ item, index }) => <EI undeletedSupervisor={undeletedSupervisor} employee={item} key={index} onRefresh={onRefresh} />}
                />
            </View>
            <FilterModal
                visible={filterVisible}
                close={closeModal}
                setEmployeesType={setEmployeesType}
                focusedList={focusedList}
                undeletedSupervisor={undeletedSupervisor}
                seUndeletedSupervisor={seUndeletedSupervisor}
                employeeType={focusedList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appWhite
    },
    cancelAllEmp: {
        marginStart: 10,
        width: 25,
        height: 25,
        backgroundColor: '#b9b9b9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    allEmp: (focusedList, id) => ({
        alignSelf: 'flex-start',
        marginStart: 5,
        padding: 7,
        backgroundColor: focusedList === id ? Colors.secondary : Colors.primary,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }),
    filterText: {
        color: Colors.white,
    },
    undeletedSupervisor: undeletedSupervisor => ({
        alignSelf: 'flex-start',
        marginStart: 5,
        padding: 7,
        backgroundColor: undeletedSupervisor ? Colors.secondary : Colors.primary,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    empState: {
        marginStart: 10,
        marginEnd: 3,
        color: Colors.primary,
        fontFamily: 'bold'
    },
    employeesStateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginEnd: 10
    },
    stateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer: {
        paddingTop: 10,
        flex: 1,
    },
    filterContainer: {
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginEnd: 10
    },
})