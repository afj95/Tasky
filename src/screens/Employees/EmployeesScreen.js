import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Header, EmployeeItem as EI } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, fetchSuperVisors, resetUsersErrors } from '../../redux/reducers/Users/users-actions';
import MyText from '../../components/UI/MyText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';

export const EmployeesScreen = () => {
    const dispatch = useDispatch();

    const [all, isAll] = useState(false)

    const all_employees = useSelector(state => state?.usersReducer?.all_employees);
    const fetchAllEmployeesLoading = useSelector(state => state?.usersReducer?.fetchAllEmployeesLoading);
    const fetchAllEmployeesError = useSelector(state => state?.usersReducer?.fetchAllEmployeesError);

    const supervisors = useSelector(state => state?.usersReducer?.supervisors);
    const fetchSupervisorsLoading = useSelector(state => state?.usersReducer?.fetchSupervisorsLoading);
    const fetchSupervisorsError = useSelector(state => state?.usersReducer?.fetchSupervisorsError);

    useEffect(() => {
        dispatch(fetchSuperVisors());
        dispatch(fetchAllEmployees());
    }, [])

    useEffect(() => {
        if(fetchAllEmployeesError === 500) {
            showMessage({
                message: t('app.serverError'),
                type: 'danger',
                duration: 3000
            })
        }
        dispatch(resetUsersErrors())
    }, [fetchAllEmployeesError, fetchSupervisorsError])
    
    const onRefresh = () => {
        dispatch(fetchAllEmployees());
        dispatch(fetchSuperVisors())
    }

    const getAll = () => {
        isAll(!all)
        onRefresh()
    }

    const onEmployeePressed = () => {
        navigate('AddEmployeeScreen', {})
    }

    return (
        <View style={styles.container}>
            <Header text={'employees'} onEmployeePressed={onEmployeePressed} />
            <View style={styles.filterContainer}>
                {all && <TouchableOpacity onPress={getAll} style={styles.cancelAllEmp}>
                    <MyText text={'X'} />
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={0.7} disabled={all} onPress={getAll} style={styles.allEmp(all)}>
                    <MyText text={'All'} />
                </TouchableOpacity>
            </View>
            <View style={styles.employeesStateView}>
                <MyText style={styles.empState}>{all ? 'all' : 'supervisors'}</MyText>
                <MyText style={styles.empState} text={all ? all_employees.length : supervisors.length} />
                {fetchAllEmployeesLoading || fetchSupervisorsLoading ?
                    <ActivityIndicator size={'small'} color={Colors.black} />
                :null}
            </View>
            <FlatList
                keyExtractor={(item, index) => '#' + index.toString()}
                data={all ? all_employees : supervisors}
                onRefresh={onRefresh}
                refreshing={all ? fetchAllEmployeesLoading : fetchSupervisorsLoading}
                renderItem={({ item, index }) => <EI employee={item} key={index} />}
            />
            {/* <View style={{
                height: 50, width: 50, borderRadius: 25,
                backgroundColor: 'red',
                position: 'absolute',
                bottom: 20,
                end: 20,
            }}>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
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
    allEmp: all => ({
        marginStart: 5,
        width: 70,
        height: 40,
        backgroundColor: all ? '#fff' : '#b9b9b9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }),
    empState: {
        marginStart: 10,
        marginTop: 10,
        marginBottom: 5
    },
    employeesStateView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})