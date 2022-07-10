import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Header, EmployeeItem as EI } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, fetchDeletedEmployees, fetchSuperVisors, fetchUndeletedEmployees, resetUsersErrors } from '../../redux/reducers/Users/users-actions';
import MyText from '../../components/UI/MyText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';

export const EmployeesScreen = () => {
    const dispatch = useDispatch();

    const [focusedList, setFocusedList] = useState(1)
    const [undeletedSupervisor, seUndeletedSupervisor] = useState(false)

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
        if (undeletedEmployees) {
            seUndeletedSupervisor(!undeletedEmployees)
        }
        setList(list)
    }

    return (
        <View style={styles.container}>
            <Header text={'employees'} onEmployeePressed={onEmployeePressed} />
            <View>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingEnd: 40, paddingStart: 10 }}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setEmployeesType(1)} style={styles.allEmp(focusedList, 1)}>
                        <MyText style={styles.filterText}>{'all'}</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setEmployeesType(2)} style={styles.allEmp(focusedList, 2)}>
                        <MyText style={styles.filterText}>{'supervisors'}</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setEmployeesType(3)} style={styles.allEmp(focusedList, 3)}>
                        <MyText style={styles.filterText}>{'deletedUsers'}</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setEmployeesType(4)} style={styles.allEmp(focusedList, 4)}>
                        <MyText style={styles.filterText}>{'noDeleted'}</MyText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {focusedList === 2 ?
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => seUndeletedSupervisor(!undeletedSupervisor)}
                        style={styles.undeletedSupervisor(undeletedSupervisor)}>
                        <MyText style={styles.filterText}>{'notDeletedSupervisors'}</MyText>
                    </TouchableOpacity>
                </View>
                : null}

            <View style={styles.employeesStateView}>
                <MyText style={styles.empState}>
                    {focusedList === 1 ? 'all'
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
                {fetchAllEmployeesLoading ? <ActivityIndicator size={12} color={Colors.buttons} /> : null}
            </View>
            <FlatList
                keyExtractor={(item, index) => '#' + index.toString()}
                data={focusedList === 1 ? all_employees : focusedList === 2 ? supervisors : focusedList === 3 ? deletedEmployees : undeletedEmployees}
                onRefresh={onRefresh}
                refreshing={fetchAllEmployeesLoading}
                renderItem={({ item, index }) => <EI undeletedSupervisor={undeletedSupervisor} employee={item} key={index} onRefresh={onRefresh} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
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
        backgroundColor: focusedList === id ? Colors.lightBlue : Colors.secondary,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }),
    filterText: {
        color: Colors.black,
    },
    undeletedSupervisor: undeletedSupervisor => ({
        alignSelf: 'flex-start',
        marginStart: 5,
        padding: 7,
        backgroundColor: undeletedSupervisor ? Colors.lightBlue : Colors.secondary,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    empState: {
        marginStart: 10,
        marginEnd: 3,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.text
    },
    employeesStateView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})