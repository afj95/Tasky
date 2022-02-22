import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { Header, EmployeeItem as EI } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, fetchSuperVisors, resetUsersErrors } from '../../redux/reducers/Users/users-actions';
import MyText from '../../components/UI/MyText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'i18n-js';
import { showMessage } from 'react-native-flash-message';

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

    return (
        <View style={styles.container}>
            <Header text={'employees'} />
            <View style={styles.filterContainer}>
                {all && <TouchableOpacity onPress={getAll} style={styles.cancelAllEmp}>
                    <MyText text={'X'} />
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={0.7} disabled={all} onPress={getAll} style={styles.allEmp(all)}>
                    <MyText text={'All'} />
                </TouchableOpacity>
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
})